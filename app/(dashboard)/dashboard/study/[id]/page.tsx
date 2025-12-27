import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import StudySession from './StudySession'

export default async function StudyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Fetch subject
  const { data: subject } = await supabase
    .from('subjects')
    .select('*')
    .eq('id', id)
    .single() as any

  if (!subject) {
    redirect('/dashboard')
  }

  // Fetch all cards for this subject
  const { data: allCards } = await supabase
    .from('cards')
    .select('*')
    .eq('subject_id', id)
    .eq('user_id', user.id) as any

  if (!allCards || allCards.length === 0) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{subject.name}</h1>
          <p className="text-muted-foreground">No flashcards available</p>
        </div>
        <div className="bg-muted/50 border-2 border-dashed rounded-lg p-12 text-center">
          <p className="text-lg mb-4">
            You haven't created any flashcards for this subject yet.
          </p>
          <p className="text-muted-foreground">
            Create your first flashcards to start learning!
          </p>
        </div>
      </div>
    )
  }

  // Fetch review history for these cards
  const { data: reviews } = await supabase
    .from('reviews')
    .select('card_id, next_review')
    .eq('user_id', user.id)
    .in(
      'card_id',
      allCards.map((c: any) => c.id)
    ) as any

  // Filter cards by spaced repetition schedule
  const today = new Date().toISOString().split('T')[0]
  const reviewMap = new Map(reviews?.map((r: any) => [r.card_id, r.next_review]) || [])

  // Cards that are due for review (next_review <= today OR never reviewed)
  const dueCards = allCards.filter((card: any) => {
    const nextReview = reviewMap.get(card.id)
    return !nextReview || nextReview <= today
  })

  // If we have less than 20 due cards, add some new cards
  const SESSION_SIZE = 20
  let sessionCards = [...dueCards]

  if (sessionCards.length < SESSION_SIZE) {
    const newCards = allCards
      .filter((card: any) => !reviewMap.has(card.id))
      .slice(0, SESSION_SIZE - sessionCards.length)
    sessionCards = [...sessionCards, ...newCards]
  }

  // Shuffle cards (Fisher-Yates algorithm)
  const shuffledCards = [...sessionCards]
  for (let i = shuffledCards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffledCards[i], shuffledCards[j]] = [shuffledCards[j], shuffledCards[i]]
  }

  // Limit to SESSION_SIZE cards
  const cards = shuffledCards.slice(0, SESSION_SIZE)

  if (cards.length === 0) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{subject.name}</h1>
          <p className="text-muted-foreground">All caught up! 🎉</p>
        </div>
        <div className="bg-muted/50 border-2 border-dashed rounded-lg p-12 text-center">
          <p className="text-lg mb-4">
            You've reviewed all your cards for today!
          </p>
          <p className="text-muted-foreground">
            Come back tomorrow for more reviews, or add new cards.
          </p>
        </div>
      </div>
    )
  }

  return <StudySession subject={subject} cards={cards} userId={user.id} />
}

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

interface FlashCard {
  id: string
  front: string
  back: string
  card_type: string
  options: string[] | null
  correct_option: number | null
  tags: string[] | null
  created_at: string
}

interface Subject {
  id: string
  name: string
  icon: string | null
}

interface CardManagerProps {
  subject: Subject
  initialCards: FlashCard[]
  userId: string
}

export default function CardManager({ subject, initialCards, userId }: CardManagerProps) {
  const router = useRouter()
  const supabase = createClient()
  const [cards, setCards] = useState<FlashCard[]>(initialCards)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingCard, setEditingCard] = useState<FlashCard | null>(null)

  // Form state
  const [cardType, setCardType] = useState<'basic' | 'multiple_choice' | 'cloze'>('basic')
  const [front, setFront] = useState('')
  const [back, setBack] = useState('')
  const [options, setOptions] = useState(['', '', '', ''])
  const [correctOption, setCorrectOption] = useState(0)
  const [tags, setTags] = useState('')

  const resetForm = () => {
    setCardType('basic')
    setFront('')
    setBack('')
    setOptions(['', '', '', ''])
    setCorrectOption(0)
    setTags('')
    setEditingCard(null)
  }

  const handleAddCard = async () => {
    try {
      const cardData = {
        user_id: userId,
        subject_id: subject.id,
        front,
        back: cardType === 'multiple_choice' ? options[correctOption] : back,
        card_type: cardType,
        options: cardType === 'multiple_choice' ? options : null,
        correct_option: cardType === 'multiple_choice' ? correctOption : null,
        tags: tags ? tags.split(',').map((t) => t.trim()) : null,
      }

      const { data: newCard, error } = await (supabase
        .from('cards')
        .insert as any)(cardData)
        .select()
        .single()

      if (error) throw error

      if (newCard) {
        setCards([newCard, ...cards])
      }

      resetForm()
      setIsAddDialogOpen(false)
      router.refresh()
    } catch (error) {
      console.error('Error adding card:', error)
      alert('Failed to add card')
    }
  }

  const handleUpdateCard = async () => {
    if (!editingCard) return

    try {
      const cardData = {
        front,
        back: cardType === 'multiple_choice' ? options[correctOption] : back,
        card_type: cardType,
        options: cardType === 'multiple_choice' ? options : null,
        correct_option: cardType === 'multiple_choice' ? correctOption : null,
        tags: tags ? tags.split(',').map((t) => t.trim()) : null,
      }

      const { error } = await (supabase
        .from('cards')
        .update as any)(cardData)
        .eq('id', editingCard.id)

      if (error) throw error

      setCards(
        cards.map((card) =>
          card.id === editingCard.id ? { ...card, ...cardData } : card
        )
      )

      resetForm()
      router.refresh()
    } catch (error) {
      console.error('Error updating card:', error)
      alert('Failed to update card')
    }
  }

  const handleDeleteCard = async (cardId: string) => {
    if (!confirm('Are you sure you want to delete this card?')) return

    try {
      const { error } = await supabase.from('cards').delete().eq('id', cardId)

      if (error) throw error

      setCards(cards.filter((card) => card.id !== cardId))
      router.refresh()
    } catch (error) {
      console.error('Error deleting card:', error)
      alert('Failed to delete card')
    }
  }

  const loadCardForEdit = (card: FlashCard) => {
    setEditingCard(card)
    setCardType(card.card_type as any)
    setFront(card.front)
    setBack(card.back)
    if (card.options) {
      setOptions(card.options)
      setCorrectOption(card.correct_option || 0)
    }
    setTags(card.tags?.join(', ') || '')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            {subject.icon && <span>{subject.icon}</span>}
            {subject.name}
          </h1>
          <p className="text-muted-foreground mt-1">Manage flashcards</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => router.push('/dashboard/subjects')}>
            Back
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => resetForm()}>Add Card</Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Flashcard</DialogTitle>
                <DialogDescription>
                  Create a new flashcard for this subject
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Card Type</Label>
                  <Select
                    value={cardType}
                    onValueChange={(value: any) => setCardType(value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basic">Basic (Q&A)</SelectItem>
                      <SelectItem value="multiple_choice">Multiple Choice</SelectItem>
                      <SelectItem value="cloze">Cloze (Fill-in-blank)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Question / Front</Label>
                  <Input
                    value={front}
                    onChange={(e) => setFront(e.target.value)}
                    placeholder="Enter question or front of card"
                  />
                </div>

                {cardType === 'basic' || cardType === 'cloze' ? (
                  <div>
                    <Label>Answer / Back</Label>
                    <Input
                      value={back}
                      onChange={(e) => setBack(e.target.value)}
                      placeholder="Enter answer or back of card"
                    />
                  </div>
                ) : null}

                {cardType === 'multiple_choice' && (
                  <div className="space-y-3">
                    <Label>Options</Label>
                    {options.map((option, index) => (
                      <div key={index} className="flex gap-2 items-center">
                        <input
                          type="radio"
                          checked={correctOption === index}
                          onChange={() => setCorrectOption(index)}
                          className="w-4 h-4"
                        />
                        <Input
                          value={option}
                          onChange={(e) => {
                            const newOptions = [...options]
                            newOptions[index] = e.target.value
                            setOptions(newOptions)
                          }}
                          placeholder={`Option ${index + 1}`}
                        />
                      </div>
                    ))}
                  </div>
                )}

                <div>
                  <Label>Tags (comma-separated)</Label>
                  <Input
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="e.g. chapter1, important, exam"
                  />
                </div>

                <Button onClick={handleAddCard} className="w-full">
                  Add Card
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{cards.length}</div>
            <div className="text-sm text-muted-foreground">Total Cards</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">
              {cards.filter((c) => c.card_type === 'basic').length}
            </div>
            <div className="text-sm text-muted-foreground">Basic</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">
              {cards.filter((c) => c.card_type === 'multiple_choice').length}
            </div>
            <div className="text-sm text-muted-foreground">Multiple Choice</div>
          </CardContent>
        </Card>
      </div>

      {/* Cards List */}
      <div className="space-y-3">
        {cards.map((card) => (
          <Card key={card.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline">{card.card_type}</Badge>
                    {card.tags?.slice(0, 3).map((tag, i) => (
                      <Badge key={i} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <CardTitle className="text-base">{card.front}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">{card.back}</p>
                </div>
                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => loadCardForEdit(card)}
                      >
                        Edit
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Edit Flashcard</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label>Card Type</Label>
                          <Select
                            value={cardType}
                            onValueChange={(value: any) => setCardType(value)}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="basic">Basic (Q&A)</SelectItem>
                              <SelectItem value="multiple_choice">
                                Multiple Choice
                              </SelectItem>
                              <SelectItem value="cloze">Cloze (Fill-in-blank)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label>Question / Front</Label>
                          <Input
                            value={front}
                            onChange={(e) => setFront(e.target.value)}
                          />
                        </div>

                        {cardType === 'basic' || cardType === 'cloze' ? (
                          <div>
                            <Label>Answer / Back</Label>
                            <Input
                              value={back}
                              onChange={(e) => setBack(e.target.value)}
                            />
                          </div>
                        ) : null}

                        {cardType === 'multiple_choice' && (
                          <div className="space-y-3">
                            <Label>Options</Label>
                            {options.map((option, index) => (
                              <div key={index} className="flex gap-2 items-center">
                                <input
                                  type="radio"
                                  checked={correctOption === index}
                                  onChange={() => setCorrectOption(index)}
                                  className="w-4 h-4"
                                />
                                <Input
                                  value={option}
                                  onChange={(e) => {
                                    const newOptions = [...options]
                                    newOptions[index] = e.target.value
                                    setOptions(newOptions)
                                  }}
                                />
                              </div>
                            ))}
                          </div>
                        )}

                        <div>
                          <Label>Tags (comma-separated)</Label>
                          <Input
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                          />
                        </div>

                        <Button onClick={handleUpdateCard} className="w-full">
                          Update Card
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteCard(card.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>

      {cards.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No flashcards yet. Create your first one!</p>
        </div>
      )}
    </div>
  )
}

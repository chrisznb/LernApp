import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { join } from 'path'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

async function importFlashcards() {
  try {
    // Read the JSON file
    const filePath = join(process.cwd(), 'flashcards-hr-export.json')
    const fileContent = readFileSync(filePath, 'utf-8')
    const flashcards = JSON.parse(fileContent)

    console.log(`📚 Importiere ${flashcards.length} Karteikarten...`)

    // Get the current user (you need to be logged in)
    const { data: { user }, error: userError } = await supabase.auth.getUser()

    if (userError || !user) {
      console.error('❌ Fehler: Nicht eingeloggt. Bitte zuerst anmelden.')
      console.error('Führe das Script aus, nachdem du dich in der App angemeldet hast.')
      process.exit(1)
    }

    console.log(`👤 Eingeloggt als: ${user.email}`)

    // HR Subject ID
    const hrSubjectId = 'f1c31287-e2d3-4981-ae57-717a34d7551c'

    // Prepare cards for insertion
    const cardsToInsert = flashcards.map((card: any) => ({
      user_id: user.id,
      subject_id: hrSubjectId,
      front: card.front,
      back: card.back,
      card_type: card.card_type || 'basic',
      options: card.options ? card.options : null,
      correct_option: card.correct_option !== undefined ? card.correct_option : null,
      tags: card.tags || null,
    }))

    // Insert cards
    const { data, error } = await supabase
      .from('cards')
      .insert(cardsToInsert)
      .select()

    if (error) {
      console.error('❌ Fehler beim Importieren:', error)
      process.exit(1)
    }

    console.log(`✅ Erfolgreich ${data?.length || 0} Karteikarten importiert!`)

    // Show statistics
    const basicCards = data?.filter(c => c.card_type === 'basic').length || 0
    const multipleChoiceCards = data?.filter(c => c.card_type === 'multiple_choice').length || 0
    const clozeCards = data?.filter(c => c.card_type === 'cloze').length || 0

    console.log('\n📊 Statistiken:')
    console.log(`   Basic Cards: ${basicCards}`)
    console.log(`   Multiple Choice: ${multipleChoiceCards}`)
    console.log(`   Cloze (Lückentext): ${clozeCards}`)

  } catch (error) {
    console.error('❌ Fehler:', error)
    process.exit(1)
  }
}

importFlashcards()

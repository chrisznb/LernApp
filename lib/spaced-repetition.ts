/**
 * SM-2 Spaced Repetition Algorithm
 * Based on SuperMemo 2 algorithm for optimal learning intervals
 */

export interface ReviewData {
  quality: number // 0-5: How well did you know the answer?
  easiness: number // Easiness factor (default: 2.5)
  interval: number // Days until next review
  repetitions: number // Number of successful reviews in a row
  next_review: string // ISO date string for next review
}

/**
 * Calculate next review using SM-2 algorithm
 * @param quality - Rating from 0 (complete blackout) to 5 (perfect response)
 * @param previousData - Previous review data (optional for first review)
 * @returns Updated review data with next review date
 */
export function calculateNextReview(
  quality: number,
  previousData?: Partial<ReviewData>
): ReviewData {
  // Initialize defaults
  let easiness = previousData?.easiness ?? 2.5
  let interval = previousData?.interval ?? 0
  let repetitions = previousData?.repetitions ?? 0

  // SM-2 Algorithm

  // 1. Update easiness factor
  // EF' = EF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
  easiness = Math.max(
    1.3,
    easiness + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
  )

  // 2. Determine if answer was correct (quality >= 3)
  if (quality < 3) {
    // Incorrect answer - reset repetitions and start over
    repetitions = 0
    interval = 1 // Review again tomorrow
  } else {
    // Correct answer - increase interval
    repetitions += 1

    if (repetitions === 1) {
      interval = 1 // First review: 1 day
    } else if (repetitions === 2) {
      interval = 6 // Second review: 6 days
    } else {
      // Subsequent reviews: interval = previous_interval * EF
      interval = Math.round(interval * easiness)
    }
  }

  // 3. Calculate next review date
  const nextReviewDate = new Date()
  nextReviewDate.setDate(nextReviewDate.getDate() + interval)

  return {
    quality,
    easiness: Math.round(easiness * 100) / 100, // Round to 2 decimals
    interval,
    repetitions,
    next_review: nextReviewDate.toISOString().split('T')[0], // YYYY-MM-DD format
  }
}

/**
 * Convert user answer (correct/incorrect) to quality rating
 * This is a simplified mapping for basic flashcards
 */
export function answerToQuality(isCorrect: boolean, confidence?: 'easy' | 'good' | 'hard'): number {
  if (!isCorrect) {
    return 0 // Complete fail
  }

  // Map confidence to quality
  switch (confidence) {
    case 'easy':
      return 5 // Perfect response
    case 'good':
      return 4 // Correct after hesitation
    case 'hard':
      return 3 // Correct with serious difficulty
    default:
      return 4 // Default to "good"
  }
}

/**
 * Get cards due for review
 * @param cards - All cards
 * @param reviews - Review history
 * @returns Cards that are due for review today
 */
export function getCardsForReview(
  cards: Array<{ id: string }>,
  reviews: Array<{ card_id: string; next_review: string }>
): Array<{ id: string }> {
  const today = new Date().toISOString().split('T')[0]

  // Get card IDs that have reviews
  const reviewedCardIds = new Set(reviews.map((r) => r.card_id))

  // Filter cards
  return cards.filter((card) => {
    const cardReview = reviews.find((r) => r.card_id === card.id)

    // Include if:
    // 1. Never reviewed before, OR
    // 2. Next review date is today or earlier
    return !cardReview || cardReview.next_review <= today
  })
}

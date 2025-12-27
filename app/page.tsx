import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default async function Home() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // If user is logged in, redirect to dashboard
  if (user) {
    redirect('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            StudyFlow
          </h1>
          <p className="text-2xl text-muted-foreground mb-8">
            Master your university exams with intelligent spaced repetition
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="text-lg px-8">
                Get Started
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="text-lg px-8">
                Sign In
              </Button>
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
          <Card>
            <CardHeader>
              <div className="text-4xl mb-2">🧠</div>
              <CardTitle>Spaced Repetition</CardTitle>
              <CardDescription>
                SM-2 algorithm optimizes your learning schedule for maximum retention
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="text-4xl mb-2">📊</div>
              <CardTitle>Track Progress</CardTitle>
              <CardDescription>
                Monitor your study streaks, XP, and performance across all subjects
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="text-4xl mb-2">🎯</div>
              <CardTitle>Multiple Card Types</CardTitle>
              <CardDescription>
                Basic flashcards, multiple choice, and fill-in-the-blank questions
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Stats */}
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-r from-primary/10 to-purple-500/10">
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-primary">6</div>
                  <div className="text-sm text-muted-foreground">Exam Subjects</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">327</div>
                  <div className="text-sm text-muted-foreground">Total Flashcards</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">SM-2</div>
                  <div className="text-sm text-muted-foreground">Algorithm</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">100%</div>
                  <div className="text-sm text-muted-foreground">Free</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

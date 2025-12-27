'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else if (data.user) {
      // Create user_stats entry for gamification
      const { error: statsError } = await (supabase
        .from('user_stats')
        .insert as any)({
          user_id: data.user.id,
          total_xp: 0,
          current_streak: 0,
          longest_streak: 0,
          level: 1,
          achievements: [],
        })

      if (statsError) {
        console.error('Error creating user stats:', statsError)
      }

      setSuccess(true)
      setTimeout(() => {
        router.push('/dashboard')
        router.refresh()
      }, 2000)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Registrieren</CardTitle>
          <CardDescription>
            Erstelle einen Account, um mit StudyFlow zu starten
          </CardDescription>
        </CardHeader>
        <CardContent>
          {success ? (
            <div className="text-center py-8">
              <div className="text-2xl mb-2">🎉</div>
              <h3 className="text-lg font-semibold mb-2">Account erstellt!</h3>
              <p className="text-sm text-muted-foreground">
                Du wirst zum Dashboard weitergeleitet...
              </p>
            </div>
          ) : (
            <>
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="deine@email.de"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Passwort</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Mindestens 6 Zeichen"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                </div>
                {error && (
                  <div className="text-sm text-destructive">{error}</div>
                )}
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Lädt...' : 'Account erstellen'}
                </Button>
              </form>
              <div className="mt-4 text-center text-sm">
                Schon einen Account?{' '}
                <Link href="/login" className="text-primary hover:underline">
                  Anmelden
                </Link>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default async function StatsPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return null

  // Fetch user stats
  const { data: stats } = await supabase
    .from('user_stats')
    .select('*')
    .eq('user_id', user.id)
    .single() as any

  // Fetch total cards
  const { count: totalCards } = await supabase
    .from('cards')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id) as any

  // Fetch cards by type
  const { data: cardsByType } = await supabase
    .from('cards')
    .select('card_type')
    .eq('user_id', user.id) as any

  const basicCards =
    cardsByType?.filter((c: any) => c.card_type === 'basic').length || 0
  const multipleChoiceCards =
    cardsByType?.filter((c: any) => c.card_type === 'multiple_choice').length || 0
  const clozeCards =
    cardsByType?.filter((c: any) => c.card_type === 'cloze').length || 0

  // Fetch study sessions (last 7 days)
  const sevenDaysAgo = new Date()
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
  const { data: recentSessions } = await supabase
    .from('study_sessions')
    .select('*')
    .eq('user_id', user.id)
    .gte('session_date', sevenDaysAgo.toISOString().split('T')[0])
    .order('session_date', { ascending: false }) as any

  const totalMinutesLastWeek =
    recentSessions?.reduce((sum: any, s: any) => sum + (s.duration_minutes || 0), 0) || 0
  const totalCardsReviewed =
    recentSessions?.reduce((sum: any, s: any) => sum + (s.cards_reviewed || 0), 0) || 0

  // Fetch all subjects with card counts
  const { data: subjects } = await supabase
    .from('subjects')
    .select('*')
    .order('exam_date', { ascending: true }) as any

  const subjectsWithProgress = await Promise.all(
    (subjects || []).map(async (subject: any) => {
      const { count } = await supabase
        .from('cards')
        .select('*', { count: 'exact', head: true })
        .eq('subject_id', subject.id)
        .eq('user_id', user.id) as any

      return {
        ...subject,
        cardCount: count || 0,
      }
    })
  )

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Statistiken</h1>
        <p className="text-muted-foreground">
          Dein Lernfortschritt im Überblick
        </p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Level</CardTitle>
            <span className="text-2xl">🎯</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.level || 1}</div>
            <p className="text-xs text-muted-foreground">
              {stats?.total_xp || 0} XP Gesamt
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Streak</CardTitle>
            <span className="text-2xl">🔥</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats?.current_streak || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Längster: {stats?.longest_streak || 0} Tage
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Karteikarten</CardTitle>
            <span className="text-2xl">📚</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCards || 0}</div>
            <p className="text-xs text-muted-foreground">Gesamt erstellt</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Diese Woche</CardTitle>
            <span className="text-2xl">⏱️</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalMinutesLastWeek}</div>
            <p className="text-xs text-muted-foreground">Minuten gelernt</p>
          </CardContent>
        </Card>
      </div>

      {/* Card Types */}
      <Card>
        <CardHeader>
          <CardTitle>Kartentypen</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-blue-500" />
                <span className="text-sm font-medium">Basic Cards</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {basicCards}
                </span>
                <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500"
                    style={{
                      width: `${((basicCards / (totalCards || 1)) * 100).toFixed(0)}%`,
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-sm font-medium">Multiple Choice</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {multipleChoiceCards}
                </span>
                <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500"
                    style={{
                      width: `${((multipleChoiceCards / (totalCards || 1)) * 100).toFixed(0)}%`,
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-purple-500" />
                <span className="text-sm font-medium">Cloze (Lückentext)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {clozeCards}
                </span>
                <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-purple-500"
                    style={{
                      width: `${((clozeCards / (totalCards || 1)) * 100).toFixed(0)}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Progress per Subject */}
      <Card>
        <CardHeader>
          <CardTitle>Fortschritt pro Fach</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {subjectsWithProgress.map((subject) => (
              <div key={subject.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{subject.icon}</span>
                    <span className="text-sm font-medium">{subject.name}</span>
                  </div>
                  <Badge variant="secondary">{subject.cardCount} Karten</Badge>
                </div>
                {subject.cardCount > 0 && (
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all"
                      style={{
                        width: `${Math.min((subject.cardCount / 50) * 100, 100)}%`,
                      }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      {recentSessions && recentSessions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Letzte Lernsessions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentSessions.slice(0, 5).map((session: any) => (
                <div
                  key={session.id}
                  className="flex items-center justify-between py-2 border-b last:border-0"
                >
                  <div>
                    <p className="text-sm font-medium">
                      {new Date(session.session_date).toLocaleDateString(
                        'de-DE',
                        {
                          weekday: 'long',
                          day: '2-digit',
                          month: '2-digit',
                        }
                      )}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {session.cards_reviewed || 0} Karten ·{' '}
                      {session.duration_minutes || 0} Min
                    </p>
                  </div>
                  <Badge variant="outline">+{session.xp_earned || 0} XP</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

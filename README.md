# StudyFlow - Deine intelligente Lern-App

Eine gamifizierte Lern-WebApp mit Spaced Repetition, die dir hilft, dich optimal auf deine 6 Klausuren vorzubereiten.

## Features (MVP)

- ✅ Benutzer-Authentifizierung (Email/Passwort)
- ✅ Dashboard mit Übersicht aller Fächer
- ✅ Countdown zu jeder Klausur
- ✅ Gamification (XP, Level, Streak)
- ✅ Tägliche Lernziele
- ✅ Supabase Storage für Lernmaterialien (PDFs, Dokumente)
- ✅ Responsive Design (Mobile + Desktop)

## Tech Stack

- **Frontend:** Next.js 14+ (App Router), React, TypeScript
- **Styling:** Tailwind CSS + shadcn/ui
- **Backend:** Supabase (Auth, PostgreSQL, Storage)
- **State Management:** Zustand
- **Deployment:** Vercel (coming soon)

## Erste Schritte

### 1. Development Server starten

Der Server läuft bereits auf: **http://localhost:3000**

Falls nicht:
```bash
npm run dev
```

### 2. Account erstellen

1. Gehe zu http://localhost:3000 (du wirst automatisch zu /login weitergeleitet)
2. Klicke auf "Registrieren"
3. Erstelle deinen Account mit Email + Passwort
4. Du wirst automatisch zum Dashboard weitergeleitet

### 3. Lernmaterialien hochladen

Die Struktur für deine PDFs in Supabase Storage:

```
learning-materials/
├── {user_id}/
│   ├── business-law/
│   │   ├── vorlesung-01.pdf
│   │   └── zusammenfassung.pdf
│   ├── hr-organisation/
│   ├── mathematics/
│   ├── business-economics/
│   ├── business-english/
│   └── information-technology/
```

**Upload-Feature kommt in Phase 2!** Aktuell kannst du PDFs direkt in Supabase Storage hochladen.

## Deine 6 Fächer

Alle Fächer sind bereits in der Datenbank:

| Fach | Klausurdatum | Priorität |
|------|--------------|-----------|
| Principles of Business Law | 26.01.2026 | HOCH |
| Human Resources and Organisation | 28.01.2026 | HOCH |
| Mathematics for Business and Economics | 02.02.2026 | HOCH |
| Principles of Business and Economics | 05.02.2026 | MITTEL |
| Business English (C1) | 11.02.2026 | MITTEL |
| Information Technology | 11.02.2026 | MITTEL |

## Datenbank-Struktur

### Tabellen:
- `subjects` - Die 6 Fächer
- `cards` - Karteikarten mit verschiedenen Typen (basic, multiple_choice, cloze)
- `reviews` - Spaced Repetition Tracking (SM-2 Algorithmus)
- `study_sessions` - Lern-Sessions mit XP-Tracking
- `user_stats` - Gamification (Level, Streak, Achievements)
- `daily_goals` - Tägliche Lernziele

### Storage:
- `learning-materials` - Bucket für PDFs und Lernmaterialien

## Nächste Schritte (MVP Phase 2)

1. **Flashcard-System implementieren**
   - Karteikarten erstellen/bearbeiten/löschen
   - Verschiedene Karten-Typen (Basic, Multiple Choice, Lückentext)
   - Spaced Repetition Algorithmus (SM-2)

2. **Lern-Session implementieren**
   - Karten durchgehen
   - "Wusste ich" / "Wusste ich nicht" Buttons
   - XP-Vergabe
   - Session-Tracking

3. **Upload-Feature**
   - PDFs hochladen
   - Automatische Ordner-Struktur nach Fächern

4. **Statistiken-Seite**
   - Lernzeit pro Tag/Woche
   - Fortschritt pro Fach
   - Streak-Kalender

## Projekt-Struktur

```
lernapp/
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   └── (dashboard)/
│       ├── layout.tsx
│       └── dashboard/page.tsx
├── components/
│   └── ui/              # shadcn components
├── lib/
│   └── supabase/
│       ├── client.ts    # Client-side Supabase
│       └── server.ts    # Server-side Supabase
├── types/
│   └── database.ts      # TypeScript Types
└── middleware.ts        # Auth Protection
```

## Wichtige Befehle

```bash
npm run dev          # Development Server
npm run build        # Production Build
npm run start        # Production Server
npm run lint         # ESLint
```

## Environment Variables

Die `.env.local` Datei enthält deine Supabase Credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://ifmgedepkblpgaheohll.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_...
```

## Supabase Dashboard

Verwalte deine Datenbank direkt über:
https://supabase.com/dashboard/project/ifmgedepkblpgaheohll

## Fragen?

Checke die Hauptdokumentation in der Projektbeschreibung oder frag einfach!

Viel Erfolg beim Lernen! 🚀📚

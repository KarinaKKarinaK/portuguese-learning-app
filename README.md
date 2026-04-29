# Português BH

A Brazilian Portuguese learning PWA focused on Minas Gerais / Belo Horizonte fluency. Built for advanced Spanish speakers who want real BH expressions, not textbook content.

## Features

- **Dashboard** — streak tracking, XP, weekly heatmap
- **Grammar** — 5 tenses with irregulars, conjugation tables
- **Vocabulary** — 70 verbs, 70 nouns, 70 adjectives/connectors
- **Mineirês** — 34+ Minas Gerais slang with audio
- **Flashcards** — spaced repetition with confidence scoring
- **Content** — dialogues and reading texts with audio
- **Quiz** — 105 questions with history tracking
- **YouTube** — 16 curated BH Portuguese channels

## Tech

React + Vite + TailwindCSS v4, React Router, localStorage, Web Speech API (pt-BR), Vercel edge function for optional Notion vocabulary sync.

## Dev

```bash
npm install
npm run dev       # runs on port 5173
npm run build
```

## Vercel Deployment

Deploy via Vercel. For Notion vocabulary sync, set environment variables:
- `NOTION_API_KEY`
- `NOTION_DATABASE_ID` (database needs `word` title + `translation_en` rich text columns)

## PWA

Works offline for static content. Add to home screen from mobile browser for app-like experience.

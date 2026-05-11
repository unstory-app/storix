# Wify.my - Premium Story Reading Platform

Wify.my is a modern, mobile-first, swipe-based text story platform. It brings the addictive vertical swipe UX of TikTok and Shorts into the world of text-based storytelling.

## Features

- 📱 **Mobile-First UX**: Immersive full-screen reading experience with gesture-based navigation.
- 🎨 **Premium Design System**: Dark theme, glassmorphism, fluid animations, and highly readable typography.
- ⚡ **Scalable Architecture**: Next.js App Router combined with a heavily optimized file-system "mock database". Episode texts are loaded dynamically (code-split) to keep the initial load lightning fast.
- 💾 **Local Persistence**: User reading progress and bookmarks are securely stored in `localStorage`.
- 🔍 **Discovery Engine**: Robust Explore page with real-time search, genre filtering, and sorting.

## Tech Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Deployment**: Configured for Cloudflare via `@opennextjs/cloudflare`

## Directory Structure & Architecture

The application handles story data using a highly scalable file-system architecture, making it easy to manage thousands of stories without blowing up the client bundle size.

Read the detailed guide in `src/stories/SKILL.md` to learn how to add, manage, and delete stories.

```text
src/
├── app/              # Next.js App Router pages (Home, Explore, Reader, etc.)
├── components/       # Reusable UI components (StoryCard, ReaderScreen, etc.)
├── stories/          # The Mock File-System Database
│   ├── api.ts        # Data fetching methods
│   ├── registry.ts   # Lightweight story catalog
│   └── content/      # Actual story content (split by episode for lazy loading)
├── lib/              # Utilities (localStorage helpers)
└── types/            # TypeScript interfaces
```

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Open the browser**:
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## Deployment (Cloudflare)

This project uses OpenNext to deploy on Cloudflare Workers/Pages.

1. Build and preview:
   ```bash
   npm run preview
   ```
2. Deploy:
   ```bash
   npm run deploy
   ```
# Wify.my Story Management Guide (SKILL)

This document provides instructions for developers and AI agents on how to add, manage, and delete stories in the Wify.my platform.

## Architecture Overview

The platform uses a **Simplified JSON Architecture**. Every single story is completely contained within its own `.json` file inside the `src/stories/` directory.

- **One file per story**: `src/stories/[slug].json`
- **Centralized Export**: `src/stories/index.ts` imports and exports all available stories.

This keeps the codebase incredibly easy to manage, edit, and parse for AI agents, while leveraging React Server Components for maximum performance.

---

## 🛠️ How to Add a New Story

1. **Create the JSON File**:
   Create a new file in `src/stories/` using the story's slug (e.g., `the-new-king.json`).

2. **Use the Standard Schema**:
   Copy and paste this exact schema into the new file. Fill in the data appropriately. Keep story text parts short (1-4 sentences) for the vertical swipe UX.

   ```json
   {
     "id": "unique-story-id",
     "title": "Story Title",
     "slug": "story-slug-kebab-case",
     "posterImage": "https://images.unsplash.com/...",
     "description": "A dramatic 1-2 sentence description...",
     "genres": ["Romance", "Drama"],
     "rating": 4.5,
     "views": "0",
     "status": "Ongoing",
     "seasons": [
       {
         "seasonNumber": 1,
         "title": "Season 1 Title",
         "description": "Season description...",
         "episodes": [
           {
             "id": "e1-s1",
             "episodeNumber": 1,
             "title": "Episode 1 Title",
             "duration": "4 min",
             "isLocked": false,
             "parts": [
               { "id": "p1", "text": "This is the first dramatic text card." },
               { "id": "p2", "text": "This is the second text card that appears after swiping." }
             ]
           }
         ]
       }
     ]
   }
   ```

3. **Register the Story**:
   Open `src/stories/index.ts`.
   Add an import at the top:
   ```typescript
   import theNewKing from './the-new-king.json';
   ```
   Add the variable to the `ALL_STORIES` array:
   ```typescript
   const ALL_STORIES: Story[] = [
     // ... existing stories
     theNewKing as Story
   ];
   ```

---

## 🔄 How to Manage/Edit Stories

**To add a new episode to an existing story**:
Simply open the story's `.json` file, locate the correct `season` array, and append a new episode object to the `episodes` array following the schema.

**To edit text within an episode**:
Open the `.json` file, find the specific `text` field inside the `parts` array, and modify it.

---

## 🗑️ How to Delete a Story

1. Delete the story's `.json` file from `src/stories/`.
2. Remove the import and array entry from `src/stories/index.ts`.

## 🤖 Notes for AI Agents
- Always validate the JSON structure before saving (ensure there are no trailing commas).
- Always use Next.js Server Components when fetching data from `index.ts`. Only use `"use client"` for highly interactive components (like the reader swipe logic or `localStorage` features).

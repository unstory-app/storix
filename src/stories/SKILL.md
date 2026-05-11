# Wify.my Story Management Guide (SKILL)

This document provides instructions for developers and AI agents on how to add, manage, and delete stories in the Wify.my platform.

## Architecture Overview

The platform uses a **Scalable File-System Database** instead of a single massive mock file. This ensures that as the library grows, Next.js only bundles the data that a user is actively reading.

- `src/stories/registry.ts`: The lightweight catalog. Contains metadata for all stories, used for the Home and Explore pages.
- `src/stories/content/[slug]/metadata.ts`: Detailed story information and its season/episode layout (no heavy text parts).
- `src/stories/content/[slug]/episodes/[episodeId].ts`: The actual heavy text content. Loaded dynamically.
- `src/stories/api.ts`: Simulated backend functions (`getStoryRegistry`, `getStoryDetails`, `getEpisodeData`).

---

## 🛠️ How to Add a New Story

1. **Create the Folder Structure**:
   Create a new folder in `src/stories/content/` using the story's slug (e.g., `the-new-king`). Inside it, create an `episodes` folder.

2. **Add to Registry**:
   Open `src/stories/registry.ts` and add a new `StoryRegistryItem` object to the array.
   ```typescript
   {
     id: 'new-unique-id',
     title: "The New King",
     slug: 'the-new-king',
     posterImage: 'https://images.unsplash.com/...',
     description: "A short synopsis...",
     genres: ['Fantasy', 'Drama'],
     rating: 4.5,
     views: '0',
     status: 'Ongoing',
     totalSeasons: 1
   }
   ```

3. **Create metadata.ts**:
   Create `src/stories/content/the-new-king/metadata.ts`. This file defines the seasons and the lightweight structure of the episodes.
   ```typescript
   import { Story } from '../../../types';

   export const metadata: Omit<Story, 'seasons'> & { seasons: any[] } = {
     // ... same basic metadata as registry ...
     seasons: [
       {
         seasonNumber: 1,
         title: 'The Beginning',
         description: 'How it starts.',
         episodes: [
           {
             id: 'e1-s1',
             episodeNumber: 1,
             title: 'The Arrival',
             duration: '4 min',
             isLocked: false,
             partsCount: 3
           }
         ]
       }
     ]
   };
   ```

4. **Create Episode Files**:
   For every episode defined in `metadata.ts`, create a corresponding file in the `episodes/` folder (e.g., `episodes/e1-s1.ts`). This is where the heavy text goes.
   ```typescript
   import { Episode } from '../../../../types';

   export const episode: Episode = {
     id: 'e1-s1',
     episodeNumber: 1,
     title: 'The Arrival',
     duration: '4 min',
     isLocked: false,
     parts: [
       { id: 'p1', text: "The king had arrived." },
       { id: 'p2', text: "But the throne was already taken." },
       { id: 'p3', text: "\"Who are you?\" he demanded." }
     ]
   };
   ```

---

## 🔄 How to Manage/Edit Stories

**To add a new episode to an existing story**:
1. Update `src/stories/content/[slug]/metadata.ts` to include the new episode in the `episodes` array.
2. Create the new `[episodeId].ts` file in the `episodes/` folder.

**To edit text within an episode**:
Navigate directly to `src/stories/content/[slug]/episodes/[episodeId].ts` and modify the `parts` array. You do not need to touch the registry or metadata files.

---

## 🗑️ How to Delete a Story

1. Remove the story's object from `src/stories/registry.ts`.
2. Delete the entire story folder: `src/stories/content/[slug]`.

## 🤖 Notes for AI Agents
- Always use `write_to_file` when creating new episode files.
- Ensure the `id` in `registry.ts`, `metadata.ts`, and the filename in `episodes/` match perfectly.
- Remember that `api.ts` uses dynamic imports (`await import(...)`). Filenames are case-sensitive on Vercel/Cloudflare, so always use lowercase kebab-case for slugs and episode IDs.

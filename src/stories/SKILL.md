# 📖 Wify.my Content Contribution Guide

Welcome to the Wify.my story registry. This guide provides technical specifications for adding, managing, and translating stories on the platform.

## 🛠 Architecture Overview

Wify.my uses a **static-first, localized-ready** architecture. Every story is a self-contained JSON module located in `src/stories/`.

### Core Principles
- **One Story, One JSON**: All seasons, episodes, and parts for a single story must reside in one JSON file.
- **English as Ground Truth**: The primary keys (`title`, `description`, `text`) should always contain the English version.
- **Deep Localization**: Use the `translations` object at the root for metadata and within each `StoryPart` for content.

## 📄 JSON Schema Definition

All stories must strictly adhere to the following TypeScript-compatible schema:

```json
{
  "id": "unique-uuid-v4",
  "title": "Main Title in English",
  "slug": "url-friendly-slug",
  "posterImage": "/images/stories/your-story.png",
  "description": "Engaging summary in Simple English.",
  "genres": ["Romance", "Drama", "Fantasy"],
  "availableLanguages": ["en", "hi"],
  "translations": {
    "hi": {
      "title": "हिंदी शीर्षक",
      "description": "कहानी का संक्षिप्त विवरण"
    }
  },
  "seasons": [
    {
      "id": "s1",
      "seasonNumber": 1,
      "title": "Season 1 Title",
      "description": "Brief season overview.",
      "episodes": [
        {
          "id": "s1e1",
          "episodeNumber": 1,
          "title": "Episode 1 Title",
          "duration": "10 min",
          "isLocked": false,
          "parts": [
            {
              "id": "p1",
              "text": "English narrative text (2-4 paragraphs).",
              "translations": {
                "hi": "हिंदी अनुवाद यहाँ लिखें।"
              }
            }
          ]
        }
      ]
    }
  ]
}
```

## 🚀 Workflow for New Stories

1.  **Prepare Content**: Convert raw text into structured episodes. Each "Part" should represent one "swipe" (mobile screen height).
2.  **Generate Assets**: Place a 16:9 or 3:4 poster in `public/images/stories/`.
3.  **Create JSON**: Save the file in `src/stories/[slug].json`.
4.  **Register**: Update `src/stories/index.ts`:
    ```typescript
    import myStory from './my-story.json';
    // ...
    export const ALL_STORIES: Story[] = [..., myStory];
    ```
5.  **Validate**: Run `npx tsc --noEmit` to ensure your JSON matches the `Story` interface.

## 🤖 AI Agent Instructions

When generating new stories:
- **Tone**: Use emotional, addictive, and simple language.
- **Structure**: Break long narratives into discrete episodes with cliffhangers.
- **Validation**: Ensure all IDs are unique (e.g., `s1e1p1`).
- **Completeness**: NEVER skip parts of the story. Ensure the narrative flows logically from start to finish.

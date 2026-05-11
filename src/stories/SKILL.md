# Wify.my Story Guide

This guide helps you add and manage stories in Wify.my.

## How it Works

Every story is a single `.json` file in `src/stories/`.
We use **Simple English** for all settings to make it easy for everyone.

## Story Data Structure (JSON)

Here is the format for a story file:

```json
{
  "id": "unique-id",
  "title": "Story Title (English)",
  "slug": "story-slug",
  "posterImage": "/images/stories/poster.png",
  "description": "Short story summary in English.",
  "genres": ["Drama"],
  "availableLanguages": ["en", "hi"],
  "translations": {
    "hi": {
      "title": "कहानी का शीर्षक",
      "description": "कहानी का सारांश"
    }
  },
  "seasons": [
    {
      "seasonNumber": 1,
      "episodes": [
        {
          "id": "e1",
          "title": "Episode 1 (English)",
          "parts": [
            { 
              "id": "p1", 
              "text": "English text part.",
              "translations": {
                "hi": "हिंदी कहानी का हिस्सा।"
              }
            }
          ]
        }
      ]
    }
  ]
}
```

## Multilingual Support

1. **English is Default**: Put English text in the main `text`, `title`, and `description` fields.
2. **Add Languages**: Add language codes (like `hi` for Hindi) to `availableLanguages`.
3. **Add Translations**: Use the `translations` object to add other languages. If a translation is missing, the app will show English.

## How to Add a Story

1. Create a `[slug].json` file in `src/stories/`.
2. Add your story content using the format above.
3. Register it in `src/stories/index.ts` by adding an import and adding it to the `ALL_STORIES` list.

## Tips for AI Agents
- Use simple words.
- Keep text parts short (2-4 sentences).
- Make sure JSON is valid (check commas!).

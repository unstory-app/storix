# Long Story Markdown Workflow

Use this folder for long-form stories that should stay in Markdown instead of hand-authored JSON.

## Folder Shape

Each story lives in its own folder:

```text
src/longstories/MyStory/
  story.config.ts
  prologue.md
  chapter-1.md
  chapter-2.md
  poster.png
```

Add the story config to `src/longstories/index.ts`. The loader reads one or more Markdown files, converts every file into an episode, and splits paragraphs into swipe-friendly reader parts.

## Config

```ts
const config = {
  id: 'uuid',
  title: 'Story Title',
  slug: 'story-title',
  posterImage: '/images/stories/story-title.png',
  description: 'Short SEO-ready summary.',
  genres: ['Romance', 'Fantasy', 'Drama'],
  rating: 4.9,
  views: 'New',
  status: 'Completed',
  baseDir: 'MyStory',
  files: [
    { file: 'prologue.md', title: 'Prologue' },
    { file: 'chapter-1.md', title: 'Chapter 1' },
  ],
};
```

Place the public poster in `public/images/stories/`. Markdown images are stripped for the swipe reader today; story artwork is handled through `posterImage`.

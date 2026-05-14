import fs from 'node:fs';
import path from 'node:path';
import { Episode, Story, StoryPart } from '@/types';
import { LongStoryConfig, LongStoryFile } from './types';

const WORDS_PER_MINUTE = 180;
const TARGET_PART_CHARS = 900;
const MAX_PART_CHARS = 1300;

const stripFrontMatter = (markdown: string) => {
  return markdown.replace(/^---[\s\S]*?---\s*/, '');
};

const markdownToReaderText = (markdown: string) => {
  return stripFrontMatter(markdown)
    .replace(/<div[\s\S]*?<\/div>/gi, '')
    .replace(/<figure[\s\S]*?<\/figure>/gi, '')
    .replace(/!\[[^\]]*]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)]\([^)]*\)/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/^\s*[-*+]\s+/gm, '')
    .replace(/^>\s?/gm, '')
    .replace(/[*_`~]/g, '')
    .replace(/\r\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
};

const titleFromMarkdown = (markdown: string, fallback: string) => {
  const match = stripFrontMatter(markdown).match(/^#\s+(.+)$/m);
  return match?.[1]?.trim() || fallback;
};

const slugify = (input: string) => {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

const splitIntoReaderParts = (text: string, idPrefix: string): StoryPart[] => {
  const paragraphs = text
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  const chunks: string[] = [];
  let current = '';

  for (const paragraph of paragraphs) {
    const candidate = current ? `${current}\n\n${paragraph}` : paragraph;

    if (candidate.length <= TARGET_PART_CHARS || current.length < 240) {
      current = candidate;
      continue;
    }

    chunks.push(current);
    current = paragraph;

    if (current.length > MAX_PART_CHARS) {
      const sentences = current.match(/[^.!?]+[.!?]+(?:\s|$)|[^.!?]+$/g) || [current];
      current = '';

      for (const sentence of sentences.map((item) => item.trim()).filter(Boolean)) {
        const sentenceCandidate = current ? `${current} ${sentence}` : sentence;
        if (sentenceCandidate.length > MAX_PART_CHARS && current) {
          chunks.push(current);
          current = sentence;
        } else {
          current = sentenceCandidate;
        }
      }
    }
  }

  if (current) chunks.push(current);

  return chunks.map((chunk, index) => ({
    id: `${idPrefix}p${index + 1}`,
    text: chunk,
  }));
};

const estimateDuration = (text: string) => {
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(2, Math.ceil(wordCount / WORDS_PER_MINUTE));
  return `${minutes} min`;
};

const episodeFromFile = (config: LongStoryConfig, item: LongStoryFile, index: number): Episode => {
  const absolutePath = path.join(process.cwd(), 'src', 'longstories', config.baseDir, item.file);
  const markdown = fs.readFileSync(absolutePath, 'utf8');
  const plainText = markdownToReaderText(markdown);
  const episodeNumber = item.episodeNumber || index + 1;
  const title = item.title || titleFromMarkdown(markdown, `Episode ${episodeNumber}`);
  const idPrefix = `${config.slug}-s1e${episodeNumber}`;

  return {
    id: slugify(`${config.slug}-${title}`),
    episodeNumber,
    title,
    duration: estimateDuration(plainText),
    isLocked: false,
    parts: splitIntoReaderParts(plainText, idPrefix),
  };
};

export const buildLongStory = (config: LongStoryConfig): Story => {
  const episodes = config.files.map((item, index) => episodeFromFile(config, item, index));

  return {
    id: config.id,
    title: config.title,
    slug: config.slug,
    posterImage: config.posterImage,
    description: config.description,
    genres: config.genres,
    rating: config.rating,
    views: config.views,
    status: config.status,
    availableLanguages: config.availableLanguages || ['en'],
    seasons: [
      {
        seasonNumber: 1,
        title: config.seasonTitle || 'Complete Story',
        description: config.seasonDescription || config.description,
        episodes,
      },
    ],
  };
};

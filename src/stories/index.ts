import { Story } from '../types';

import after99Rejections from './after-99-rejections.json';

// Simple registry of all stories. 
// When an AI agent creates a new story, they just add the import above and add it to this array.
const ALL_STORIES: Story[] = [
  after99Rejections as Story
];

/**
 * Returns all stories for the Home, Explore, and Library pages.
 */
export const getAllStories = (): Story[] => {
  return ALL_STORIES;
};

/**
 * Returns a specific story by its slug.
 */
export const getStoryBySlug = (slug: string): Story | undefined => {
  return ALL_STORIES.find(story => story.slug === slug);
};

/**
 * Returns a specific episode from a story.
 */
export const getEpisodeData = (slug: string, episodeId: string) => {
  const story = getStoryBySlug(slug);
  if (!story) return null;

  for (const season of story.seasons) {
    const ep = season.episodes.find(e => e.id === episodeId);
    if (ep) return ep;
  }
  
  return null;
};

/**
 * Finds the ID of the next episode in the story.
 */
export const getNextEpisodeId = (slug: string, currentEpisodeId: string): string | null => {
  const story = getStoryBySlug(slug);
  if (!story) return null;

  let foundCurrent = false;
  for (const season of story.seasons) {
    for (const ep of season.episodes) {
      if (foundCurrent) return ep.id;
      if (ep.id === currentEpisodeId) foundCurrent = true;
    }
  }
  
  return null;
};

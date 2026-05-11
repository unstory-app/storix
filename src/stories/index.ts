import { Story } from '../types';

import after99Rejections from './after-99-rejections.json';
import apocalypseLoveSystem from './apocalypse-love-system.json';
import rebornThoughts from './reborn-thoughts.json';
import dragonKing from './dragon-king.json';
import frozenApocalypse from './frozen-apocalypse.json';
import landladyEx from './landlady-ex.json';
import ceoWife from './ceo-wife.json';
import beastGirl from './beast-girl.json';
import beautyRoommates from './beauty-roommates.json';
import planeKiss from './plane-kiss.json';
import sinisterSchool from './sinister-school.json';

// Simple registry of all stories. 
// When an AI agent creates a new story, they just add the import above and add it to this array.
const ALL_STORIES: Story[] = [
  after99Rejections as Story,
  apocalypseLoveSystem as Story,
  rebornThoughts as Story,
  dragonKing as Story,
  frozenApocalypse as Story,
  landladyEx as Story,
  ceoWife as Story,
  beastGirl as Story,
  beautyRoommates as Story,
  planeKiss as Story,
  sinisterSchool as Story
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

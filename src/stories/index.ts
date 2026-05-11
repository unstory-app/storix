import { Story } from '../types';

import ceosSecretWife from './ceos-secret-wife.json';
import crownOfAshes from './crown-of-ashes.json';
import moonlitCurse from './moonlit-curse.json';
import myFakeBoyfriend from './my-fake-boyfriend.json';
import revengeInRed from './revenge-in-red.json';
import room909 from './room-909.json';
import theBillionairesRegret from './the-billionaires-regret.json';
import theLastMessage from './the-last-message.json';

// Simple registry of all stories. 
// When an AI agent creates a new story, they just add the import above and add it to this array.
const ALL_STORIES: Story[] = [
  ceosSecretWife as Story,
  crownOfAshes as Story,
  moonlitCurse as Story,
  myFakeBoyfriend as Story,
  revengeInRed as Story,
  room909 as Story,
  theBillionairesRegret as Story,
  theLastMessage as Story
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

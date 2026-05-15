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
import monsterGirl from './monster-girl.json';
import levelUp from './level-up-real-world.json';
import underworldHeir from './underworld-heir.json';
import secretTutor from './secret-agent-tutor.json';
import forbiddenPeak from './forbidden-peak.json';
import superstarShadow from './superstar-shadow.json';
import sheRefusesDivorce from './she-refuses-divorce.json';
import reincarnatedFather from './reincarnated-father.json';
import saveWife from './after-selling-my-daughter-save-wife.json';
import inLoveWeLost from './in-love-we-lost.json';
import longStories from './longstories.json';

// Simple registry of all stories. 
// When an AI agent creates a new story, they just add the import above and add it to this array.
const JSON_STORIES: Story[] = [
  saveWife as Story,
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
  sinisterSchool as Story,
  monsterGirl as Story,
  levelUp as Story,
  underworldHeir as Story,
  secretTutor as Story,
  forbiddenPeak as Story,
  superstarShadow as Story,
  sheRefusesDivorce as Story,
  reincarnatedFather as Story
];

const ALL_STORIES: Story[] = [
  ...(longStories as Story[]),
  inLoveWeLost as Story,
  ...JSON_STORIES,
];

const stripStoryContent = (story: Story): Story => ({
  ...story,
  seasons: story.seasons.map((season) => ({
    ...season,
    episodes: season.episodes.map((episode) => ({
      ...episode,
      parts: [],
    })),
  })),
});

/**
 * Returns all stories for the Home, Explore, and Library pages.
 */
export const getAllStories = (): Story[] => {
  return ALL_STORIES;
};

/**
 * Returns story metadata and episode outlines without episode text.
 * Use this for cards, lists, detail actions, and any client component that
 * should not serialize the complete reading content into the page payload.
 */
export const getAllStorySummaries = (): Story[] => {
  return ALL_STORIES.map(stripStoryContent);
};

/**
 * Returns a specific story by its slug.
 */
export const getStoryBySlug = (slug: string): Story | undefined => {
  return ALL_STORIES.find(story => story.slug === slug);
};

export const getStorySummaryBySlug = (slug: string): Story | undefined => {
  const story = getStoryBySlug(slug);
  return story ? stripStoryContent(story) : undefined;
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

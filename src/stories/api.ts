import { storyRegistry, StoryRegistryItem } from './registry';
import { Story, Episode } from '../types';

/**
 * Returns a lightweight list of all available stories (metadata only).
 * Use this for the Home, Explore, and Library pages.
 */
export const getStoryRegistry = (): StoryRegistryItem[] => {
  return storyRegistry;
};

/**
 * Returns the full metadata for a specific story, including its seasons
 * and a lightweight list of episodes (without the heavy text parts).
 */
export const getStoryDetails = async (slug: string): Promise<Story | null> => {
  try {
    const { metadata } = await import(`./content/${slug}/metadata.ts`);
    return metadata as Story;
  } catch (error) {
    console.error(`Error loading story metadata for ${slug}:`, error);
    return null;
  }
};

/**
 * Loads a specific episode and its heavy text parts on-demand.
 * This is dynamically imported so it only bundles when requested by the reader.
 */
export const getEpisodeData = async (slug: string, episodeId: string): Promise<Episode | null> => {
  try {
    const { episode } = await import(`./content/${slug}/episodes/${episodeId}.ts`);
    return episode as Episode;
  } catch (error) {
    console.error(`Error loading episode ${episodeId} for ${slug}:`, error);
    return null;
  }
};

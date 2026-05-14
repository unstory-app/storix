import { Story } from '@/types';
import { buildLongStory } from './loader';
import dakshaConfig from './configs/daksha';

export const getAllLongStories = (): Story[] => {
  return [buildLongStory(dakshaConfig)];
};

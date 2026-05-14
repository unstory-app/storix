import { Genre } from '@/types';

export interface LongStoryFile {
  file: string;
  title?: string;
  episodeNumber?: number;
}

export interface LongStoryConfig {
  id: string;
  title: string;
  slug: string;
  description: string;
  posterImage: string;
  genres: Genre[];
  rating: number;
  views: string;
  status: 'Ongoing' | 'Completed';
  baseDir: string;
  files: LongStoryFile[];
  seasonTitle?: string;
  seasonDescription?: string;
  availableLanguages?: string[];
}

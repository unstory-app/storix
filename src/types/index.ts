export type Genre = 
  | 'Romance' 
  | 'Drama' 
  | 'Thriller' 
  | 'Fantasy' 
  | 'Mystery' 
  | 'Billionaire' 
  | 'Werewolf' 
  | 'Revenge' 
  | 'Teen' 
  | 'Horror' 
  | 'Royal' 
  | 'Comedy';

export interface StoryPart {
  id: string;
  text: string; // Default text (usually English)
  translations?: Record<string, string>; // Language code to translated text
}

export interface Episode {
  id: string;
  episodeNumber: number;
  title: string;
  duration: string;
  isLocked?: boolean;
  parts: StoryPart[];
  translations?: Record<string, { title: string }>;
}

export interface Season {
  seasonNumber: number;
  title: string;
  description?: string;
  episodes: Episode[];
  translations?: Record<string, { title: string, description: string }>;
}

export interface Story {
  id: string;
  title: string;
  slug: string;
  posterImage: string;
  description: string;
  genres: Genre[];
  rating: number;
  views: string;
  status: 'Ongoing' | 'Completed';
  seasons: Season[];
  availableLanguages?: string[]; // e.g. ["en", "hi"]
  translations?: Record<string, { title: string, description: string }>;
}

export interface UserProgress {
  storyId: string;
  seasonNumber: number;
  episodeId: string;
  episodeNumber: number;
  partIndex: number;
  totalParts: number;
  updatedAt: string;
  completed: boolean;
}

export interface Bookmark {
  storyId: string;
  addedAt: string;
}

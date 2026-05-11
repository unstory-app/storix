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
  text: string;
}

export interface Episode {
  id: string;
  episodeNumber: number;
  title: string;
  duration: string;
  isLocked: boolean;
  parts: StoryPart[];
}

export interface Season {
  seasonNumber: number;
  title: string;
  description: string;
  episodes: Episode[];
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

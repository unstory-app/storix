import { UserProgress, Bookmark } from '../types';

const STORAGE_KEYS = {
  PROGRESS: 'wify_user_progress',
  BOOKMARKS: 'wify_bookmarks',
};

export const saveProgress = (progress: UserProgress) => {
  if (typeof window === 'undefined') return;
  
  const existingProgress = getFullProgress();
  const index = existingProgress.findIndex(p => p.storyId === progress.storyId);
  
  if (index >= 0) {
    existingProgress[index] = progress;
  } else {
    existingProgress.push(progress);
  }
  
  localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(existingProgress));
};

export const getFullProgress = (): UserProgress[] => {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(STORAGE_KEYS.PROGRESS);
  return stored ? JSON.parse(stored) : [];
};

export const getStoryProgress = (storyId: string): UserProgress | undefined => {
  const all = getFullProgress();
  return all.find(p => p.storyId === storyId);
};

export const getEpisodeProgress = (episodeId: string): UserProgress | undefined => {
  const all = getFullProgress();
  return all.find(p => p.episodeId === episodeId);
};

export const markEpisodeCompleted = (episodeId: string) => {
  const all = getFullProgress();
  const progress = all.find(p => p.episodeId === episodeId);
  if (progress) {
    progress.completed = true;
    saveProgress(progress);
  }
};

export const toggleBookmark = (storyId: string) => {
  if (typeof window === 'undefined') return;
  const bookmarks = getBookmarks();
  const index = bookmarks.findIndex(b => b.storyId === storyId);
  
  if (index >= 0) {
    bookmarks.splice(index, 1);
  } else {
    bookmarks.push({ storyId, addedAt: new Date().toISOString() });
  }
  
  localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(bookmarks));
};

export const getBookmarks = (): Bookmark[] => {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
  return stored ? JSON.parse(stored) : [];
};

export const isBookmarked = (storyId: string): boolean => {
  const bookmarks = getBookmarks();
  return bookmarks.some(b => b.storyId === storyId);
};

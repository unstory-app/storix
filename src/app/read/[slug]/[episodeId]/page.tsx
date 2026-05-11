import React from 'react';
import { getEpisodeData, getStoryBySlug, getNextEpisodeId } from '@/stories';
import ReaderScreen from '@/components/ReaderScreen';
import { notFound } from 'next/navigation';

export default async function ReaderPage({ params }: { params: Promise<{ slug: string, episodeId: string }> }) {
  const { slug, episodeId } = await params;
  
  const story = getStoryBySlug(slug);
  const episode = getEpisodeData(slug, episodeId);
  const nextEpisodeId = getNextEpisodeId(slug, episodeId);

  if (!story || !episode) {
    return notFound();
  }

  // Find season number
  const season = story.seasons?.find(s => s.episodes.some(e => e.id === episodeId));

  return (
    <ReaderScreen 
      episode={episode} 
      storyId={story.id} 
      seasonNumber={season?.seasonNumber || 1} 
      nextEpisodeId={nextEpisodeId}
      slug={slug}
    />
  );
}

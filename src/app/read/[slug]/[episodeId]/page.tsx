'use client';

import React, { use, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getEpisodeData, getStoryDetails } from '@/stories';
import ReaderScreen from '@/components/ReaderScreen';
import { Episode, Story } from '@/types';

export default function ReaderPage({ params }: { params: Promise<{ slug: string, episodeId: string }> }) {
  const { slug, episodeId } = use(params);
  
  const [episode, setEpisode] = useState<Episode | null>(null);
  const [story, setStory] = useState<Story | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getEpisodeData(slug, episodeId),
      getStoryDetails(slug)
    ]).then(([epData, storyData]) => {
      setEpisode(epData);
      setStory(storyData);
      setLoading(false);
    });
  }, [slug, episodeId]);

  if (loading) {
    return <div className="h-screen flex items-center justify-center bg-background text-text-secondary">Loading episode...</div>;
  }

  if (!episode || !story) {
    return (
      <div className="h-screen flex items-center justify-center bg-background text-white p-12 text-center">
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold">Episode not found</h2>
          <p className="text-text-secondary">We couldn't find the story part you were looking for.</p>
        </div>
      </div>
    );
  }

  // Find season number
  const season = story.seasons?.find(s => s.episodes.some(e => e.id === episodeId));

  return (
    <ReaderScreen 
      episode={episode} 
      storyId={story.id} 
      seasonNumber={season?.seasonNumber || 1} 
    />
  );
}

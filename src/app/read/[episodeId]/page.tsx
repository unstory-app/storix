'use client';

import React, { use } from 'react';
import { useParams } from 'next/navigation';
import { STORIES } from '@/data/mockData';
import ReaderScreen from '@/components/ReaderScreen';

export default function ReaderPage({ params }: { params: Promise<{ episodeId: string }> }) {
  const { episodeId } = use(params);
  
  // Find the episode and its story context
  let foundStory: any = null;
  let foundSeason: any = null;
  let foundEpisode: any = null;

  for (const story of STORIES) {
    for (const season of story.seasons) {
      const ep = season.episodes.find(e => e.id === episodeId);
      if (ep) {
        foundStory = story;
        foundSeason = season;
        foundEpisode = ep;
        break;
      }
    }
    if (foundEpisode) break;
  }

  if (!foundEpisode) {
    return (
      <div className="h-screen flex items-center justify-center bg-background text-white p-12 text-center">
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold">Episode not found</h2>
          <p className="text-text-secondary">We couldn't find the story part you were looking for.</p>
        </div>
      </div>
    );
  }

  return (
    <ReaderScreen 
      episode={foundEpisode} 
      storyId={foundStory.id} 
      seasonNumber={foundSeason.seasonNumber} 
    />
  );
}

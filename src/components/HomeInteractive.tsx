'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import StoryCard from './StoryCard';
import GenrePill from './GenrePill';
import { motion } from 'framer-motion';
import { getFullProgress } from '@/lib/storage';
import { UserProgress, Story } from '@/types';

interface HomeInteractiveProps {
  stories: Story[];
}

export default function HomeInteractive({ stories }: HomeInteractiveProps) {
  const [activeGenre, setActiveGenre] = useState('All');
  const [progress, setProgress] = useState<UserProgress[]>([]);

  useEffect(() => {
    setProgress(getFullProgress());
  }, []);

  const genres = ['All', 'Romance', 'Drama', 'Thriller', 'Fantasy', 'Mystery', 'Horror'];
  
  const filteredStories = activeGenre === 'All' 
    ? stories 
    : stories.filter(s => s.genres.includes(activeGenre as any));

  const continueReading = stories.filter(s => progress.some(p => p.storyId === s.id && !p.completed));

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="flex flex-col gap-12 mt-12">
      {/* Genre Filter */}
      <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar">
        {genres.map((genre) => (
          <GenrePill 
            key={genre} 
            genre={genre} 
            active={activeGenre === genre} 
            onClick={() => setActiveGenre(genre)} 
          />
        ))}
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="flex flex-col gap-16"
      >
        {/* Continue Reading */}
        {continueReading.length > 0 && (
          <section className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white tracking-tight">Continue Reading</h2>
              <Link href="/library">
                <button className="text-primary text-sm font-bold hover:underline">View Library</button>
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
              {continueReading.map((story) => {
                const storyProgress = progress.find(p => p.storyId === story.id);
                const percent = storyProgress ? (storyProgress.partIndex / storyProgress.totalParts) * 100 : 0;
                return (
                  <motion.div key={story.id} variants={item}>
                    <StoryCard story={story} progress={percent} />
                  </motion.div>
                );
              })}
            </div>
          </section>
        )}

        {/* Categories (Filtered) */}
        {activeGenre !== 'All' && (
          <section className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white tracking-tight">{activeGenre} Stories</h2>
              <Link href="/explore">
                <button className="text-primary text-sm font-bold hover:underline">See All</button>
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
              {filteredStories.map((story) => (
                <motion.div key={story.id} variants={item}>
                  <StoryCard story={story} />
                </motion.div>
              ))}
            </div>
          </section>
        )}
      </motion.div>
    </div>
  );
}

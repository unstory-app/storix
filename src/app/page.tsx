'use client';

import React, { useState, useEffect } from 'react';
import FeaturedStory from '@/components/FeaturedStory';
import StoryCard from '@/components/StoryCard';
import GenrePill from '@/components/GenrePill';
import { STORIES } from '@/data/mockData';
import { motion } from 'framer-motion';
import { getFullProgress } from '@/lib/storage';
import { UserProgress } from '@/types';

export default function Home() {
  const [activeGenre, setActiveGenre] = useState('All');
  const [progress, setProgress] = useState<UserProgress[]>([]);

  useEffect(() => {
    setProgress(getFullProgress());
  }, []);

  const genres = ['All', 'Romance', 'Drama', 'Thriller', 'Fantasy', 'Mystery', 'Horror'];
  
  const filteredStories = activeGenre === 'All' 
    ? STORIES 
    : STORIES.filter(s => s.genres.includes(activeGenre as any));

  const continueReading = STORIES.filter(s => progress.some(p => p.storyId === s.id && !p.completed));
  const trending = STORIES.slice(0, 4);
  const newEpisodes = STORIES.slice(4, 8);

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
    <div className="flex flex-col gap-12 px-6 md:px-12 py-8 pb-24">
      {/* Hero Section */}
      <FeaturedStory story={STORIES[0]} />

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

      {/* Sections */}
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
              <h2 className="text-2xl font-bold text-white">Continue Reading</h2>
              <button className="text-primary text-sm font-bold">View All</button>
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

        {/* Trending Now */}
        <section className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Trending Now</h2>
            <button className="text-primary text-sm font-bold">View All</button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
            {trending.map((story) => (
              <motion.div key={story.id} variants={item}>
                <StoryCard story={story} />
              </motion.div>
            ))}
          </div>
        </section>

        {/* New Episodes */}
        <section className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">New Episodes</h2>
            <button className="text-primary text-sm font-bold">View All</button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
            {newEpisodes.map((story) => (
              <motion.div key={story.id} variants={item}>
                <StoryCard story={story} />
              </motion.div>
            ))}
          </div>
        </section>

        {/* Categories (Filtered) */}
        {activeGenre !== 'All' && (
          <section className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-white">{activeGenre} Stories</h2>
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

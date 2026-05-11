'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, TrendingUp, Sparkles, Clock } from 'lucide-react';
import StoryCard from '@/components/StoryCard';
import GenrePill from '@/components/GenrePill';
import { Story } from '@/types';

export default function ExploreInteractive({ stories }: { stories: Story[] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeGenre, setActiveGenre] = useState('All');
  const [sortBy, setSortBy] = useState<'trending' | 'new' | 'rating'>('trending');

  const genres = ['All', 'Romance', 'Drama', 'Thriller', 'Fantasy', 'Mystery', 'Billionaire', 'Werewolf', 'Revenge', 'Teen', 'Horror'];

  const filteredStories = stories.filter(story => {
    const matchesSearch = story.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         story.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = activeGenre === 'All' || story.genres.includes(activeGenre as any);
    return matchesSearch && matchesGenre;
  }).sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'trending') return parseInt(b.views) - parseInt(a.views);
    return 0; // 'new' would sort by date if we had one
  });

  return (
    <div className="flex flex-col gap-6">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={20} />
        <input 
          type="text"
          placeholder="Search stories, authors, or genres..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-text-muted focus:outline-none focus:border-primary/50 transition-colors"
        />
        <button className="absolute right-4 top-1/2 -translate-y-1/2 p-2 hover:bg-white/10 rounded-xl transition-colors">
          <SlidersHorizontal size={20} className="text-text-muted hover:text-white transition-colors" />
        </button>
      </div>

      {/* Categories */}
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

      {/* Sort Options */}
      <div className="flex gap-4 border-b border-white/10 pb-4">
        <button 
          onClick={() => setSortBy('trending')}
          className={`flex items-center gap-2 text-sm font-bold transition-colors ${sortBy === 'trending' ? 'text-primary' : 'text-text-muted hover:text-white'}`}
        >
          <TrendingUp size={16} /> Trending
        </button>
        <button 
          onClick={() => setSortBy('new')}
          className={`flex items-center gap-2 text-sm font-bold transition-colors ${sortBy === 'new' ? 'text-white' : 'text-text-muted hover:text-white'}`}
        >
          <Sparkles size={16} /> New
        </button>
        <button 
          onClick={() => setSortBy('rating')}
          className={`flex items-center gap-2 text-sm font-bold transition-colors ${sortBy === 'rating' ? 'text-white' : 'text-text-muted hover:text-white'}`}
        >
          <Clock size={16} /> Top Rated
        </button>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6 mt-4">
        <AnimatePresence mode="popLayout">
          {filteredStories.map((story) => (
            <motion.div
              key={story.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <StoryCard story={story} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredStories.length === 0 && (
        <div className="py-24 text-center flex flex-col items-center gap-4 text-text-muted">
          <Search size={48} className="opacity-20" />
          <p className="text-lg">No stories found for your search.</p>
          <button 
            onClick={() => { setSearchQuery(''); setActiveGenre('All'); }}
            className="text-primary font-bold mt-4"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}

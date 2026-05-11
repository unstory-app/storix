'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getStoryRegistry } from '@/stories';
import StoryCard from '@/components/StoryCard';
import GenrePill from '@/components/GenrePill';
import { Search, SlidersHorizontal, TrendingUp, Sparkles, Clock } from 'lucide-react';

export default function Explore() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeGenre, setActiveGenre] = useState('All');
  const [sortBy, setSortBy] = useState<'trending' | 'new' | 'rating'>('trending');

  const genres = ['All', 'Romance', 'Drama', 'Thriller', 'Fantasy', 'Mystery', 'Billionaire', 'Werewolf', 'Revenge', 'Teen', 'Horror'];

  const registry = getStoryRegistry();

  const filteredStories = registry.filter(story => {
    const matchesSearch = story.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         story.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = activeGenre === 'All' || story.genres.includes(activeGenre as any);
    return matchesSearch && matchesGenre;
  });

  if (sortBy === 'rating') {
    filteredStories.sort((a, b) => b.rating - a.rating);
  }

  return (
    <div className="flex flex-col gap-10 px-6 md:px-12 py-12 pb-32">
      <div className="flex flex-col gap-6">
        <h1 className="text-4xl font-black text-white">Explore</h1>
        
        {/* Search Bar */}
        <div className="relative w-full max-w-2xl group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="Search stories, authors, or genres..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-white placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
          />
        </div>
      </div>

      {/* Filters & Sorting */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar">
          {genres.map((genre) => (
            <GenrePill 
              key={genre} 
              genre={genre} 
              active={activeGenre === genre} 
              onClick={() => setActiveGenre(genre)} 
            />
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 glass p-1 rounded-xl">
             <button 
              onClick={() => setSortBy('trending')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${sortBy === 'trending' ? 'bg-white/10 text-white' : 'text-text-muted hover:text-white'}`}
             >
               <TrendingUp size={14} /> Trending
             </button>
             <button 
              onClick={() => setSortBy('new')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${sortBy === 'new' ? 'bg-white/10 text-white' : 'text-text-muted hover:text-white'}`}
             >
               <Clock size={14} /> New
             </button>
             <button 
              onClick={() => setSortBy('rating')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${sortBy === 'rating' ? 'bg-white/10 text-white' : 'text-text-muted hover:text-white'}`}
             >
               <Sparkles size={14} /> Top Rated
             </button>
          </div>
          
          <button className="flex items-center gap-2 text-text-secondary hover:text-white transition-colors text-sm font-bold">
            <SlidersHorizontal size={16} /> Filters
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 md:gap-8">
        <AnimatePresence>
          {filteredStories.map((story) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              layout
            >
              <StoryCard story={story} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredStories.length === 0 && (
        <div className="py-32 flex flex-col items-center justify-center text-center gap-4">
           <div className="text-text-muted">
             <Search size={64} strokeWidth={1} />
           </div>
           <h3 className="text-xl font-bold text-white">No stories found</h3>
           <p className="text-text-secondary text-sm">Try adjusting your search or filters.</p>
           <button 
            onClick={() => {setSearchQuery(''); setActiveGenre('All');}}
            className="mt-4 text-primary font-bold underline"
           >
             Clear all filters
           </button>
        </div>
      )}
    </div>
  );
}

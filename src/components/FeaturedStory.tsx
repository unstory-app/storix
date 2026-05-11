'use client';

import React from 'react';
import Link from 'next/link';
import { Play, Bookmark, Star, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { Story } from '../types';

interface FeaturedStoryProps {
  story: Story;
}

const FeaturedStory = ({ story }: FeaturedStoryProps) => {
  return (
    <section className="relative w-full overflow-hidden rounded-[2.5rem] bg-[#15151C] shadow-premium">
      {/* Background with blur */}
      <div className="absolute inset-0 z-0">
        <img 
          src={story.posterImage} 
          alt="" 
          className="w-full h-full object-cover scale-110 blur-3xl opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#08080B] via-[#08080B]/60 to-transparent" />
      </div>

      <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center p-8 md:p-12 lg:p-16">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-6"
        >
          <div className="flex items-center gap-3">
            <span className="bg-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-primary/30">
              Featured Story
            </span>
            <div className="flex items-center gap-1 text-yellow-400">
              <Star size={14} fill="currentColor" />
              <span className="text-sm font-bold">{story.rating}</span>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1]">
            {story.title}
          </h1>

          <div className="flex flex-wrap gap-2">
            {story.genres.map((genre) => (
              <span key={genre} className="glass px-4 py-1.5 rounded-full text-xs font-medium text-text-secondary">
                {genre}
              </span>
            ))}
          </div>

          <p className="text-text-secondary text-base md:text-lg max-w-xl leading-relaxed">
            {story.description}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link href={`/story/${story.slug}`}>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 shadow-[0_10px_20px_-10px_#FF3D81]"
              >
                <Play size={20} fill="currentColor" />
                Start Reading
              </motion.button>
            </Link>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="glass p-4 rounded-2xl text-white hover:bg-white/10 transition-colors"
            >
              <Bookmark size={20} />
            </motion.button>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hidden md:block relative aspect-[4/5] w-[320px] lg:w-[400px] justify-self-center rounded-3xl overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-700"
        >
          <img 
            src={story.posterImage} 
            alt={story.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedStory;

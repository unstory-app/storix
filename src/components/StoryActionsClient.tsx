'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Bookmark, Clock, Lock } from 'lucide-react';
import Link from 'next/link';
import { isBookmarked, toggleBookmark, getStoryProgress } from '@/lib/storage';
import { Story } from '@/types';

export default function StoryActionsClient({ story }: { story: Story }) {
  const [activeSeason, setActiveSeason] = useState(1);
  const [bookmarked, setBookmarked] = useState(false);
  const [progress, setProgress] = useState<any>(null);

  useEffect(() => {
    setBookmarked(isBookmarked(story.id));
    setProgress(getStoryProgress(story.id));
  }, [story.id]);

  const currentSeason = story.seasons?.find(s => s.seasonNumber === activeSeason) || story.seasons?.[0];

  const handleBookmark = () => {
    toggleBookmark(story.id);
    setBookmarked(!bookmarked);
  };

  if (!currentSeason) return null;

  return (
    <>
      {/* Actions */}
      <div className="flex flex-wrap gap-4 mt-4">
        <Link href={`/read/${story.slug}/${progress?.episodeId || currentSeason.episodes[0].id}`}>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-primary text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 shadow-[0_10px_20px_-10px_#FF3D81]"
          >
            <Play size={20} fill="currentColor" />
            {progress ? 'Continue Reading' : 'Start Reading'}
          </motion.button>
        </Link>
        <motion.button 
          onClick={handleBookmark}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`glass p-4 rounded-2xl transition-colors ${bookmarked ? 'text-primary' : 'text-white'}`}
        >
          <Bookmark size={20} fill={bookmarked ? "currentColor" : "none"} />
        </motion.button>
      </div>

      {/* Season Selector */}
      <div className="flex flex-col gap-6 mt-12 w-full lg:col-span-2">
        <h3 className="text-xl font-bold text-white">Seasons</h3>
        <div className="flex gap-4 p-1 glass rounded-2xl w-fit">
          {story.seasons?.map((s) => (
            <button
              key={s.seasonNumber}
              onClick={() => setActiveSeason(s.seasonNumber)}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                activeSeason === s.seasonNumber 
                  ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/20' 
                  : 'text-text-muted hover:text-white'
              }`}
            >
              Season {s.seasonNumber}
            </button>
          ))}
        </div>

        {/* Episode List */}
        <div className="grid gap-4 mt-4 w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSeason}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid gap-4 w-full"
            >
              {currentSeason.episodes.map((episode) => (
                <Link key={episode.id} href={`/read/${story.slug}/${episode.id}`}>
                  <motion.div 
                    whileHover={{ x: 4 }}
                    className="glass p-5 rounded-2xl flex items-center justify-between group hover:border-primary/30 transition-all w-full"
                  >
                    <div className="flex items-center gap-6">
                      <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center font-black text-xl text-text-muted group-hover:text-primary transition-colors">
                        {episode.episodeNumber}
                      </div>
                      <div className="flex flex-col">
                        <h4 className="font-bold text-white group-hover:text-primary transition-colors">{episode.title}</h4>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="flex items-center gap-1 text-[10px] text-text-muted uppercase font-bold tracking-widest">
                            <Clock size={10} /> {episode.duration}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      {episode.isLocked ? (
                        <Lock size={18} className="text-text-muted" />
                      ) : (
                        <div className="bg-primary/10 p-2 rounded-lg text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                          <Play size={18} fill="currentColor" />
                        </div>
                      )}
                    </div>
                  </motion.div>
                </Link>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}

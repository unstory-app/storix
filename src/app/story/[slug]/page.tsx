'use client';

import React, { useState, useEffect, use } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { STORIES } from '@/data/mockData';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Eye, Layers, Clock, Play, Bookmark, ChevronRight, Lock, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { isBookmarked, toggleBookmark, getStoryProgress } from '@/lib/storage';

export default function StoryDetails({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const router = useRouter();
  const story = STORIES.find(s => s.slug === slug);
  const [activeSeason, setActiveSeason] = useState(1);
  const [bookmarked, setBookmarked] = useState(false);
  const [progress, setProgress] = useState<any>(null);

  useEffect(() => {
    if (story) {
      setBookmarked(isBookmarked(story.id));
      setProgress(getStoryProgress(story.id));
    }
  }, [story]);

  if (!story) return <div className="p-12 text-center">Story not found</div>;

  const currentSeason = story.seasons.find(s => s.seasonNumber === activeSeason) || story.seasons[0];

  const handleBookmark = () => {
    toggleBookmark(story.id);
    setBookmarked(!bookmarked);
  };

  return (
    <div className="min-h-screen pb-24">
      {/* Hero Header */}
      <section className="relative w-full aspect-square md:aspect-[21/9] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={story.posterImage} 
            alt="" 
            className="w-full h-full object-cover scale-105 blur-2xl opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        </div>

        <div className="relative z-10 h-full flex flex-col md:flex-row items-end gap-8 px-6 md:px-12 pb-12">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-40 md:w-64 aspect-[2/3] rounded-2xl overflow-hidden shadow-premium shrink-0"
          >
            <img src={story.posterImage} alt={story.title} className="w-full h-full object-cover" />
          </motion.div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-2">
              {story.genres.map(g => (
                <span key={g} className="bg-primary/20 text-primary text-[10px] font-bold px-3 py-1 rounded-full border border-primary/20">{g}</span>
              ))}
              <span className="bg-white/5 text-text-secondary text-[10px] font-bold px-3 py-1 rounded-full border border-white/10 uppercase tracking-widest">{story.status}</span>
            </div>
            
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white">{story.title}</h1>
            
            <div className="flex items-center gap-6 text-text-secondary text-sm">
              <div className="flex items-center gap-1.5">
                <Star size={16} className="text-yellow-400 fill-yellow-400" />
                <span className="font-bold text-white">{story.rating}</span>
                <span>Rating</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Eye size={16} />
                <span className="font-bold text-white">{story.views}</span>
                <span>Views</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Layers size={16} />
                <span className="font-bold text-white">{story.seasons.length}</span>
                <span>Seasons</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mt-4">
              <Link href={`/read/${progress?.episodeId || currentSeason.episodes[0].id}`}>
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
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="px-6 md:px-12 grid lg:grid-cols-3 gap-12 mt-12">
        <div className="lg:col-span-2 flex flex-col gap-12">
          {/* Description */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-bold text-white">Summary</h3>
            <p className="text-text-secondary text-lg leading-relaxed">
              {story.description}
            </p>
          </div>

          {/* Season Selector */}
          <div className="flex flex-col gap-6">
            <h3 className="text-xl font-bold text-white">Seasons</h3>
            <div className="flex gap-4 p-1 glass rounded-2xl w-fit">
              {story.seasons.map((s) => (
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
            <div className="grid gap-4 mt-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSeason}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="grid gap-4"
                >
                  {currentSeason.episodes.map((episode) => (
                    <Link key={episode.id} href={`/read/${episode.id}`}>
                      <motion.div 
                        whileHover={{ x: 4 }}
                        className="glass p-5 rounded-2xl flex items-center justify-between group hover:border-primary/30 transition-all"
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
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-8">
           <div className="glass p-8 rounded-[2rem] flex flex-col gap-6">
              <h3 className="font-bold text-lg text-white">Story Information</h3>
              <div className="flex flex-col gap-4">
                 <div className="flex justify-between items-center py-2 border-b border-white/5">
                   <span className="text-text-secondary text-sm">Status</span>
                   <span className="text-white text-sm font-bold uppercase tracking-widest">{story.status}</span>
                 </div>
                 <div className="flex justify-between items-center py-2 border-b border-white/5">
                   <span className="text-text-secondary text-sm">Language</span>
                   <span className="text-white text-sm font-bold">English</span>
                 </div>
                 <div className="flex justify-between items-center py-2 border-b border-white/5">
                   <span className="text-text-secondary text-sm">Age Rating</span>
                   <span className="text-white text-sm font-bold">16+</span>
                 </div>
              </div>

              <div className="bg-primary/10 p-4 rounded-2xl flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">W</div>
                <div className="flex flex-col">
                  <span className="text-xs text-text-secondary">Author</span>
                  <span className="text-sm font-bold text-white">Wify Originals</span>
                </div>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
}

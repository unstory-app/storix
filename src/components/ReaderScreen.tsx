'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { ChevronLeft, MoreHorizontal, Bookmark, ChevronUp, ChevronDown, List } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { StoryPart, Episode } from '@/types';
import { saveProgress, getEpisodeProgress } from '@/lib/storage';

interface ReaderScreenProps {
  episode: Episode;
  storyId: string;
  seasonNumber: number;
}

const ReaderScreen = ({ episode, storyId, seasonNumber }: ReaderScreenProps) => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // 1 for down, -1 for up
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    // Load existing progress
    const progress = getEpisodeProgress(episode.id);
    if (progress) {
      setCurrentIndex(progress.partIndex);
    }
  }, [episode.id]);

  const handleNext = useCallback(() => {
    if (currentIndex < episode.parts.length - 1) {
      setDirection(1);
      setCurrentIndex((prev) => prev + 1);
    }
  }, [currentIndex, episode.parts.length]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex((prev) => prev - 1);
    }
  }, [currentIndex]);

  useEffect(() => {
    // Save progress whenever currentIndex changes
    saveProgress({
      storyId,
      seasonNumber,
      episodeId: episode.id,
      episodeNumber: episode.episodeNumber,
      partIndex: currentIndex,
      totalParts: episode.parts.length,
      updatedAt: new Date().toISOString(),
      completed: currentIndex === episode.parts.length - 1,
    });
  }, [currentIndex, storyId, seasonNumber, episode.id, episode.parts.length, episode.episodeNumber]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const variants = {
    enter: (direction: number) => ({
      y: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.95
    }),
    center: {
      zIndex: 1,
      y: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      y: direction < 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 1.05
    })
  };

  return (
    <div className="fixed inset-0 z-[100] bg-background flex flex-col overflow-hidden select-none">
      {/* Background Gradient */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0F0F17] to-background" />

      {/* Header Bar */}
      <header className="relative z-50 flex items-center justify-between px-6 py-4 glass-dark">
        <button 
          onClick={() => router.back()}
          className="p-2 -ml-2 text-text-secondary hover:text-white transition-colors"
        >
          <ChevronLeft size={28} />
        </button>
        
        <div className="flex flex-col items-center">
          <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">
            Season {seasonNumber} · Episode {episode.episodeNumber}
          </span>
          <span className="text-xs font-medium text-text-secondary truncate max-w-[150px]">
            {episode.title}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsBookmarked(!isBookmarked)}
            className={`p-2 transition-colors ${isBookmarked ? 'text-primary' : 'text-text-secondary hover:text-white'}`}
          >
            <Bookmark size={22} fill={isBookmarked ? "currentColor" : "none"} />
          </button>
          <button className="p-2 text-text-secondary hover:text-white transition-colors">
            <MoreHorizontal size={22} />
          </button>
        </div>
      </header>

      {/* Segmented Progress Bar */}
      <div className="relative z-50 px-6 py-2 flex gap-1">
        {episode.parts.map((_, idx) => (
          <div key={idx} className="flex-1 h-1 rounded-full bg-white/10 overflow-hidden">
            <motion.div
              initial={false}
              animate={{ 
                width: idx <= currentIndex ? '100%' : '0%',
                backgroundColor: idx === currentIndex ? '#FF3D81' : idx < currentIndex ? 'rgba(255, 61, 129, 0.4)' : 'transparent'
              }}
              className="h-full"
            />
          </div>
        ))}
      </div>

      {/* Main Content (Swipeable) */}
      <main className="relative flex-1 flex items-center justify-center p-6 md:p-12 overflow-hidden touch-none">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              y: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
              scale: { duration: 0.4 }
            }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.y, velocity.y);

              if (swipe < -swipeConfidenceThreshold) {
                handleNext();
              } else if (swipe > swipeConfidenceThreshold) {
                handlePrev();
              }
            }}
            className="absolute inset-0 flex flex-col items-center justify-center p-8 md:p-24"
          >
            <div className="max-w-2xl w-full flex flex-col items-center gap-12">
               <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest bg-white/5 px-4 py-2 rounded-full border border-white/5">
                Part {currentIndex + 1} of {episode.parts.length}
              </span>

              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-2xl md:text-4xl lg:text-5xl font-medium leading-[1.4] md:leading-[1.5] text-white text-center italic"
              >
                {episode.parts[currentIndex].text}
              </motion.p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Swipe Indicators */}
        <div className="absolute bottom-12 left-0 right-0 flex flex-col items-center gap-2 pointer-events-none">
          {currentIndex < episode.parts.length - 1 ? (
             <motion.div 
               animate={{ y: [0, -10, 0] }}
               transition={{ repeat: Infinity, duration: 2 }}
               className="flex flex-col items-center text-text-muted"
             >
               <span className="text-[10px] font-bold uppercase tracking-widest">Swipe up</span>
               <ChevronUp size={20} />
             </motion.div>
          ) : (
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="glass p-6 rounded-3xl flex flex-col items-center gap-4 pointer-events-auto"
            >
              <div className="bg-primary/20 p-3 rounded-full">
                 <Bookmark size={32} className="text-primary" />
              </div>
              <div className="text-center">
                <h4 className="text-xl font-bold text-white">Episode Completed</h4>
                <p className="text-sm text-text-secondary">Ready for the next one?</p>
              </div>
              <div className="flex gap-3">
                 <button 
                  onClick={() => router.back()}
                  className="px-6 py-2 glass rounded-xl text-sm font-bold"
                 >
                   Back
                 </button>
                 <button className="px-6 py-2 bg-primary rounded-xl text-sm font-bold shadow-[0_5px_15px_rgba(255,61,129,0.3)]">
                   Next Episode
                 </button>
              </div>
            </motion.div>
          )}
        </div>
      </main>

      {/* Bottom Actions */}
      <footer className="relative z-50 glass-dark border-t border-border-subtle p-6 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-text-muted uppercase">Currently Reading</span>
          <span className="text-sm font-bold text-white truncate max-w-[150px] md:max-w-md">
            {episode.title}
          </span>
        </div>

        <div className="flex items-center gap-4">
           <button 
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`p-3 rounded-xl transition-colors ${currentIndex === 0 ? 'text-white/5' : 'bg-white/5 text-white hover:bg-white/10'}`}
           >
             <ChevronDown size={20} />
           </button>
           <button 
            onClick={handleNext}
            disabled={currentIndex === episode.parts.length - 1}
            className={`p-3 rounded-xl transition-colors ${currentIndex === episode.parts.length - 1 ? 'text-white/5' : 'bg-white/5 text-white hover:bg-white/10'}`}
           >
             <ChevronUp size={20} />
           </button>
           <button className="p-3 bg-white/5 text-white hover:bg-white/10 rounded-xl transition-colors">
             <List size={20} />
           </button>
        </div>
      </footer>
    </div>
  );
};

export default ReaderScreen;

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, MoreHorizontal, Bookmark, ChevronUp, ChevronDown, List } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Episode } from '@/types';
import { saveProgress, getEpisodeProgress } from '@/lib/storage';

interface ReaderScreenProps {
  episode: Episode;
  storyId: string;
  seasonNumber: number;
  nextEpisodeId?: string | null;
  slug: string;
}

const ReaderScreen = ({ episode, storyId, seasonNumber, nextEpisodeId, slug }: ReaderScreenProps) => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // 1 for down, -1 for up
  const [showHUD, setShowHUD] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    // Load existing progress
    const progress = getEpisodeProgress(episode.id);
    if (progress) {
      setCurrentIndex(progress.partIndex);
    }
  }, [episode.id]);

  const toggleHUD = () => setShowHUD(!showHUD);

  const handleNext = useCallback(() => {
    if (currentIndex < (episode.parts?.length || 0) - 1) {
      setDirection(1);
      setCurrentIndex((prev) => prev + 1);
    }
  }, [currentIndex, episode.parts?.length]);

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
      totalParts: episode.parts?.length || 0,
      updatedAt: new Date().toISOString(),
      completed: currentIndex === (episode.parts?.length || 0) - 1,
    });
  }, [currentIndex, storyId, seasonNumber, episode.id, episode.parts?.length, episode.episodeNumber]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === ' ') handleNext();
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
    }),
    center: {
      zIndex: 1,
      y: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      y: direction < 0 ? '100%' : '-100%',
      opacity: 0,
    })
  };

  return (
    <div className="fixed inset-0 z-[100] bg-background flex flex-col overflow-hidden select-none">
      {/* Background Gradient */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0D0D14] to-background" />

      {/* Header Bar */}
      <AnimatePresence>
        {showHUD && (
          <motion.header 
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 glass-dark border-b border-white/5"
          >
            <button 
              onClick={() => router.back()}
              className="p-2 -ml-2 text-text-secondary hover:text-white transition-colors"
            >
              <ChevronLeft size={28} />
            </button>
            
            <div className="flex flex-col items-center">
              <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">
                EPISODE {episode.episodeNumber}
              </span>
              <span className="text-xs font-bold text-white truncate max-w-[200px]">
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
          </motion.header>
        )}
      </AnimatePresence>

      {/* Segmented Progress Bar - Fixed at top, below header */}
      <div className={`fixed top-0 left-0 right-0 z-[60] flex gap-1 px-4 pt-1 transition-all duration-300 ${showHUD ? 'translate-y-20' : 'translate-y-2'}`}>
        {episode.parts?.map((_, idx) => (
          <div key={idx} className="flex-1 h-[2px] rounded-full bg-white/10 overflow-hidden">
            <motion.div
              initial={false}
              animate={{ 
                width: idx <= currentIndex ? '100%' : '0%',
                backgroundColor: idx === currentIndex ? '#FF3D81' : 'rgba(255, 61, 129, 0.4)'
              }}
              className="h-full"
            />
          </div>
        ))}
      </div>

      {/* Main Content (Swipeable) */}
      <main 
        className="relative flex-1 flex flex-col overflow-hidden touch-none"
        onClick={toggleHUD}
      >
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              y: { type: "spring", stiffness: 300, damping: 35 },
              opacity: { duration: 0.3 }
            }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.2}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.y, velocity.y);

              if (swipe < -swipeConfidenceThreshold) {
                handleNext();
              } else if (swipe > swipeConfidenceThreshold) {
                handlePrev();
              }
            }}
            className="absolute inset-0 flex flex-col items-center justify-center px-8 md:px-24 py-32"
          >
            <div className="max-w-xl w-full h-full flex flex-col items-start justify-center overflow-y-auto no-scrollbar py-12">
               <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col gap-8 w-full"
               >
                  {/* Part Text with Paragraph handling */}
                  <div className="text-xl md:text-2xl leading-[1.7] text-white/90 text-left whitespace-pre-wrap font-serif tracking-wide selection:bg-primary/30">
                    {episode.parts?.[currentIndex]?.text || 'Content loading...'}
                  </div>
                  
                  {/* Action Hints */}
                  <div className="flex items-center gap-4 pt-12 border-t border-white/5 opacity-30">
                    <div className="flex -space-x-2">
                       {[1,2,3].map(i => (
                         <div key={i} className="w-6 h-6 rounded-full border-2 border-background bg-white/10" />
                       ))}
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white">12.4K others reading</span>
                  </div>
               </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Swipe Indicators */}
        {currentIndex < (episode.parts?.length || 0) - 1 && !showHUD && (
           <div className="absolute bottom-12 left-0 right-0 flex flex-col items-center gap-2 pointer-events-none opacity-50">
             <motion.div 
               animate={{ y: [0, -10, 0] }}
               transition={{ repeat: Infinity, duration: 2 }}
               className="flex flex-col items-center text-text-muted"
             >
               <ChevronUp size={24} />
             </motion.div>
           </div>
        )}

        {/* End of Episode View */}
        {currentIndex === (episode.parts?.length || 0) - 1 && (
          <div className="absolute inset-0 z-50 flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="glass p-8 rounded-[2.5rem] flex flex-col items-center gap-8 max-w-sm w-full shadow-2xl border border-white/10"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-primary blur-2xl opacity-20 rounded-full" />
                <div className="relative bg-primary/20 p-6 rounded-full">
                   <Bookmark size={48} className="text-primary" fill="currentColor" />
                </div>
              </div>
              
              <div className="text-center space-y-2">
                <h4 className="text-2xl font-black text-white">Cliffhanger!</h4>
                <p className="text-text-secondary">What happens next? Don't stop now.</p>
              </div>

              <div className="flex flex-col gap-3 w-full">
                 <button 
                  onClick={() => router.back()}
                  className="w-full py-4 bg-white/5 hover:bg-white/10 rounded-2xl text-sm font-bold transition-all border border-white/5"
                 >
                   Back to Story
                 </button>
                 <button 
                  onClick={() => {
                    if (nextEpisodeId) {
                      router.push(`/read/${slug}/${nextEpisodeId}`);
                    } else {
                      router.push(`/story/${slug}`);
                    }
                  }}
                  className="w-full py-4 bg-primary hover:bg-primary-dark text-white rounded-2xl text-sm font-black shadow-xl shadow-primary/20 transition-all"
                 >
                   {nextEpisodeId ? 'NEXT EPISODE' : 'BACK TO DETAILS'}
                 </button>
              </div>
            </motion.div>
          </div>
        )}
      </main>

      {/* Bottom Actions */}
      <AnimatePresence>
        {showHUD && (
          <motion.footer 
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-0 left-0 right-0 z-50 glass-dark border-t border-white/5 p-6 flex items-center justify-between"
          >
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-black text-text-muted uppercase tracking-widest">Part {currentIndex + 1} / {episode.parts?.length || 0}</span>
              <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                 <span className="text-xs font-bold text-white uppercase tracking-tight">Live Session</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button 
                onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                disabled={currentIndex === 0}
                className={`p-3 rounded-2xl transition-all ${currentIndex === 0 ? 'opacity-20' : 'bg-white/5 text-white hover:bg-white/10 active:scale-90'}`}
              >
                <ChevronDown size={22} />
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); handleNext(); }}
                disabled={currentIndex === (episode.parts?.length || 0) - 1}
                className={`p-3 rounded-2xl transition-all ${currentIndex === (episode.parts?.length || 0) - 1 ? 'opacity-20' : 'bg-white/5 text-white hover:bg-white/10 active:scale-90'}`}
              >
                <ChevronUp size={22} />
              </button>
              <button className="p-3 bg-white/5 text-white hover:bg-white/10 rounded-2xl transition-all active:scale-90">
                <List size={22} />
              </button>
            </div>
          </motion.footer>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ReaderScreen;

'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, MoreHorizontal, Bookmark, ChevronUp, ChevronDown, List, ChevronRight, PartyPopper } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Episode, Story } from '@/types';
import { saveProgress, getEpisodeProgress } from '@/lib/storage';

interface ReaderScreenProps {
  episode: Episode;
  story: Story;
  seasonNumber: number;
  nextEpisodeId?: string | null;
  slug: string;
}

const LANG_NAMES: Record<string, string> = {
  en: 'English',
  hi: 'Hindi',
};

const Confetti = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-[100]">
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            top: -20, 
            left: `${Math.random() * 100}%`,
            rotate: 0,
            scale: Math.random() * 0.5 + 0.5
          }}
          animate={{ 
            top: '120%',
            rotate: 360,
            left: `${(Math.random() * 100)}%`
          }}
          transition={{ 
            duration: Math.random() * 2 + 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "linear"
          }}
          className="absolute w-2 h-2 rounded-sm opacity-60"
          style={{ 
            backgroundColor: ['#FF3D81', '#7C3AED', '#10B981', '#F59E0B', '#3B82F6'][Math.floor(Math.random() * 5)]
          }}
        />
      ))}
    </div>
  );
};

const ReaderScreen = ({ episode, story, seasonNumber, nextEpisodeId, slug }: ReaderScreenProps) => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); 
  const [showHUD, setShowHUD] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [showNavDrawer, setShowNavDrawer] = useState(false);

  const availableLanguages = story.availableLanguages || ['en'];

  useEffect(() => {
    // Load existing progress
    const progress = getEpisodeProgress(episode.id);
    if (progress) {
      setCurrentIndex(progress.partIndex);
    }
  }, [episode.id]);

  const toggleHUD = () => setShowHUD(!showHUD);

  const handleNext = useCallback(() => {
    const partsLength = episode.parts?.length || 0;
    if (currentIndex < partsLength) {
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
    const partsLength = episode.parts?.length || 0;
    saveProgress({
      storyId: story.id,
      seasonNumber,
      episodeId: episode.id,
      episodeNumber: episode.episodeNumber,
      partIndex: Math.min(currentIndex, partsLength - 1),
      totalParts: partsLength,
      updatedAt: new Date().toISOString(),
      completed: currentIndex >= partsLength - 1,
    });
  }, [currentIndex, story.id, seasonNumber, episode.id, episode.parts?.length, episode.episodeNumber]);

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

  const isAtEnd = currentIndex === (episode.parts?.length || 0);
  const currentSeason = story.seasons.find(s => s.seasonNumber === seasonNumber);
  const isLastEpisodeOfSeason = episode.episodeNumber === currentSeason?.episodes.length;

  return (
    <div className="fixed inset-0 z-[100] bg-background flex flex-col overflow-hidden select-none">
      {/* Background Gradient */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0D0D14] to-background" />

      {/* Navigation Drawer Overlay */}
      <AnimatePresence>
        {showNavDrawer && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowNavDrawer(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-[190]"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-[85%] max-w-sm glass-dark z-[200] flex flex-col shadow-2xl border-l border-white/10"
            >
              <div className="p-6 border-b border-white/5 flex items-center justify-between">
                <h3 className="text-xl font-black text-white uppercase tracking-tighter">Table of Contents</h3>
                <button onClick={() => setShowNavDrawer(false)} className="p-2 text-text-secondary hover:text-white transition-colors">
                  <ChevronRight size={24} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-8 no-scrollbar">
                {story.seasons.map(season => (
                  <div key={season.seasonNumber} className="space-y-4">
                    <div className="flex items-center gap-2 px-2">
                      <div className="h-[1px] flex-1 bg-white/5" />
                      <h4 className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">Season {season.seasonNumber}</h4>
                      <div className="h-[1px] flex-1 bg-white/5" />
                    </div>
                    <div className="grid gap-2">
                      {season.episodes.map(ep => (
                        <button
                          key={ep.id}
                          onClick={() => {
                            router.push(`/read/${slug}/${ep.id}`);
                            setShowNavDrawer(false);
                          }}
                          className={`w-full text-left p-4 rounded-2xl transition-all border group relative overflow-hidden ${
                            ep.id === episode.id 
                            ? 'bg-primary/20 border-primary/50 text-white shadow-lg shadow-primary/10' 
                            : 'bg-white/5 border-transparent text-text-secondary hover:bg-white/10'
                          }`}
                        >
                          <div className="flex items-center justify-between relative z-10">
                            <div className="flex flex-col gap-1">
                              <span className="text-[9px] font-black opacity-30 uppercase tracking-widest">Episode {ep.episodeNumber}</span>
                              <span className="text-sm font-bold truncate max-w-[200px]">{ep.title}</span>
                            </div>
                            {ep.id === episode.id && <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

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

            <div className="flex items-center gap-1">
              {availableLanguages.length > 1 && (
                <select 
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="bg-white/5 text-white text-[10px] font-bold px-2 py-1 rounded-lg border border-white/10 outline-none focus:border-primary/50 transition-colors mr-2 cursor-pointer"
                >
                  {availableLanguages.map(lang => (
                    <option key={lang} value={lang} className="bg-background text-white">
                      {LANG_NAMES[lang] || lang.toUpperCase()}
                    </option>
                  ))}
                </select>
              )}
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

      {/* Segmented Progress Bar */}
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
        <AnimatePresence initial={false} custom={direction} mode="wait">
          {!isAtEnd ? (
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
                    <div className="text-xl md:text-2xl leading-[1.7] text-white/90 text-left whitespace-pre-wrap font-serif tracking-wide selection:bg-primary/30">
                      {selectedLanguage === 'en' 
                        ? (episode.parts?.[currentIndex]?.text || 'Content loading...')
                        : (episode.parts?.[currentIndex]?.translations?.[selectedLanguage] || episode.parts?.[currentIndex]?.text || 'Content loading...')
                      }
                    </div>
                    
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
          ) : (
            /* End of Episode View */
            <motion.div 
              key="end-slide"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                y: { type: "spring", stiffness: 300, damping: 35 },
                opacity: { duration: 0.3 }
              }}
              className="absolute inset-0 z-50 flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm"
            >
              {isLastEpisodeOfSeason && <Confetti />}
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="glass p-8 rounded-[2.5rem] flex flex-col items-center gap-8 max-w-sm w-full shadow-2xl border border-white/10"
              >
                <div className="relative">
                  <div className={`absolute inset-0 blur-2xl opacity-20 rounded-full ${isLastEpisodeOfSeason ? 'bg-green-500' : 'bg-primary'}`} />
                  <div className={`relative p-6 rounded-full ${isLastEpisodeOfSeason ? 'bg-green-500/20' : 'bg-primary/20'}`}>
                     {isLastEpisodeOfSeason ? <PartyPopper size={48} className="text-green-500" /> : <Bookmark size={48} className="text-primary" fill="currentColor" />}
                  </div>
                </div>
                
                <div className="text-center space-y-2">
                  <h4 className="text-2xl font-black text-white">{isLastEpisodeOfSeason ? 'Season Complete!' : 'Cliffhanger!'}</h4>
                  <p className="text-text-secondary">{isLastEpisodeOfSeason ? 'You just finished an entire season. Epic!' : "What happens next? Don't stop now."}</p>
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
                    className={`w-full py-4 rounded-2xl text-sm font-black shadow-xl transition-all ${
                      isLastEpisodeOfSeason 
                      ? 'bg-green-500 hover:bg-green-600 text-white shadow-green-500/20' 
                      : 'bg-primary hover:bg-primary-dark text-white shadow-primary/20'
                    }`}
                   >
                     {nextEpisodeId ? (isLastEpisodeOfSeason ? 'START NEXT SEASON' : 'NEXT EPISODE') : 'BACK TO DETAILS'}
                   </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Swipe Indicators */}
        {!isAtEnd && !showHUD && (
           <div className="absolute bottom-12 left-0 right-0 flex flex-col items-center gap-2 pointer-events-none opacity-50">
             <motion.div 
               animate={{ y: [0, -10, 0] }}
               transition={{ duration: 2, repeat: Infinity }}
               className="text-white"
             >
               <ChevronUp size={24} />
             </motion.div>
             <span className="text-[10px] font-bold text-white uppercase tracking-[0.2em]">Swipe for more</span>
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
                onClick={(e) => { 
                  e.stopPropagation(); 
                  if (currentIndex < (episode.parts?.length || 0)) {
                    handleNext(); 
                  } else if (nextEpisodeId) {
                    router.push(`/read/${slug}/${nextEpisodeId}`);
                  }
                }}
                className={`p-3 rounded-2xl transition-all shadow-lg active:scale-90 ${
                  currentIndex === (episode.parts?.length || 0)
                  ? 'bg-primary text-white shadow-primary/40 animate-pulse' 
                  : 'bg-white/5 text-white hover:bg-white/10'
                }`}
              >
                <ChevronUp size={22} />
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); setShowNavDrawer(true); }}
                className="p-3 bg-white/5 text-white hover:bg-white/10 rounded-2xl transition-all active:scale-90"
              >
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

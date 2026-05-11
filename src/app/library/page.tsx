'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getAllStories } from '@/stories';
import { getFullProgress, getBookmarks } from '@/lib/storage';
import StoryCard from '@/components/StoryCard';
import { UserProgress, Bookmark } from '@/types';
import { Bookmark as BookmarkIcon, PlayCircle, History, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function Library() {
  const [progress, setProgress] = useState<UserProgress[]>([]);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [activeTab, setActiveTab] = useState<'reading' | 'bookmarks' | 'completed'>('reading');

  useEffect(() => {
    setProgress(getFullProgress());
    setBookmarks(getBookmarks());
  }, []);

  const registry = getAllStories();

  const readingStories = registry.filter(s => progress.some(p => p.storyId === s.id && !p.completed));
  const bookmarkedStories = registry.filter(s => bookmarks.some(b => b.storyId === s.id));
  const completedStories = registry.filter(s => progress.some(p => p.storyId === s.id && p.completed));

  const tabs = [
    { id: 'reading', label: 'Reading', icon: PlayCircle, count: readingStories.length },
    { id: 'bookmarks', label: 'Bookmarks', icon: BookmarkIcon, count: bookmarkedStories.length },
    { id: 'completed', label: 'Completed', icon: CheckCircle2, count: completedStories.length },
  ] as const;

  const currentList = activeTab === 'reading' ? readingStories : activeTab === 'bookmarks' ? bookmarkedStories : completedStories;

  return (
    <div className="flex flex-col gap-8 px-6 md:px-12 py-12 pb-32">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-black text-white">Your Library</h1>
        <p className="text-text-secondary text-sm">Manage your reading progress and bookmarks.</p>
      </div>

      <div className="flex gap-4 p-1 glass rounded-2xl w-full max-w-md">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all ${
              activeTab === tab.id 
                ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg' 
                : 'text-text-muted hover:text-white'
            }`}
          >
            <tab.icon size={16} />
            <span className="hidden sm:inline">{tab.label}</span>
            <span className="bg-white/10 px-2 py-0.5 rounded-full text-[10px]">{tab.count}</span>
          </button>
        ))}
      </div>

      <motion.div 
        layout
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6"
      >
        {currentList.length > 0 ? (
          currentList.map((story) => {
             const storyProgress = progress.find(p => p.storyId === story.id);
             const percent = storyProgress ? (storyProgress.partIndex / storyProgress.totalParts) * 100 : 0;
             return (
               <motion.div
                 key={story.id}
                 initial={{ opacity: 0, scale: 0.9 }}
                 animate={{ opacity: 1, scale: 1 }}
                 layout
               >
                 <StoryCard story={story} progress={percent} />
               </motion.div>
             );
          })
        ) : (
          <div className="col-span-full py-24 flex flex-col items-center justify-center gap-6 text-center">
             <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center text-text-muted">
                {activeTab === 'reading' ? <History size={48} /> : activeTab === 'bookmarks' ? <BookmarkIcon size={48} /> : <CheckCircle2 size={48} />}
             </div>
             <div className="flex flex-col gap-2">
               <h3 className="text-xl font-bold text-white">Nothing here yet</h3>
               <p className="text-text-secondary text-sm max-w-[250px]">
                 Explore our collection and start your first story today.
               </p>
             </div>
             <Link href="/explore">
                <button className="bg-primary text-white px-8 py-3 rounded-xl font-bold">
                  Explore Stories
                </button>
             </Link>
          </div>
        )}
      </motion.div>
    </div>
  );
}

'use client';

import React from 'react';
import Link from 'next/link';
import { Search, Bookmark, User, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

import InstallButton from './InstallButton';

const AppHeader = () => {
  return (
    <header className="sticky top-0 z-50 w-full glass-dark py-4 px-6 md:px-12 flex items-center justify-between">
      <Link href="/" className="flex items-center gap-1 group">
        <span className="text-2xl font-bold text-white tracking-tight">Wify</span>
        <span className="text-2xl font-bold text-primary tracking-tight">.my</span>
      </Link>

      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-text-secondary">
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <Link href="/explore" className="hover:text-white transition-colors">Explore</Link>
        <Link href="/library" className="hover:text-white transition-colors">Library</Link>
        <Link href="/pdfs" className="hover:text-white transition-colors">PDFs</Link>
      </div>

      <div className="flex items-center gap-4">
        <InstallButton />
        <button className="p-2 text-text-secondary hover:text-white transition-colors">
          <Search size={22} />
        </button>
        <Link href="/pdfs" className="hidden sm:block p-2 text-text-secondary hover:text-white transition-colors">
          <BookOpen size={22} />
        </Link>
        <Link href="/library" className="hidden sm:block p-2 text-text-secondary hover:text-white transition-colors">
          <Bookmark size={22} />
        </Link>
        <Link href="/profile" className="flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-primary to-secondary p-[2px]">
          <div className="w-full h-full rounded-full bg-background flex items-center justify-center overflow-hidden">
             <User size={20} className="text-white" />
          </div>
        </Link>
      </div>
    </header>
  );
};

export default AppHeader;

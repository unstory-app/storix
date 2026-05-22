'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Compass, Bookmark, User, LayoutDashboard, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

const MobileBottomNav = () => {
  const pathname = usePathname();

  const navItems = [
    { name: 'Home', icon: Home, path: '/' },
    { name: 'Explore', icon: Compass, path: '/explore' },
    { name: 'PDFs', icon: BookOpen, path: '/pdfs' },
    { name: 'Library', icon: Bookmark, path: '/library' },
    { name: 'Profile', icon: User, path: '/profile' },
  ];

  // Hide on reader page or pdf viewer
  if (pathname.startsWith('/read/') || (pathname.startsWith('/pdfs/') && pathname !== '/pdfs')) return null;

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass-dark border-t border-border-subtle px-4 py-3 pb-safe">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link key={item.name} href={item.path} className="relative flex flex-col items-center gap-1">
              <motion.div
                whileTap={{ scale: 0.9 }}
                className={`p-1 rounded-xl transition-colors ${isActive ? 'text-primary' : 'text-text-muted hover:text-text-secondary'}`}
              >
                <item.icon size={24} />
              </motion.div>
              <span className={`text-[10px] font-medium ${isActive ? 'text-primary' : 'text-text-muted'}`}>
                {item.name}
              </span>
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -top-3 w-1 h-1 bg-primary rounded-full shadow-[0_0_10px_#FF3D81]"
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileBottomNav;

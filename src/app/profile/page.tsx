'use client';

import { User, Settings, CreditCard, Bell, Shield, LogOut, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProfilePage() {
  return (
    <div className="flex flex-col items-center gap-10 px-6 md:px-12 py-12 pb-32 max-w-2xl mx-auto">
      {/* Profile Header */}
      <div className="flex flex-col items-center gap-4">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary p-1">
          <div className="w-full h-full rounded-full bg-background flex items-center justify-center overflow-hidden border-4 border-background">
             <User size={48} className="text-white" />
          </div>
        </div>
        <div className="flex flex-col items-center gap-1">
          <h1 className="text-2xl font-black text-white">Guest Reader</h1>
          <span className="text-sm text-text-secondary">Free Member</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-8 w-full glass p-6 rounded-3xl">
        <div className="flex flex-col items-center gap-1">
          <span className="text-xl font-black text-white">1</span>
          <span className="text-[10px] text-text-muted uppercase tracking-widest font-bold">Stories</span>
        </div>
        <div className="flex flex-col items-center gap-1 border-x border-white/5">
          <span className="text-xl font-black text-white">20</span>
          <span className="text-[10px] text-text-muted uppercase tracking-widest font-bold">Episodes</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <span className="text-xl font-black text-white">120</span>
          <span className="text-[10px] text-text-muted uppercase tracking-widest font-bold">Minutes</span>
        </div>
      </div>

      {/* About Section */}
      <div className="flex flex-col gap-4 w-full">
        <div className="p-6 glass rounded-3xl border border-white/5">
          <h3 className="text-sm font-bold text-white mb-2">Privacy Notice</h3>
          <p className="text-xs text-text-muted leading-relaxed">
            All your reading progress and bookmarks are stored only on this device. We do not collect your personal data.
          </p>
        </div>
      </div>

      <button className="flex items-center gap-2 text-text-muted font-bold text-sm mt-4 hover:text-white transition-colors">
        <Settings size={18} /> App Settings
      </button>
    </div>
  );
}

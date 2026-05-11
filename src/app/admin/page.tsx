'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  BarChart3, 
  Plus, 
  Settings, 
  Search, 
  MoreVertical,
  Layers,
  Play,
  Eye,
  Star,
  Sparkles
} from 'lucide-react';
import { getStoryRegistry } from '@/stories';

export default function AdminDashboard() {
  const stats = [
    { label: 'Total Stories', value: '48', icon: BookOpen, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { label: 'Total Readers', value: '124.5K', icon: Users, color: 'text-pink-400', bg: 'bg-pink-400/10' },
    { label: 'Daily Active', value: '12.2K', icon: BarChart3, color: 'text-green-400', bg: 'bg-green-400/10' },
    { label: 'Total Revenue', value: '$45,210', icon: Star, color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
  ];

  return (
    <div className="flex flex-col gap-10 px-6 md:px-12 py-12 pb-32">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-black text-white">Admin Dashboard</h1>
          <p className="text-text-secondary text-sm">Welcome back, Admin. Here's what's happening with Wify.my.</p>
        </div>
        <button className="bg-primary text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 w-fit">
          <Plus size={20} /> Create New Story
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="glass p-6 rounded-3xl flex flex-col gap-4"
          >
            <div className={`w-12 h-12 rounded-2xl ${stat.bg} flex items-center justify-center ${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <div className="flex flex-col">
              <span className="text-text-secondary text-xs font-bold uppercase tracking-widest">{stat.label}</span>
              <span className="text-3xl font-black text-white">{stat.value}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Story Management Table */}
      <div className="flex flex-col gap-6 mt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Recent Stories</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
            <input 
              type="text" 
              placeholder="Search stories..."
              className="bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-xs text-white focus:outline-none focus:border-primary transition-colors"
            />
          </div>
        </div>

        <div className="glass rounded-3xl overflow-hidden overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 text-[10px] font-black text-text-muted uppercase tracking-[0.2em]">
                <th className="px-6 py-6">Story</th>
                <th className="px-6 py-6">Genres</th>
                <th className="px-6 py-6">Rating</th>
                <th className="px-6 py-6">Views</th>
                <th className="px-6 py-6">Seasons</th>
                <th className="px-6 py-6">Status</th>
                <th className="px-6 py-6">Actions</th>
              </tr>
            </thead>
            <tbody>
              {getStoryRegistry().map((story) => (
                <tr key={story.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-14 rounded-lg overflow-hidden shrink-0">
                        <img src={story.posterImage} alt="" className="w-full h-full object-cover" />
                      </div>
                      <span className="text-sm font-bold text-white group-hover:text-primary transition-colors truncate max-w-[150px]">{story.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-1">
                      {story.genres.slice(0, 2).map(g => (
                        <span key={g} className="text-[10px] bg-white/5 text-text-secondary px-2 py-0.5 rounded-full">{g}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-yellow-400">
                      <Star size={12} fill="currentColor" />
                      <span className="text-xs font-bold text-white">{story.rating}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs text-text-secondary">{story.views}</td>
                  <td className="px-6 py-4 text-xs text-text-secondary">{story.totalSeasons}</td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-black px-2 py-1 rounded-md ${story.status === 'Ongoing' ? 'bg-blue-400/10 text-blue-400' : 'bg-green-400/10 text-green-400'}`}>
                      {story.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-text-muted hover:text-white transition-colors">
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Editor Mock */}
      <div className="grid lg:grid-cols-2 gap-8 mt-6">
         <div className="glass p-8 rounded-[2rem] flex flex-col gap-6">
            <h3 className="font-bold text-lg text-white">Create New Episode</h3>
            <div className="flex flex-col gap-4">
               <div className="flex flex-col gap-2">
                 <label className="text-xs font-bold text-text-muted uppercase tracking-widest">Episode Title</label>
                 <input type="text" placeholder="Enter title..." className="bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-primary transition-colors" />
               </div>
               <div className="flex flex-col gap-2">
                 <label className="text-xs font-bold text-text-muted uppercase tracking-widest">Story Part Editor</label>
                 <textarea rows={4} placeholder="Enter dramatic text part..." className="bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-primary transition-colors resize-none"></textarea>
                 <p className="text-[10px] text-text-muted italic">Parts should be 1-4 sentences for the vertical reader experience.</p>
               </div>
               <button className="bg-white/5 hover:bg-white/10 text-white py-3 rounded-xl text-sm font-bold transition-all border border-white/10">
                 + Add Another Part
               </button>
               <button className="bg-primary text-white py-4 rounded-xl font-bold shadow-lg shadow-primary/20 mt-2">
                 Publish Episode
               </button>
            </div>
         </div>

         <div className="glass p-8 rounded-[2rem] flex flex-col gap-6">
            <h3 className="font-bold text-lg text-white">Content Guidelines</h3>
            <div className="flex flex-col gap-6">
               <div className="flex gap-4">
                 <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Play size={20} />
                 </div>
                 <div className="flex flex-col gap-1">
                   <h4 className="text-sm font-bold text-white">Keep it Punchy</h4>
                   <p className="text-xs text-text-secondary leading-relaxed">Vertical reading is about speed and emotion. Avoid long paragraphs that require scrolling within a single part.</p>
                 </div>
               </div>
               <div className="flex gap-4">
                 <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
                    <Sparkles size={20} />
                 </div>
                 <div className="flex flex-col gap-1">
                   <h4 className="text-sm font-bold text-white">Emotional Hook</h4>
                   <p className="text-xs text-text-secondary leading-relaxed">End every episode with a cliffhanger to encourage readers to continue to the next one.</p>
                 </div>
               </div>
               <div className="flex gap-4">
                 <div className="w-10 h-10 rounded-xl bg-green-400/10 flex items-center justify-center text-green-400 shrink-0">
                    <Layers size={20} />
                 </div>
                 <div className="flex flex-col gap-1">
                   <h4 className="text-sm font-bold text-white">Visual Posters</h4>
                   <p className="text-xs text-text-secondary leading-relaxed">High-quality cinematic posters increase click-through rates by up to 40%.</p>
                 </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}

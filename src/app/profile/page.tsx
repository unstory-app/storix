'use client';

import { User, Settings, CreditCard, Bell, Shield, LogOut, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProfilePage() {
  const menuItems = [
    { icon: User, label: 'Account Settings', sub: 'Manage your profile details' },
    { icon: Bell, label: 'Notifications', sub: 'Configure reading alerts' },
    { icon: CreditCard, label: 'Subscription', sub: 'Manage your Wify+ plan' },
    { icon: Shield, label: 'Privacy', sub: 'Control your data visibility' },
    { icon: Settings, label: 'Preferences', sub: 'Theme and reading settings' },
  ];

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
          <span className="text-sm text-text-secondary">Free Tier Member</span>
        </div>
        <button className="bg-white/5 border border-white/10 px-6 py-2 rounded-full text-xs font-bold hover:bg-white/10 transition-all">
          Edit Profile
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-8 w-full glass p-6 rounded-3xl">
        <div className="flex flex-col items-center gap-1">
          <span className="text-xl font-black text-white">12</span>
          <span className="text-[10px] text-text-muted uppercase tracking-widest font-bold">Stories</span>
        </div>
        <div className="flex flex-col items-center gap-1 border-x border-white/5">
          <span className="text-xl font-black text-white">45</span>
          <span className="text-[10px] text-text-muted uppercase tracking-widest font-bold">Episodes</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <span className="text-xl font-black text-white">850</span>
          <span className="text-[10px] text-text-muted uppercase tracking-widest font-bold">Minutes</span>
        </div>
      </div>

      {/* Menu */}
      <div className="flex flex-col gap-4 w-full">
        {menuItems.map((item, idx) => (
          <motion.button
            key={idx}
            whileHover={{ x: 4 }}
            className="flex items-center justify-between p-5 glass rounded-2xl group"
          >
            <div className="flex items-center gap-4">
               <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-text-secondary group-hover:text-primary transition-colors">
                  <item.icon size={20} />
               </div>
               <div className="flex flex-col items-start">
                  <span className="text-sm font-bold text-white">{item.label}</span>
                  <span className="text-[10px] text-text-muted">{item.sub}</span>
               </div>
            </div>
            <ChevronRight size={16} className="text-text-muted group-hover:text-white transition-colors" />
          </motion.button>
        ))}
      </div>

      <button className="flex items-center gap-2 text-red-400 font-bold text-sm mt-4 hover:text-red-300 transition-colors">
        <LogOut size={18} /> Sign Out
      </button>

      {/* Premium Banner */}
      <div className="w-full bg-gradient-to-r from-primary to-secondary p-6 rounded-3xl flex flex-col gap-4 mt-4 shadow-premium">
         <div className="flex flex-col gap-1">
            <h3 className="text-lg font-black text-white">Upgrade to Wify+</h3>
            <p className="text-white/80 text-xs">Unlock all locked episodes and read ad-free.</p>
         </div>
         <button className="bg-white text-primary px-6 py-2.5 rounded-xl font-bold text-sm w-fit shadow-lg">
           Learn More
         </button>
      </div>
    </div>
  );
}

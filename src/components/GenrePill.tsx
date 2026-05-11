'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface GenrePillProps {
  genre: string;
  active?: boolean;
  onClick?: () => void;
}

const GenrePill = ({ genre, active = false, onClick }: GenrePillProps) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
        active 
          ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/20' 
          : 'bg-white/5 text-text-secondary hover:bg-white/10 hover:text-white border border-white/5'
      }`}
    >
      {genre}
    </motion.button>
  );
};

export default GenrePill;

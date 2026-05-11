'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  progress: number;
  className?: string;
  height?: number | string;
  color?: string;
}

const ProgressBar = ({ progress, className = '', height = 4, color = 'bg-primary' }: ProgressBarProps) => {
  return (
    <div className={`w-full bg-white/10 rounded-full overflow-hidden ${className}`} style={{ height }}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${Math.min(Math.max(progress, 0), 100)}%` }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`h-full ${color} rounded-full shadow-[0_0_10px_rgba(255,61,129,0.3)]`}
      />
    </div>
  );
};

export default ProgressBar;

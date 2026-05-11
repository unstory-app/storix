'use client';

import React from 'react';
import Link from 'next/link';
import { Star, Eye, Layers } from 'lucide-react';
import { motion } from 'framer-motion';
import { Story } from '../types';

interface StoryCardProps {
  story: Story;
  progress?: number;
}

const StoryCard = ({ story, progress }: StoryCardProps) => {
  return (
    <Link href={`/story/${story.slug}`}>
      <motion.div 
        whileHover={{ y: -8 }}
        whileTap={{ scale: 0.98 }}
        className="group relative flex flex-col gap-3 w-full"
      >
        <div className="relative aspect-[2/3] w-full overflow-hidden rounded-2xl md:rounded-3xl shadow-xl">
          {/* Poster Image */}
          <img 
            src={story.posterImage} 
            alt={story.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110 group-hover:brightness-110"
          />
          
          {/* Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/20" />
          
          {/* Rating Badge */}
          <div className="absolute top-3 left-3 glass px-2 py-1 rounded-lg flex items-center gap-1">
            <Star size={12} className="text-yellow-400 fill-yellow-400" />
            <span className="text-[10px] font-bold text-white">{story.rating}</span>
          </div>

          {/* Status Badge */}
          {story.status === 'Completed' && (
            <div className="absolute top-3 right-3 bg-secondary px-2 py-1 rounded-lg">
              <span className="text-[10px] font-bold text-white uppercase tracking-wider">Done</span>
            </div>
          )}

          {/* Genre Tag */}
          <div className="absolute bottom-16 left-3">
             <span className="text-[10px] font-semibold bg-primary/80 backdrop-blur-md text-white px-2 py-0.5 rounded-full">
               {story.genres[0]}
             </span>
          </div>

          {/* Title on Card */}
          <div className="absolute bottom-4 left-3 right-3">
            <h3 className="text-white font-bold text-sm md:text-base leading-tight line-clamp-2">
              {story.title}
            </h3>
          </div>

          {/* Progress Bar */}
          {progress !== undefined && progress > 0 && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-full bg-primary"
              />
            </div>
          )}
          
          {/* Desktop Hover Action */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
            <span className="bg-white text-black px-4 py-2 rounded-full font-bold text-xs uppercase tracking-widest shadow-lg">
              Read Now
            </span>
          </div>
        </div>

        {/* Metadata below card (Mobile context) */}
        <div className="flex items-center gap-3 text-text-muted text-[10px]">
          <div className="flex items-center gap-1">
            <Eye size={12} />
            <span>{story.views}</span>
          </div>
          <div className="flex items-center gap-1">
            <Layers size={12} />
            <span>{(story as any).totalSeasons ?? story.seasons?.length ?? 1} Seasons</span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default StoryCard;

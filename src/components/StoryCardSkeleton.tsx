'use client';

import React from 'react';
import Skeleton from './Skeleton';

const StoryCardSkeleton = () => {
  return (
    <div className="flex flex-col gap-3 w-full">
      <Skeleton className="aspect-[2/3] w-full rounded-2xl md:rounded-3xl" />
      <div className="flex items-center gap-3">
        <Skeleton className="h-3 w-12 rounded-full" />
        <Skeleton className="h-3 w-16 rounded-full" />
      </div>
    </div>
  );
};

export default StoryCardSkeleton;

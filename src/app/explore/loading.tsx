import React from 'react';
import StoryCardSkeleton from '@/components/StoryCardSkeleton';
import Skeleton from '@/components/Skeleton';

export default function Loading() {
  return (
    <div className="flex flex-col gap-8 px-6 md:px-12 py-8 pb-24">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-12 w-48 rounded-lg" />
        <Skeleton className="h-6 w-64 rounded-lg" />
      </div>

      <div className="flex flex-col gap-8">
        {/* Search Bar Skeleton */}
        <Skeleton className="h-14 w-full max-w-md rounded-2xl" />

        {/* Categories Skeleton */}
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-10 w-24 rounded-full" />
          ))}
        </div>

        {/* Results Grid Skeleton */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
            <StoryCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

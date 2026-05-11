import React from 'react';
import FeaturedStorySkeleton from '@/components/FeaturedStorySkeleton';
import StoryCardSkeleton from '@/components/StoryCardSkeleton';
import Skeleton from '@/components/Skeleton';

export default function Loading() {
  return (
    <div className="flex flex-col px-6 md:px-12 py-8 pb-24">
      {/* Hero Section Skeleton */}
      <FeaturedStorySkeleton />

      {/* Interactive Client Section Skeleton */}
      <div className="flex flex-col gap-8 mt-12">
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-10 w-24 rounded-full" />
          ))}
        </div>
        <Skeleton className="h-48 w-full rounded-[2rem]" />
      </div>

      <div className="flex flex-col gap-16 mt-16">
        {/* Trending Now Skeleton */}
        <section className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <Skeleton className="h-8 w-32 rounded-lg" />
            <Skeleton className="h-4 w-16 rounded-lg" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <StoryCardSkeleton key={i} />
            ))}
          </div>
        </section>

        {/* New Episodes Skeleton */}
        <section className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <Skeleton className="h-8 w-24 rounded-lg" />
            <Skeleton className="h-4 w-16 rounded-lg" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <StoryCardSkeleton key={i} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

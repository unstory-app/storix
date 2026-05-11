'use client';

import React from 'react';
import Skeleton from './Skeleton';

const FeaturedStorySkeleton = () => {
  return (
    <section className="relative w-full overflow-hidden rounded-[2.5rem] bg-[#15151C] shadow-premium">
      <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center p-8 md:p-12 lg:p-16">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <Skeleton className="h-6 w-24 rounded-full" />
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>

          <Skeleton className="h-12 w-3/4 md:h-16 lg:h-20 rounded-xl" />

          <div className="flex flex-wrap gap-2">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-8 w-20 rounded-full" />
            ))}
          </div>

          <div className="space-y-2">
            <Skeleton className="h-4 w-full rounded-md" />
            <Skeleton className="h-4 w-5/6 rounded-md" />
            <Skeleton className="h-4 w-4/5 rounded-md" />
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Skeleton className="h-14 w-40 rounded-2xl" />
            <Skeleton className="h-14 w-14 rounded-2xl" />
          </div>
        </div>

        <div className="hidden md:block justify-self-center">
          <Skeleton className="aspect-[4/5] w-[320px] lg:w-[400px] rounded-3xl rotate-3" />
        </div>
      </div>
    </section>
  );
};

export default FeaturedStorySkeleton;

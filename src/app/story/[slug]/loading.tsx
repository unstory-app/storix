import React from 'react';
import Skeleton from '@/components/Skeleton';

export default function Loading() {
  return (
    <div className="min-h-screen pb-24">
      {/* Hero Header Skeleton */}
      <section className="relative w-full aspect-square md:aspect-[21/9] overflow-hidden">
        <div className="relative z-10 h-full flex flex-col md:flex-row items-end gap-8 px-6 md:px-12 pb-12">
          <Skeleton className="w-40 md:w-64 aspect-[2/3] rounded-2xl md:rounded-3xl shrink-0" />
          <div className="flex flex-col gap-4 w-full">
            <div className="flex gap-2">
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>
            <Skeleton className="h-12 w-3/4 md:h-16 rounded-xl" />
            <div className="flex gap-6">
              <Skeleton className="h-6 w-24 rounded-lg" />
              <Skeleton className="h-6 w-24 rounded-lg" />
              <Skeleton className="h-6 w-24 rounded-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Content Section Skeleton */}
      <section className="px-6 md:px-12 grid lg:grid-cols-3 gap-12 mt-12">
        <div className="lg:col-span-2 flex flex-col gap-12">
          <div className="flex flex-col gap-4">
            <Skeleton className="h-8 w-32 rounded-lg" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full rounded-md" />
              <Skeleton className="h-4 w-full rounded-md" />
              <Skeleton className="h-4 w-2/3 rounded-md" />
            </div>
          </div>
          <div className="flex gap-4">
            <Skeleton className="h-14 w-40 rounded-2xl" />
            <Skeleton className="h-14 w-40 rounded-2xl" />
          </div>
          <div className="flex flex-col gap-4">
             {[1, 2, 3, 4].map(i => (
               <Skeleton key={i} className="h-16 w-full rounded-2xl" />
             ))}
          </div>
        </div>

        {/* Sidebar Skeleton */}
        <div className="flex flex-col gap-8">
           <Skeleton className="h-64 w-full rounded-[2rem]" />
        </div>
      </section>
    </div>
  );
}

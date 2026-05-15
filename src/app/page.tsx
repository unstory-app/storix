import React from 'react';
import Link from 'next/link';
import FeaturedStory from '@/components/FeaturedStory';
import StoryCard from '@/components/StoryCard';
import HomeInteractive from '@/components/HomeInteractive';
import { getAllStorySummaries } from '@/stories';

export default function Home() {
  const stories = getAllStorySummaries();
  const trending = stories.slice(0, 4);
  const newEpisodes = stories.slice(4, 8);

  return (
    <div className="flex flex-col px-6 md:px-12 py-8 pb-24">
      {/* Hero Section */}
      <FeaturedStory story={stories[0]} />

      {/* Interactive Client Section (Genre Filters & Continue Reading) */}
      <HomeInteractive stories={stories} />

      <div className="flex flex-col gap-16 mt-16">
        {/* Trending Now */}
        <section className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white tracking-tight">Trending</h2>
            <Link href="/explore">
              <button className="text-primary text-sm font-bold hover:underline transition-all">See All</button>
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
            {trending.map((story) => (
              <StoryCard key={story.id} story={story} />
            ))}
          </div>
        </section>

        {/* New Episodes */}
        <section className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white tracking-tight">New</h2>
            <Link href="/explore">
              <button className="text-primary text-sm font-bold hover:underline transition-all">See All</button>
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
            {newEpisodes.map((story) => (
              <StoryCard key={story.id} story={story} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Explore | Wify.my',
  description: 'Find stories to read.',
};

import ExploreInteractive from '@/components/ExploreInteractive';
import { getAllStorySummaries } from '@/stories';

export default function Explore() {
  const stories = getAllStorySummaries();

  return (
    <div className="flex flex-col gap-8 px-6 md:px-12 py-8 pb-24">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl md:text-5xl font-black text-white">Explore</h1>
        <p className="text-text-secondary text-lg">Find your next favorite story.</p>
      </div>

      <ExploreInteractive stories={stories} />
    </div>
  );
}

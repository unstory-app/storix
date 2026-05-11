import { Metadata } from 'next';
import { getEpisodeData, getStoryBySlug, getNextEpisodeId } from '@/stories';
import ReaderScreen from '@/components/ReaderScreen';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: Promise<{ slug: string, episodeId: string }> }): Promise<Metadata> {
  const { slug, episodeId } = await params;
  const story = getStoryBySlug(slug);
  const episode = getEpisodeData(slug, episodeId);
  if (!story || !episode) return { title: 'Not Found' };
  
  return {
    title: `Reading ${episode.title} | ${story.title}`,
    description: `Read ${episode.title} from the story ${story.title} on Wify.my.`,
  };
}

export default async function ReaderPage({ params }: { params: Promise<{ slug: string, episodeId: string }> }) {
  const { slug, episodeId } = await params;
  
  const story = getStoryBySlug(slug);
  const episode = getEpisodeData(slug, episodeId);
  const nextEpisodeId = getNextEpisodeId(slug, episodeId);

  if (!story || !episode) {
    return notFound();
  }

  // Find season number
  const season = story.seasons?.find(s => s.episodes.some(e => e.id === episodeId));

  return (
    <ReaderScreen 
      key={episodeId}
      episode={episode} 
      storyId={story.id} 
      seasonNumber={season?.seasonNumber || 1} 
      nextEpisodeId={nextEpisodeId}
      slug={slug}
      availableLanguages={story.availableLanguages}
    />
  );
}

import { Metadata } from 'next';
import { getAllStories, getEpisodeData, getStoryBySlug, getNextEpisodeId } from '@/stories';
import ReaderScreen from '@/components/ReaderScreen';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return getAllStories().flatMap((story) =>
    story.seasons.flatMap((season) =>
      season.episodes.map((episode) => ({
        slug: story.slug,
        episodeId: episode.id,
      }))
    )
  );
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string, episodeId: string }> }): Promise<Metadata> {
  const { slug, episodeId } = await params;
  const story = getStoryBySlug(slug);
  const episode = getEpisodeData(slug, episodeId);
  if (!story || !episode) return { title: 'Not Found' };
  const url = `/read/${story.slug}/${episode.id}`;
  
  return {
    title: `${episode.title} | ${story.title}`,
    description: `Read ${episode.title} from ${story.title}. ${story.description}`,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${episode.title} | ${story.title}`,
      description: story.description,
      url,
      type: 'article',
      images: [
        {
          url: story.posterImage,
          width: 1024,
          height: 1536,
          alt: `${story.title} poster`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${episode.title} | ${story.title}`,
      description: story.description,
      images: [story.posterImage],
    },
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
      story={story}
      seasonNumber={season?.seasonNumber || 1} 
      nextEpisodeId={nextEpisodeId}
      slug={slug}
    />
  );
}

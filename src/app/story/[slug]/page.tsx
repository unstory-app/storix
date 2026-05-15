import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllStories, getStoryBySlug, getStorySummaryBySlug } from '@/stories';
import { BookOpen, Clock, Eye, Globe2, Layers, Star } from 'lucide-react';
import StoryActionsClient from '@/components/StoryActionsClient';

export async function generateStaticParams() {
  return getAllStories().map((story) => ({ slug: story.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const story = getStoryBySlug(slug);
  if (!story) return { title: 'Story Not Found' };
  const url = `/story/${story.slug}`;
  
  return {
    title: story.title,
    description: story.description,
    alternates: {
      canonical: url,
    },
    keywords: [
      story.title,
      ...story.genres,
      'read story online',
      'swipe story',
      'romance story',
      'fantasy story',
    ],
    openGraph: {
      title: story.title,
      description: story.description,
      url,
      type: 'book',
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
      title: story.title,
      description: story.description,
      images: [story.posterImage],
    },
  };
}

export default async function StoryDetails({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const story = getStoryBySlug(slug);
  const storySummary = getStorySummaryBySlug(slug);

  if (!story) return notFound();

  const episodes = story.seasons.flatMap((season) => season.episodes);
  const partCount = episodes.reduce((sum, episode) => sum + episode.parts.length, 0);
  const totalMinutes = episodes.reduce((sum, episode) => {
    const minutes = Number.parseInt(episode.duration, 10);
    return sum + (Number.isFinite(minutes) ? minutes : 0);
  }, 0);
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Book',
    name: story.title,
    description: story.description,
    image: story.posterImage,
    url: `https://wify.my/story/${story.slug}`,
    genre: story.genres,
    inLanguage: story.availableLanguages || ['en'],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: story.rating,
      ratingCount: 1200,
      bestRating: 5,
      worstRating: 1,
    },
  };

  return (
    <div className="min-h-screen pb-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {/* Hero Header */}
      <section className="relative w-full aspect-square md:aspect-[21/9] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={story.posterImage} 
            alt="" 
            className="w-full h-full object-cover scale-105 blur-2xl opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        </div>

        <div className="relative z-10 h-full flex flex-col md:flex-row items-end gap-8 px-6 md:px-12 pb-12">
          <div className="w-40 md:w-64 aspect-[2/3] rounded-2xl overflow-hidden shadow-premium shrink-0 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <img src={story.posterImage} alt={story.title} className="w-full h-full object-cover" />
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-2">
              {story.genres.map(g => (
                <span key={g} className="bg-primary/20 text-primary text-[10px] font-bold px-3 py-1 rounded-full border border-primary/20">{g}</span>
              ))}
              <span className="bg-white/5 text-text-secondary text-[10px] font-bold px-3 py-1 rounded-full border border-white/10 uppercase tracking-widest">{story.status}</span>
            </div>
            
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white">{story.title}</h1>
            
            <div className="flex items-center gap-6 text-text-secondary text-sm">
              <div className="flex items-center gap-1.5">
                <Star size={16} className="text-yellow-400 fill-yellow-400" />
                <span className="font-bold text-white">{story.rating}</span>
                <span>Rating</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Eye size={16} />
                <span className="font-bold text-white">{story.views}</span>
                <span>Views</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Layers size={16} />
                <span className="font-bold text-white">{story.seasons?.length || 1}</span>
                <span>Seasons</span>
              </div>
              <div className="hidden sm:flex items-center gap-1.5">
                <Clock size={16} />
                <span className="font-bold text-white">{totalMinutes || episodes.length * 5}</span>
                <span>Min</span>
              </div>
            </div>

            {/* Interactive Client Actions (Buttons and Seasons) */}
            <div className="hidden">
               {/* We render the buttons inside StoryActionsClient, but we can't easily break the layout here. Let's pass the story. */}
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="px-6 md:px-12 grid lg:grid-cols-3 gap-12 mt-12">
        <div className="lg:col-span-2 flex flex-col gap-12">
          
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-bold text-white">Summary</h3>
            <p className="text-text-secondary text-lg leading-relaxed">
              {story.description}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
              <div className="glass rounded-2xl p-4">
                <BookOpen size={18} className="text-primary mb-3" />
                <div className="text-2xl font-black text-white">{episodes.length}</div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Episodes</div>
              </div>
              <div className="glass rounded-2xl p-4">
                <Layers size={18} className="text-primary mb-3" />
                <div className="text-2xl font-black text-white">{partCount}</div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Swipe Parts</div>
              </div>
              <div className="glass rounded-2xl p-4">
                <Clock size={18} className="text-primary mb-3" />
                <div className="text-2xl font-black text-white">{totalMinutes || episodes.length * 5}</div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Minutes</div>
              </div>
              <div className="glass rounded-2xl p-4">
                <Globe2 size={18} className="text-primary mb-3" />
                <div className="text-2xl font-black text-white">{story.availableLanguages?.length || 1}</div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Languages</div>
              </div>
            </div>
          </div>

          <StoryActionsClient story={storySummary || story} />
          
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-8">
           <div className="glass p-8 rounded-[2rem] flex flex-col gap-6">
              <h3 className="font-bold text-lg text-white">Story Information</h3>
              <div className="flex flex-col gap-4">
                 <div className="flex justify-between items-center py-2 border-b border-white/5">
                   <span className="text-text-secondary text-sm">Status</span>
                   <span className="text-white text-sm font-bold uppercase tracking-widest">{story.status}</span>
                 </div>
                 <div className="flex justify-between items-center py-2 border-b border-white/5">
                   <span className="text-text-secondary text-sm">Language</span>
                   <span className="text-white text-sm font-bold">{story.availableLanguages?.join(', ').toUpperCase() || 'EN'}</span>
                 </div>
                 <div className="flex justify-between items-center py-2 border-b border-white/5">
                   <span className="text-text-secondary text-sm">Age Rating</span>
                   <span className="text-white text-sm font-bold">16+</span>
                 </div>
              </div>

              <div className="bg-primary/10 p-4 rounded-2xl flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">W</div>
                <div className="flex flex-col">
                  <span className="text-xs text-text-secondary">Author</span>
                  <span className="text-sm font-bold text-white">Wify Originals</span>
                </div>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
}

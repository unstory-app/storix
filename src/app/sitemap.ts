import { MetadataRoute } from 'next'
import { getAllStories } from '@/stories'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://wify.my'
  
  // Static routes
  const routes = [
    '',
    '/explore',
    '/library',
    '/profile',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  const stories = getAllStories()

  const storyRoutes = stories.map((story) => ({
    url: `${baseUrl}/story/${story.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const episodeRoutes = stories.flatMap((story) =>
    story.seasons.flatMap((season) =>
      season.episodes.map((episode) => ({
        url: `${baseUrl}/read/${story.slug}/${episode.id}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      }))
    )
  )

  return [...routes, ...storyRoutes, ...episodeRoutes]
}

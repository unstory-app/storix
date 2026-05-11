import { MetadataRoute } from 'next'

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

  // Dynamic story routes (manually added for now, could be dynamic)
  const stories = [
    'after-99-rejections',
    'apocalypse-love-system',
  ].map((slug) => ({
    url: `${baseUrl}/story/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [...routes, ...stories]
}

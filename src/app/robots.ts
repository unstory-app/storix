import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/admin/', // Assuming admin is private
    },
    sitemap: 'https://wify.my/sitemap.xml',
  }
}

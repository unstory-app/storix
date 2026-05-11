import { Story } from '../../../types';

export const metadata: Omit<Story, 'seasons'> & { seasons: any[] } = {
  "id": "7",
  "title": "My Fake Boyfriend",
  "slug": "my-fake-boyfriend",
  "posterImage": "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=800&auto=format&fit=crop",
  "description": "One fake date becomes the biggest rumor in school. And maybe something more.",
  "genres": [
    "Teen",
    "Romance",
    "Comedy"
  ],
  "rating": 4.4,
  "views": "900K",
  "status": "Completed",
  "seasons": [
    {
      "seasonNumber": 1,
      "title": "The Rumor Mill",
      "description": "High school drama at its best.",
      "episodes": [
        {
          "id": "e7-s1",
          "episodeNumber": 1,
          "title": "The Deal",
          "duration": "4 min",
          "isLocked": false,
          "partsCount": 3
        }
      ]
    }
  ]
};

import { Story } from '../../../types';

export const metadata: Omit<Story, 'seasons'> & { seasons: any[] } = {
  "id": "6",
  "title": "Crown of Ashes",
  "slug": "crown-of-ashes",
  "posterImage": "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=800&auto=format&fit=crop",
  "description": "A fallen princess must marry her enemy to reclaim a burning kingdom.",
  "genres": [
    "Fantasy",
    "Royal"
  ],
  "rating": 4.9,
  "views": "2.5M",
  "status": "Ongoing",
  "seasons": [
    {
      "seasonNumber": 1,
      "title": "The Fallen Kingdom",
      "description": "Reclaiming what was lost.",
      "episodes": [
        {
          "id": "e6-s1",
          "episodeNumber": 1,
          "title": "The Enemy's Bed",
          "duration": "6 min",
          "isLocked": false,
          "partsCount": 3
        }
      ]
    }
  ]
};

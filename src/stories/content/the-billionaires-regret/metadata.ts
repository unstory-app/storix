import { Story } from '../../../types';

export const metadata: Omit<Story, 'seasons'> & { seasons: any[] } = {
  "id": "8",
  "title": "The Billionaire’s Regret",
  "slug": "the-billionaires-regret",
  "posterImage": "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop",
  "description": "He left her with nothing. Five years later, she owns the company he needs.",
  "genres": [
    "Romance",
    "Drama",
    "Billionaire"
  ],
  "rating": 4.8,
  "views": "3.2M",
  "status": "Ongoing",
  "seasons": [
    {
      "seasonNumber": 1,
      "title": "The Reunion",
      "description": "Five years was a long time to plan a revenge.",
      "episodes": [
        {
          "id": "e8-s1",
          "episodeNumber": 1,
          "title": "Table Turned",
          "duration": "5 min",
          "isLocked": false,
          "partsCount": 3
        }
      ]
    }
  ]
};

import { Story } from '../../../types';

export const metadata: Omit<Story, 'seasons'> & { seasons: any[] } = {
  "id": "1",
  "title": "The CEO’s Secret Wife",
  "slug": "ceos-secret-wife",
  "posterImage": "https://images.unsplash.com/photo-1516589174184-c685266e4af4?q=80&w=800&auto=format&fit=crop",
  "description": "A contract marriage turns dangerous when hidden feelings become impossible to deny. Evelyn didn't expect to fall for the man she was paid to marry.",
  "genres": [
    "Romance",
    "Drama",
    "Billionaire"
  ],
  "rating": 4.8,
  "views": "1.2M",
  "status": "Ongoing",
  "seasons": [
    {
      "seasonNumber": 1,
      "title": "The Contract",
      "description": "How it all started with a single signature.",
      "episodes": [
        {
          "id": "e1-s1",
          "episodeNumber": 1,
          "title": "The Proposition",
          "duration": "5 min",
          "isLocked": false,
          "partsCount": 4
        },
        {
          "id": "e1-s2",
          "episodeNumber": 2,
          "title": "The First Night",
          "duration": "4 min",
          "isLocked": false,
          "partsCount": 3
        }
      ]
    }
  ]
};

import { Story } from '../../../types';

export const metadata: Omit<Story, 'seasons'> & { seasons: any[] } = {
  "id": "2",
  "title": "Moonlit Curse",
  "slug": "moonlit-curse",
  "posterImage": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop",
  "description": "She was born without a wolf, but the alpha’s mark awakens something ancient within her soul.",
  "genres": [
    "Werewolf",
    "Fantasy",
    "Romance"
  ],
  "rating": 4.9,
  "views": "850K",
  "status": "Ongoing",
  "seasons": [
    {
      "seasonNumber": 1,
      "title": "The Awakening",
      "description": "The discovery of the ancient mark.",
      "episodes": [
        {
          "id": "e2-s1",
          "episodeNumber": 1,
          "title": "The Alpha's Mark",
          "duration": "6 min",
          "isLocked": false,
          "partsCount": 3
        }
      ]
    }
  ]
};

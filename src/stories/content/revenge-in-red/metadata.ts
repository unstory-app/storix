import { Story } from '../../../types';

export const metadata: Omit<Story, 'seasons'> & { seasons: any[] } = {
  "id": "4",
  "title": "Revenge in Red",
  "slug": "revenge-in-red",
  "posterImage": "https://images.unsplash.com/photo-1509248961158-e54f6934749c?q=80&w=800&auto=format&fit=crop",
  "description": "Betrayed by everyone she loved, she returns with a new name and a colder heart.",
  "genres": [
    "Revenge",
    "Drama"
  ],
  "rating": 4.6,
  "views": "1.5M",
  "status": "Ongoing",
  "seasons": [
    {
      "seasonNumber": 1,
      "title": "The Return",
      "description": "The queen returns to her throne.",
      "episodes": [
        {
          "id": "e4-s1",
          "episodeNumber": 1,
          "title": "Ashes of the Past",
          "duration": "5 min",
          "isLocked": false,
          "partsCount": 3
        }
      ]
    }
  ]
};

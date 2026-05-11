import { Story } from '../../../types';

export const metadata: Omit<Story, 'seasons'> & { seasons: any[] } = {
  "id": "5",
  "title": "Room 909",
  "slug": "room-909",
  "posterImage": "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop",
  "description": "Guests who enter Room 909 always check out. But never alive.",
  "genres": [
    "Horror",
    "Mystery"
  ],
  "rating": 4.5,
  "views": "600K",
  "status": "Ongoing",
  "seasons": [
    {
      "seasonNumber": 1,
      "title": "The Check-in",
      "description": "A stay you will never forget.",
      "episodes": [
        {
          "id": "e5-s1",
          "episodeNumber": 1,
          "title": "Welcome to Hell",
          "duration": "7 min",
          "isLocked": false,
          "partsCount": 3
        }
      ]
    }
  ]
};

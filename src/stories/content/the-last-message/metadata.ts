import { Story } from '../../../types';

export const metadata: Omit<Story, 'seasons'> & { seasons: any[] } = {
  "id": "3",
  "title": "The Last Message",
  "slug": "the-last-message",
  "posterImage": "https://images.unsplash.com/photo-1516339901600-2e1a62dc0c45?q=80&w=800&auto=format&fit=crop",
  "description": "Every night at 2:13 AM, she receives a message from someone who died years ago.",
  "genres": [
    "Mystery",
    "Thriller"
  ],
  "rating": 4.7,
  "views": "2.1M",
  "status": "Completed",
  "seasons": [
    {
      "seasonNumber": 1,
      "title": "The Echo",
      "description": "Where the past refuses to stay buried.",
      "episodes": [
        {
          "id": "e3-s1",
          "episodeNumber": 1,
          "title": "2:13 AM",
          "duration": "4 min",
          "isLocked": false,
          "partsCount": 3
        }
      ]
    }
  ]
};

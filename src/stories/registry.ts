import { Story } from '../types';

export type StoryRegistryItem = Omit<Story, 'seasons'> & { totalSeasons: number };

export const storyRegistry: StoryRegistryItem[] = [
  {
    id: '1',
    title: "The CEO’s Secret Wife",
    slug: 'ceos-secret-wife',
    posterImage: 'https://images.unsplash.com/photo-1516589174184-c685266e4af4?q=80&w=800&auto=format&fit=crop',
    description: "A contract marriage turns dangerous when hidden feelings become impossible to deny. Evelyn didn't expect to fall for the man she was paid to marry.",
    genres: ['Romance', 'Drama', 'Billionaire'],
    rating: 4.8,
    views: '1.2M',
    status: 'Ongoing',
    totalSeasons: 1
  },
  {
    id: '2',
    title: "Moonlit Curse",
    slug: 'moonlit-curse',
    posterImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop',
    description: "She was born without a wolf, but the alpha’s mark awakens something ancient within her soul.",
    genres: ['Werewolf', 'Fantasy', 'Romance'],
    rating: 4.9,
    views: '850K',
    status: 'Ongoing',
    totalSeasons: 1
  },
  {
    id: '3',
    title: "The Last Message",
    slug: 'the-last-message',
    posterImage: 'https://images.unsplash.com/photo-1516339901600-2e1a62dc0c45?q=80&w=800&auto=format&fit=crop',
    description: "Every night at 2:13 AM, she receives a message from someone who died years ago.",
    genres: ['Mystery', 'Thriller'],
    rating: 4.7,
    views: '2.1M',
    status: 'Completed',
    totalSeasons: 1
  },
  {
    id: '4',
    title: "Revenge in Red",
    slug: 'revenge-in-red',
    posterImage: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?q=80&w=800&auto=format&fit=crop',
    description: "Betrayed by everyone she loved, she returns with a new name and a colder heart.",
    genres: ['Revenge', 'Drama'],
    rating: 4.6,
    views: '1.5M',
    status: 'Ongoing',
    totalSeasons: 1
  },
  {
    id: '5',
    title: "Room 909",
    slug: 'room-909',
    posterImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop',
    description: "Guests who enter Room 909 always check out. But never alive.",
    genres: ['Horror', 'Mystery'],
    rating: 4.5,
    views: '600K',
    status: 'Ongoing',
    totalSeasons: 1
  },
  {
    id: '6',
    title: "Crown of Ashes",
    slug: 'crown-of-ashes',
    posterImage: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=800&auto=format&fit=crop',
    description: "A fallen princess must marry her enemy to reclaim a burning kingdom.",
    genres: ['Fantasy', 'Royal'],
    rating: 4.9,
    views: '2.5M',
    status: 'Ongoing',
    totalSeasons: 1
  },
  {
    id: '7',
    title: "My Fake Boyfriend",
    slug: 'my-fake-boyfriend',
    posterImage: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=800&auto=format&fit=crop',
    description: "One fake date becomes the biggest rumor in school. And maybe something more.",
    genres: ['Teen', 'Romance', 'Comedy'],
    rating: 4.4,
    views: '900K',
    status: 'Completed',
    totalSeasons: 1
  },
  {
    id: '8',
    title: "The Billionaire’s Regret",
    slug: 'the-billionaires-regret',
    posterImage: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop',
    description: "He left her with nothing. Five years later, she owns the company he needs.",
    genres: ['Romance', 'Drama', 'Billionaire'],
    rating: 4.8,
    views: '3.2M',
    status: 'Ongoing',
    totalSeasons: 1
  }
];

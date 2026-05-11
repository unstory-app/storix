import { Story } from '../types';

export const STORIES: Story[] = [
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
    seasons: [
      {
        seasonNumber: 1,
        title: 'The Contract',
        description: 'How it all started with a single signature.',
        episodes: [
          {
            id: 'e1-s1',
            episodeNumber: 1,
            title: 'The Proposition',
            duration: '5 min',
            isLocked: false,
            parts: [
              { id: 'p1', text: "She stared at the contract. One signature, and her life would no longer belong to her." },
              { id: 'p2', text: "Mr. Sterling didn't look like a savior. He looked like a predator who had finally cornered his prey." },
              { id: 'p3', text: "\"Sign it, Evelyn,\" he said, his voice like velvet over gravel. \"And your family's debt vanishes.\"" },
              { id: 'p4', text: "Her hand trembled as she gripped the pen. Was this freedom, or just a more gilded cage?" }
            ]
          },
          {
            id: 'e1-s2',
            episodeNumber: 2,
            title: 'The First Night',
            duration: '4 min',
            isLocked: false,
            parts: [
              { id: 'p1', text: "The penthouse was cold, despite the expensive heating. Or maybe it was just him." },
              { id: 'p2', text: "He smiled like a man who had already won. But she had no idea he was hiding the bigger secret." },
              { id: 'p3', text: "\"There's only one rule in this house,\" he whispered, leaning close enough for her to smell his cologne. \"Don't fall in love.\"" }
            ]
          }
        ]
      }
    ]
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
    seasons: [
      {
        seasonNumber: 1,
        title: 'The Awakening',
        description: 'The discovery of the ancient mark.',
        episodes: [
          {
            id: 'e2-s1',
            episodeNumber: 1,
            title: 'The Alpha\'s Mark',
            duration: '6 min',
            isLocked: false,
            parts: [
              { id: 'p1', text: "The moon hung low and heavy in the sky, like a silver eye watching her every move." },
              { id: 'p2', text: "She felt the burn on her shoulder before she saw it—a glowing crescent that shouldn't exist." },
              { id: 'p3', text: "In the distance, a howl ripped through the silence. He was coming for her." }
            ]
          }
        ]
      }
    ]
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
    seasons: [
      {
        seasonNumber: 1,
        title: 'The Echo',
        description: 'Where the past refuses to stay buried.',
        episodes: [
          {
            id: 'e3-s1',
            episodeNumber: 1,
            title: '2:13 AM',
            duration: '4 min',
            isLocked: false,
            parts: [
              { id: 'p1', text: "The phone buzzed again. This time, the message only had three words: Don’t trust him." },
              { id: 'p2', text: "She looked at the sender ID. It was the same number she had buried three years ago." },
              { id: 'p3', text: "A cold sweat broke out on her forehead. The dead don't text. Do they?" }
            ]
          }
        ]
      }
    ]
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
    seasons: [
      {
        seasonNumber: 1,
        title: 'The Return',
        description: 'The queen returns to her throne.',
        episodes: [
          {
            id: 'e4-s1',
            episodeNumber: 1,
            title: 'Ashes of the Past',
            duration: '5 min',
            isLocked: false,
            parts: [
              { id: 'p1', text: "She adjusted her red dress, the color of blood and warning." },
              { id: 'p2', text: "They thought they had destroyed her. They thought she was just a memory." },
              { id: 'p3', text: "But memories have a way of coming back to haunt you. And she was the worst kind of ghost." }
            ]
          }
        ]
      }
    ]
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
    seasons: [
      {
        seasonNumber: 1,
        title: 'The Check-in',
        description: 'A stay you will never forget.',
        episodes: [
          {
            id: 'e5-s1',
            episodeNumber: 1,
            title: 'Welcome to Hell',
            duration: '7 min',
            isLocked: false,
            parts: [
              { id: 'p1', text: "The keycard felt heavy in his hand. Room 909. The one everyone warned him about." },
              { id: 'p2', text: "The hallway was silent, except for the sound of his own breathing. Or was it someone else's?" },
              { id: 'p3', text: "When he opened the door, the smell of old perfume and rot hit him like a physical blow." }
            ]
          }
        ]
      }
    ]
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
    seasons: [
      {
        seasonNumber: 1,
        title: 'The Fallen Kingdom',
        description: 'Reclaiming what was lost.',
        episodes: [
          {
            id: 'e6-s1',
            episodeNumber: 1,
            title: 'The Enemy\'s Bed',
            duration: '6 min',
            isLocked: false,
            parts: [
              { id: 'p1', text: "The crown felt like lead on her head. It was no longer a symbol of power, but of her failure." },
              { id: 'p2', text: "He stood across the hall, the man who had burned her city to the ground. Now, he was her husband." },
              { id: 'p3', text: "\"I will not be your pawn,\" she whispered to the shadows. \"I will be your downfall.\"" }
            ]
          }
        ]
      }
    ]
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
    seasons: [
      {
        seasonNumber: 1,
        title: 'The Rumor Mill',
        description: 'High school drama at its best.',
        episodes: [
          {
            id: 'e7-s1',
            episodeNumber: 1,
            title: 'The Deal',
            duration: '4 min',
            isLocked: false,
            parts: [
              { id: 'p1', text: "She just needed a date for the dance. Any date. Even if it was the school's most notorious troublemaker." },
              { id: 'p2', text: "He leaned against the locker, a smirk playing on his lips. \"So, you want me to be your boyfriend? That's going to cost you.\"" },
              { id: 'p3', text: "She didn't realize the cost would be her heart." }
            ]
          }
        ]
      }
    ]
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
    seasons: [
      {
        seasonNumber: 1,
        title: 'The Reunion',
        description: 'Five years was a long time to plan a revenge.',
        episodes: [
          {
            id: 'e8-s1',
            episodeNumber: 1,
            title: 'Table Turned',
            duration: '5 min',
            isLocked: false,
            parts: [
              { id: 'p1', text: "He walked into the boardroom, expecting to meet the new CEO. He didn't expect to see her." },
              { id: 'p2', text: "She didn't look like the girl he had abandoned in the rain. She looked like a queen on her throne." },
              { id: 'p3', text: "\"Hello, Adrian,\" she said, her voice steady and cold. \"I believe you're here to ask for my help.\"" }
            ]
          }
        ]
      }
    ]
  }
];

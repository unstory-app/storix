import { Metadata } from 'next';
import { getAllStorySummaries } from '@/stories';
import LibraryClient from './LibraryClient';

export const metadata: Metadata = {
  title: 'Your Library | Wify.my',
  description: 'Continue reading saved stories, bookmarks, and completed episodes on Wify.my.',
};

export default function Library() {
  return <LibraryClient stories={getAllStorySummaries()} />;
}

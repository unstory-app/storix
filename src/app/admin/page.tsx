import { Metadata } from 'next';
import { getAllStorySummaries } from '@/stories';
import AdminDashboardClient from './AdminDashboardClient';

export const metadata: Metadata = {
  title: 'Admin Dashboard | Wify.my',
  description: 'Manage stories, episodes, and long-form Markdown content on Wify.my.',
};

export default function AdminDashboard() {
  return <AdminDashboardClient stories={getAllStorySummaries()} />;
}

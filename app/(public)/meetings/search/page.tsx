import type { Metadata } from 'next';
import { getMeetings, getMeetingsTotalPages } from '@/lib/meetings-db';
import { MeetingSearch } from '@/components/MeetingSearch';
import MeetingCard from '@/components/MeetingCard';
import { Pagination } from '@/components/Pagination';

export const metadata: Metadata = {
  title: 'Sacrament Meeting Tracker - Search Page',
  description: 'Search for Sacred Sacrament Meeting Records',
};

export default async function MeetingsPage(props: {
  searchParams?: Promise<{ query?: string; page?: string }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query ?? '';
  const currentPage = Number(searchParams?.page) || 1;

  const [meetings, totalPages] = await Promise.all([
    getMeetings(query, currentPage.toString()),
    getMeetingsTotalPages(query),
  ]);

  return (
    <div>
      <MeetingSearch />
      <div className="grid grid-cols-2">
        {meetings.map((m) => (
          <MeetingCard key={m.id} meeting={m} />
        ))}
      </div>

      <Pagination totalPages={totalPages} />
    </div>
  );
}

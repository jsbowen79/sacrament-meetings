import { getMeetings, getMeetingsTotalPages } from '@/lib/meetings-db';
import { MeetingSearch } from '@/components/MeetingSearch';
import MeetingCard from '@/components/MeetingCard';
import { Pagination } from '@/components/Pagination';
import { auth } from '@/lib/auth';
import { createPageMetadata } from '@/lib/metadata';

export const metadata = createPageMetadata(
  'Search Meetings',
  'Search sacrament meeting records by date, meeting type, or participant.',
);

export default async function MeetingsPage(props: {
  searchParams?: Promise<{ query?: string; page?: string }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query ?? '';
  const currentPage = Number(searchParams?.page) || 1;

  const [meetings, totalPages, session] = await Promise.all([
    getMeetings(query, currentPage),
    getMeetingsTotalPages(query),
    auth(),
  ]);

  return (
    <div>
      <MeetingSearch />
      <div className="grid grid-cols-2">
        {meetings.map((m) => (
          <MeetingCard
            key={m.id}
            meeting={m}
            isAuthenticated={Boolean(session)}
          />
        ))}
      </div>

      {totalPages > 1 && <Pagination totalPages={totalPages} />}
    </div>
  );
}

import { getMeetings, getMeetingsTotalPages } from '@/lib/meetings-db';
import { MeetingSearch } from '@/components/MeetingSearch';
import MeetingCard from '@/components/MeetingCard';
import { Pagination } from '@/components/Pagination';

export default async function MeetingsPage(props: {
  searchParams?: Promise<{ query?: string; page?: string }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query ?? '';
  const currentPage = Number(searchParams?.page) || 1;

  const [meetings, totalPages] = await Promise.all([
    getMeetings(query, currentPage),
    getMeetingsTotalPages(query),
  ]);

  return (
    <section className="w-full flex flex-wrap gap-4 justify-center">
      <div className="w-full, basis-full">
        <MeetingSearch />
      </div>
      <div className="basis-full flex flex-wrap gap-4 justify-center ">
        {meetings.map((m) => (
          <MeetingCard key={m.id} meeting={m} />
        ))}
      </div>
      {totalPages > 1 && (
        <div className="basis-full w-full">
          <Pagination totalPages={totalPages} />
        </div>
      )}
    </section>
  );
}

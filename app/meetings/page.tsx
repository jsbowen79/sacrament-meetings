import Image from 'next/image';
import MeetingCard from '@/components/MeetingCard';
import { SacramentMeeting } from '@/lib/types';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : process.env.BASE_URL;

  const response = await fetch(`${baseUrl}/api/meetings`);
  const meetings = await response.json();

  return (
    <div className="flex flex-col flex-1 items-center dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <figure className="w-full max-w-[500px] m-auto">
          <h3 className="text-[var(--church-blue-dark)] text-center text-3xl m-3 section-divider">
            Welcome to Sacrament Meeting Tracker
          </h3>
          <p className="text-[var(--church-blue)] mb-3">
            Click the links above to see the agenda for the current meeting, to
            find a meeting, or to manage a future meeting.{' '}
          </p>
          <Image
            className="block"
            src="/newport-beach-california-temple.jpg"
            alt="Newport Beach California Temple"
            width={1920}
            height={790}
            loading="eager"
          />
          <figcaption className="section-divider mb-2">
            Newport Beach California Temple by Aaron Nuffer
          </figcaption>
        </figure>
        <section className="w-full flex flex-wrap gap-4 justify-center">
          {meetings.map((meeting: SacramentMeeting) => (
            <div className="card max-w-60" key={meeting.id}>
              <MeetingCard meeting={meeting} />
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}

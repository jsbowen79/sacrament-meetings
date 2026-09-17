import type { Metadata } from 'next';
import MeetingDetail from '@/components/MeetingDetail';
import Image from 'next/image';
import { SacramentMeeting } from '@/lib/types';

export const metadata: Metadata = {
  title: 'Sacrament Meeting Tracker - Current Meeting',
  description: "Retrieve the Current or next meeting's information.",
};

export const dynamic = 'force-dynamic';

export default async function Current() {
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : process.env.BASE_URL;

  const response = await fetch(`${baseUrl}/api/meetings/current`);

  const meeting: SacramentMeeting | null = await response.json();

  // const text = await response.text();

  // const meeting = JSON.parse(text);

  if (meeting == null) {
    return (
      <div className="flex flex-col flex-1 items-center justify-center dark:bg-black">
        <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
          <h3 className="text-[var(--church-blue-dark)] text-center text-3xl m-3 section-divider w-full">
            Welcome to Sacrament Meeting Tracker
          </h3>
          <p className="text-[var(--church-blue)] mb-3 text-center w-full text-2xl">
            Current Meeting
          </p>
          <figure className="w-full max-w-[500px] m-auto">
            <Image
              src="/aba-nigeria-temple.jpg"
              alt="Newport Beach California Temple"
              width={1080}
              height={720}
            />
            <figcaption className="section-divider mb-2">
              Aba Nigeria Temple by Intellectual Reserve Inc.
            </figcaption>
          </figure>
          <h3>Sorry, the database contains no meetings in the next week.</h3>
        </main>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col flex-1 items-center justify-center dark:bg-black">
        <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
          <h3 className="text-[var(--church-blue-dark)] text-center text-3xl m-3 section-divider w-full">
            Welcome to Sacrament Meeting Tracker
          </h3>
          <p className="text-[var(--church-blue)] mb-3 text-center w-full text-2xl">
            Current Meeting
          </p>
          <figure className="w-full max-w-[500px] m-auto">
            <Image
              src="/aba-nigeria-temple.jpg"
              alt="Newport Beach California Temple"
              width={1080}
              height={720}
            />
            <figcaption className="section-divider mb-2">
              Aba Nigeria Temple by Intellectual Reserve Inc.
            </figcaption>
          </figure>
          <section className="w-full flex flex-wrap gap-4 justify-center">
            <MeetingDetail meeting={meeting} />
          </section>
        </main>
      </div>
    );
  }
}

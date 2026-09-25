import MeetingDetail from '@/components/MeetingDetail';
import Image from 'next/image';
import { getMeetingById } from '@/lib/meetings-db';

export default async function MeetingById({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const meeting = await getMeetingById(Number(id));

  return (
    <div className="flex flex-col flex-1 items-center justify-center dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <h3 className="text-[var(--church-blue-dark)] text-center text-3xl m-3 section-divider w-full">
          Welcome to Sacrament Meeting Tracker
        </h3>

        <p className="text-[var(--church-blue)] mb-3 text-center w-full text-2xl">
          Meeting Details
        </p>

        <figure className="w-full max-w-[500px] m-auto">
          <Image
            src="/aba-nigeria-temple.jpg"
            alt="Aba Nigeria Temple"
            width={1080}
            height={720}
          />
          <figcaption className="section-divider mb-2">
            Aba Nigeria Temple by Intellectual Reserve Inc.
          </figcaption>
        </figure>

        <section className="w-full flex flex-wrap gap-4 justify-center">
          {meeting ? (
            <MeetingDetail meeting={meeting} />
          ) : (
            <p>No meeting found.</p>
          )}
        </section>
      </main>
    </div>
  );
}

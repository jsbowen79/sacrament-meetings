import MeetingSearch from '@/components/MeetingSearch';
import Image from 'next/image';

export const dynamic = 'force-dynamic';

export default async function Current() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <h3 className="text-[var(--church-blue-dark)] text-center text-3xl m-3 section-divider w-full">
          Welcome to Sacrament Meeting Tracker
        </h3>
        <p className="text-[var(--church-blue)] mb-3 text-center w-full text-2xl">
          Load Meeting By ID
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
          <MeetingSearch />
        </section>
      </main>
    </div>
  );
}

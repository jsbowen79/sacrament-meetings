import { MeetingSearch } from '@/components/MeetingSearch';
import Image from 'next/image';

export default function HomePage() {
  return (
    <section className="flex w-full flex-wrap justify-center gap-4">
      <div className="basis-full w-full">
        <MeetingSearch />
      </div>
      <figure className="w-full max-w-[500px]">
        <Image
          src="/aba-nigeria-temple.jpg"
          alt="Aba Nigeria Temple"
          width={1080}
          height={720}
        />
        <figcaption className="mb-2 text-center">
          Aba Nigeria Temple by Intellectual Reserve Inc.
        </figcaption>
      </figure>
      <div className="mb-8 flex basis-full flex-wrap justify-center gap-4">
        <article className="w-full max-w-sm rounded-xl border border-[rgba(0,81,117,0.2)] bg-[#f3fbff] p-5 shadow-sm">
          <h1 className="text-xl font-bold text-[var(--church-blue-dark)]">
            Welcome to Sacrament Meeting Tracker
          </h1>
          <p className="mt-3 text-base">
            Use this application to view, create, and update meeting agendas for
            your local Ward.
          </p>
        </article>
      </div>
    </section>
  );
}

import { SacramentMeeting } from '@/lib/types';
import Link from 'next/link';
import { deleteMeeting } from '@/lib/actions';

interface MeetingCardProps {
  meeting: SacramentMeeting;
}

export default function MeetingCard({ meeting }: MeetingCardProps) {
  const url = `/meetings/${meeting.id}`;

  return (
    <article className="w-full max-w-sm rounded-xl border border-[rgba(0,81,117,0.2)] bg-[#f3fbff] p-5 shadow-sm">
      <div className="space-y-3">
        <h3 className="text-xl font-bold text-[var(--church-blue-dark)]">
          Meeting Date
        </h3>
        <p className="text-base font-medium">{meeting.date}</p>
        <p className="text-base">
          <span className="font-semibold">Meeting Type:</span>{' '}
          {meeting.meetingType}
        </p>

        <Link
          href={url}
          className="inline-block pt-2 text-[var(--church-blue-dark)] hover:underline"
        >
          See Meeting Details
        </Link>

        <Link
          href={`/meetings/${meeting.id}/edit`}
          className="mt-3 block w-full rounded-[0.625rem] border border-[var(--church-blue-dark)] bg-[var(--church-blue-light)] px-4 py-3 text-center font-semibold text-[var(--church-blue-dark)] hover:bg-[var(--church-blue-dark)] hover:!text-white hover:no-underline hover:opacity-100"
        >
          Edit Meeting
        </Link>

        <form action={deleteMeeting.bind(null, meeting.id)}>
          <button
            type="submit"
            className="mt-3 w-full rounded-[0.625rem] border border-[#991b1b] bg-[#991b1b] px-4 py-3 font-semibold text-white hover:bg-[#fecaca] hover:!text-[#7f1d1d] hover:opacity-100"
          >
            Delete Meeting
          </button>
        </form>
      </div>
    </article>
  );
}

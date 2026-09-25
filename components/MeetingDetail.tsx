import { SacramentMeeting } from '@/lib/types';
import { deleteMeeting } from '@/lib/actions';
import Link from 'next/link';

interface MeetingDetailProps {
  meeting: SacramentMeeting;
}

export default function MeetingDetail({ meeting }: MeetingDetailProps) {
  return (
    <div className="w-full rounded-xl border border-slate-300 bg-[var(--church-blue-light)] p-4 md:p-6">
      <div className="space-y-4">
        <h3 className="text-3xl text-center text-[var(--church-blue-dark)]">
          Picadilly Ward Sacrament Meeting Agenda
        </h3>

        <h4 className="text-center text-lg font-semibold text-[var(--church-blue-dark)]">
          Meeting Id: {meeting.id} | Meeting Date: {meeting.date}
        </h4>

        <div className="space-y-2 text-base text-slate-900">
          <p>
            <span className="font-semibold">Meeting Type:</span>{' '}
            {meeting.meetingType}
          </p>
          <p>
            <span className="font-semibold">Presiding:</span>{' '}
            {meeting.presiding}
          </p>
          <p>
            <span className="font-semibold">Conducting:</span>{' '}
            {meeting.conducting}
          </p>
        </div>

        <div className="space-y-2">
          <h4 className="text-center text-xl font-bold text-[var(--church-blue-dark)]">
            Ward Business
          </h4>
          {meeting.wardBusiness?.map((item, index) => (
            <p key={index} className="text-center text-slate-900">
              {item.description}
            </p>
          ))}
        </div>

        <p className="text-base text-slate-900">
          <span className="font-semibold">Stake Business:</span>{' '}
          {meeting.stakeBusiness ? 'Yes' : 'No'}
        </p>

        <p className="text-base text-slate-900">
          <span className="font-semibold">Sacrament Hymn:</span>{' '}
          {meeting.sacramentHymn.number}: {meeting.sacramentHymn.title}
        </p>

        <p className="text-base text-slate-900">
          <span className="font-semibold">Opening Hymn:</span>{' '}
          {meeting.openingHymn.number}. {meeting.openingHymn.title}
        </p>

        <p className="text-base text-slate-900">
          <span className="font-semibold">Opening Prayer:</span>{' '}
          {meeting.openingPrayer}
        </p>

        <div className="space-y-2">
          {meeting.speakers.map((speaker) => (
            <p key={speaker.id} className="text-base text-slate-900">
              <span className="font-semibold">{speaker.type}:</span>{' '}
              {speaker.name} - {speaker.topic}
            </p>
          ))}
        </div>

        <p className="text-base text-slate-900">
          <span className="font-semibold">Closing Hymn:</span>{' '}
          {meeting.closingHymn.number}. {meeting.closingHymn.title}
        </p>

        <p className="text-base text-slate-900">
          <span className="font-semibold">Closing Prayer:</span>{' '}
          {meeting.closingPrayer}
        </p>

        <div className="space-y-2">
          <p className="text-center text-lg font-bold text-[var(--church-blue-dark)]">
            Announcements
          </p>
          {meeting.announcements?.map((announcement, index) => (
            <p key={index} className="text-base text-slate-900">
              {announcement}
            </p>
          ))}
        </div>

        <Link
          href={`/meetings/${meeting.id}/edit`}
          className="mt-2 block w-full rounded-[0.625rem] border border-[var(--church-blue-dark)] bg-[var(--church-blue-light)] px-4 py-3 text-center font-semibold text-[var(--church-blue-dark)] hover:bg-[var(--church-blue-dark)] hover:!text-white hover:no-underline hover:opacity-100"
        >
          Edit Meeting
        </Link>

        <form action={deleteMeeting.bind(null, meeting.id)}>
          <button
            type="submit"
            className="mt-2 w-full rounded-[0.625rem] border border-[#991b1b] bg-[#991b1b] px-4 py-3 font-semibold text-white hover:bg-[#fecaca] hover:!font-bold hover:!text-black hover:opacity-100"
          >
            Delete Meeting
          </button>
        </form>
      </div>
    </div>
  );
}

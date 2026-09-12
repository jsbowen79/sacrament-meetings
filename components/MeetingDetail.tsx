import { SacramentMeeting } from '@/lib/types';

interface MeetingDetailProps {
  meeting: SacramentMeeting;
}

export default function MeetingDetail({ meeting }: MeetingDetailProps) {
  return (
    <div className="w-full bg-[var(--church-blue-light)] p-2">
      <h3 className="text-3xl mx-auto center p-2">
        Picadilly Ward Sacrament Meeting Agenda
      </h3>
      <h4 className="text-size-xl w-full text-center">
        Meeting Id: {meeting.id}| Meeting Date: {meeting.date}
      </h4>
      <p>Meeting Type: {meeting.meetingType}</p>
      <p>Presiding: {meeting.presiding}</p>
      <p>Conducting: {meeting.conducting}</p>
      <h4 className="my-2 text-center">
        Opening Hymn: {meeting.openingHymn.number}. {meeting.openingHymn.title}
      </h4>
      <p>Opening Prayer {meeting.openingPrayer}</p>
      {meeting.speakers.map((speaker) => {
        return (
          <p key={speaker.id}>
            {speaker.type}: {speaker.name} - {speaker.topic}{' '}
          </p>
        );
      })}

      <h4 className="my-2 text-center">
        Closing Hymn: {meeting.closingHymn.number}. {meeting.closingHymn.title}
      </h4>
      <p>Closing Prayer: {meeting.closingPrayer}</p>
      <p className="my-2 text-center font-bold">Announcements: </p>
      {meeting.announcements?.map((announcement, index) => {
        return <p key={index}>{announcement}</p>;
      })}
    </div>
  );
}

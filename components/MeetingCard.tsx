import { SacramentMeeting } from '@/lib/types';
import Link from 'next/link';

interface MeetingCardProps {
  meeting: SacramentMeeting;
}

export default function MeetingCard({ meeting }: MeetingCardProps) {
  const url = `/meetings/${meeting.id}`;
  return (
    <div className="card">
      <h3>Meeting Date: {meeting.date}</h3>
      <h3>Meeting Type: {meeting.meetingType}</h3>
      <Link href={url} className="h-13">
        See Meeting Details
      </Link>
    </div>
  );
}

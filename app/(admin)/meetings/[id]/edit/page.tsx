import { getMeetingById } from '@/lib/meetings-db';
import MeetingForm from '@/components/MeetingForm';
import { notFound } from 'next/navigation';

export default async function EditMeetingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const idAsNumber = parseInt(id);

  if (isNaN(idAsNumber)) {
    return <div>Invalid meeting ID</div>;
  }

  const meeting = await getMeetingById(idAsNumber);

  if (!meeting) {
    notFound();
  }
  return <MeetingForm initialMeeting={meeting} />;
}

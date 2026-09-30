import { getMeetingById } from '@/lib/meetings-db';
import MeetingForm from '@/components/MeetingForm';
import { createPageMetadata } from '@/lib/metadata';
import { notFound } from 'next/navigation';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return createPageMetadata(
    `Edit Meeting ${id}`,
    'Update the details and agenda for this sacrament meeting.',
    true,
  );
}

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

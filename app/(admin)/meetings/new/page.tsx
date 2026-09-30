import CreateNewMeeting from '@/components/CreateNewMeeting';
import { createPageMetadata } from '@/lib/metadata';

export const metadata = createPageMetadata(
  'Add a Meeting',
  'Create a sacrament meeting agenda for your ward.',
  true,
);
export const dynamic = 'force-dynamic';

export default function NewMeetingPage() {
  return (
    <section>
      <div className="max-w-[700px] w-full border m-5 text-center bg-white mx-auto">
        <h3 className="text-4xl mx-auto w-full my-4">Enter New Meeting</h3>
        <CreateNewMeeting />
      </div>
    </section>
  );
}

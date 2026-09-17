import CreateNewMeeting from '@/components/CreateNewMeeting';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sacrament Meeting Tracker - Add a Meeting',
  description: 'Add a Meeting to the Database',
};
export const dynamic = 'force-dynamic';

export default function NewMeetingPage() {
  return (
    <main>
      <div className="max-w-[700px] w-full border m-5 text-center bg-white mx-auto">
        <h3 className="text-4xl mx-auto w-full my-4">Enter New Meeting</h3>
        <CreateNewMeeting />
      </div>
    </main>
  );
}

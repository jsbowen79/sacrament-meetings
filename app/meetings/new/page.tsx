import NewMeeting from '@/components/NewMeeting';

export default function NewMeetingPage() {
  return (
    <main>
      <div className="max-w-[700px] w-full border m-5 text-center bg-white mx-auto">
        <h3 className="text-4xl mx-auto w-full my-4">Enter New Meeting</h3>
        <NewMeeting />
      </div>
    </main>
  );
}

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sacrament Meeting Tracker - Meeting added',
  description: 'Confirmation that a meeting was added to the database',
};

export default function MeetingAdded() {
  return (
    <main className="flex flex-col items-center justify-center">
      <h1 className="text-3xl">Meeting Added</h1>
      <p className="mt-4">The sacrament meeting has been successfully added.</p>
    </main>
  );
}

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sacrament Meeting Tracker - Failure to add',
  description: 'The meeting was not added to the Database',
};

export default function MeetingAdded() {
  return (
    <main className="flex flex-col items-center justify-center">
      <h1 className="text-3xl">Error</h1>
      <p className="mt-4">
        There was a problem. The sacrament meeting has not been added. Please
        try again.
      </p>
    </main>
  );
}

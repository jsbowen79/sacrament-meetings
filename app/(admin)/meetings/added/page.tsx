import { createPageMetadata } from '@/lib/metadata';

export const metadata = createPageMetadata(
  'Meeting Added',
  'Confirmation that the sacrament meeting was added successfully.',
  true,
);

export default function MeetingAdded() {
  return (
    <main className="flex flex-col items-center justify-center">
      <h1 className="text-3xl">Meeting Added</h1>
      <p className="mt-4">The sacrament meeting has been successfully added.</p>
    </main>
  );
}

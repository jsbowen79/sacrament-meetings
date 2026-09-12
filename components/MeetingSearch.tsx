'use client';

import { useState } from 'react';
import MeetingDetail from './MeetingDetail';
import { SacramentMeeting } from '@/lib/types';

export default function MeetingSearch() {
  const [id, setId] = useState('');
  const [meeting, setMeeting] = useState<SacramentMeeting | null>(null);
  const [error, setError] = useState('');

  async function searchMeeting() {
    setError('');
    setMeeting(null);

    const response = await fetch(`/api/meetings/${id}`);

    if (!response.ok) {
      setError('Meeting not found.');
      return;
    }

    const meeting = await response.json();
    setMeeting(meeting);
  }
  return (
    <section>
      <label htmlFor="meeting-id"> Enter Meeting ID</label>

      <input
        id="meeting-id"
        type="number"
        value={id}
        onChange={(event) => setId(event.target.value)}
        className="border-2 border-black p-2 m-2"
      />

      <button
        onClick={searchMeeting}
        className="bg-[var(--church-blue-dark)] text-white border rounded-lg p-2"
      >
        Search
      </button>
      {error && <p>{error}</p>}

      {meeting && <MeetingDetail meeting={meeting} />}
    </section>
  );
}

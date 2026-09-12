import { NextResponse } from 'next/server';
import { meetings } from '@/lib/meetings-db';

export async function GET() {
  const currentDate = new Date();

  const today = currentDate.toISOString().split('T')[0];

  const endingDate = new Date(currentDate);
  endingDate.setDate(currentDate.getDate() + 6);
  const endDate = endingDate.toISOString().split('T')[0];

  const currentMeeting = meetings.find((meeting) => {
    return meeting.date >= today && meeting.date <= endDate;
  });

  if (!currentMeeting) {
    return NextResponse.json(null);
  }

  return NextResponse.json(currentMeeting);
}

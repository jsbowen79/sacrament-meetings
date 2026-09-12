import { NextResponse } from 'next/server';
import { meetings } from '@/lib/meetings-db';
import { SacramentMeeting } from '@/lib/types';

export async function GET() {
  return NextResponse.json(meetings);
}

export async function POST(request: Request) {
  const data = await request.json();

  const newMeeting: SacramentMeeting = {
    id: meetings.length + 1,
    ...data,
  };

  meetings.push(newMeeting);

  return NextResponse.json(newMeeting, { status: 201 });
}

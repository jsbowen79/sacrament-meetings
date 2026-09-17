import { NextResponse } from 'next/server';
import { getMeetings, insertMeeting } from '@/lib/meetings-db';
import { SacramentMeeting, NewMeeting } from '@/lib/types';

export async function GET() {
  const meetings = await getMeetings();

  return NextResponse.json(meetings);
}

export async function POST(request: Request) {
  const newMeeting: NewMeeting = await request.json();

  const response: SacramentMeeting = await insertMeeting(newMeeting);

  return NextResponse.json(response, { status: 201 });
}

import { NextResponse } from 'next/server';
import { getMeetings, insertMeeting } from '@/lib/meetings-db';
import { SacramentMeeting, NewMeeting } from '@/lib/types';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query') ?? '';
  const currentPage = Number(searchParams.get('page') ?? '1');

  const meetings = await getMeetings(query, currentPage);

  return NextResponse.json(meetings);
}

export async function POST(request: Request) {
  const newMeeting: NewMeeting = await request.json();

  const response: SacramentMeeting = await insertMeeting(newMeeting);

  return NextResponse.json(response, { status: 201 });
}

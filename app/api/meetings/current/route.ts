import { NextResponse } from 'next/server';
import { getCurrentMeeting } from '@/lib/meetings-db';
import { SacramentMeeting } from '@/lib/types';

export async function GET() {
  const currentMeeting: SacramentMeeting | null = await getCurrentMeeting();

  if (!currentMeeting) {
    return NextResponse.json(null);
  }

  return NextResponse.json(currentMeeting);
}

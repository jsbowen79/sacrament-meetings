// import { NextResponse } from 'next/server';

// import { meetings } from '@/lib/meetings-db';
// import { SacramentMeeting } from '@/lib/types';

// export async function GET(
//   request: Request,
//   { params }: { params: Promise<{ id: string }> },
// ) {
//   const { id } = await params;
//   const meetingId = Number(id);

//   const requestedMeeting: SacramentMeeting | undefined = meetings.find(
//     (meeting) => meeting.id === meetingId,
//   );

//   if (!requestedMeeting) {
//     return NextResponse.json({ error: 'Meeting not found' }, { status: 404 });
//   }

//   return NextResponse.json(requestedMeeting);
// }
import { NextResponse } from 'next/server';

import { getMeetingById } from '@/lib/meetings-db';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const meetingId = Number(id);

  if (Number.isNaN(meetingId)) {
    return NextResponse.json({ error: 'Invalid meeting ID' }, { status: 400 });
  }

  const meeting = getMeetingById(meetingId);

  if (!meeting) {
    return NextResponse.json({ error: 'Meeting not found' }, { status: 404 });
  }

  return NextResponse.json(meeting, { status: 200 });
}

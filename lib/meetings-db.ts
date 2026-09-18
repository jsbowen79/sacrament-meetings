import type { SacramentMeeting, NewMeeting } from './types';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);
const ITEMS_PER_PAGE = 5;

export async function getMeetingById(
  id: number,
): Promise<SacramentMeeting | undefined> {
  const meetings = await sql`
    SELECT
      id,
      date::text AS date,
      meeting_type AS "meetingType",
      presiding,
      conducting,
      announcements,
      opening_hymn AS "openingHymn",
      opening_prayer AS "openingPrayer",
      ward_business AS "wardBusiness",
      stake_business AS "stakeBusiness",
      sacrament_hymn AS "sacramentHymn",
      speakers,
      closing_hymn AS "closingHymn",
      closing_prayer AS "closingPrayer"
    FROM meetings
    WHERE id = ${id}
  `;
  console.log('Meeting: ', meetings[0]);
  return meetings[0] as SacramentMeeting | undefined;
}

export async function getMeetings(
  date: string = '',
  query: string = '',
  currentPage: number = 1,
): Promise<SacramentMeeting[]> {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  const meetings = await sql`
  SELECT
    id,
    date:: text AS date,
    meeting_type AS "meetingType",
    presiding,
    conducting,
    announcements,
    opening_hymn AS "openingHymn",
    opening_prayer AS "openingPrayer",
    ward_business AS "wardBusiness",
    stake_business AS "stakeBusiness",
    sacrament_hymn AS "sacramentHymn",
    speakers,
    closing_hymn AS "closingHymn",
    closing_prayer AS "closingPrayer"
  FROM meetings
  WHERE
  (${date} = '' OR date::text = ${date})
  AND
  (${query} = '' OR (
    presiding ILIKE ${`%${query}%`}
    OR conducting ILIKE ${`%${query}%`}
    OR meeting_type ILIKE ${`%${query}%`}
    OR speakers::text ILIKE ${`%${query}%`}
  ))
  ORDER BY date DESC
  LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
`;
  return meetings as SacramentMeeting[];
}

export async function getMeetingsTotalPages(
  query: string = '',
): Promise<number> {
  const searchTerm = `%${query}%`;
  const rows = await sql`
  SELECT COUNT (*) FROM meetings 
  WHERE 
  presiding  ILIKE ${searchTerm}
  OR conducting ILIKE ${searchTerm}
  OR meeting_Type ILIKE ${searchTerm}
  OR speakers::text ILIKE ${searchTerm}`;
  return Math.ceil(Number(rows[0].count) / ITEMS_PER_PAGE);
}

export async function insertMeeting(
  meeting: NewMeeting,
): Promise<SacramentMeeting> {
  const result = await sql`
  INSERT INTO meetings
  (date, 
  meeting_type, 
  presiding, 
  conducting, 
  announcements, 
  opening_hymn, 
  opening_prayer, 
  ward_business, 
  stake_business, 
  sacrament_hymn, 
  speakers,
  closing_hymn,
  closing_prayer)
  VALUES 
  (${meeting.date}, 
  ${meeting.meetingType}, 
  ${meeting.presiding}, 
  ${meeting.conducting}, 
  ${meeting.announcements}, 
  ${JSON.stringify(meeting.openingHymn)},
  ${meeting.openingPrayer}, 
  ${JSON.stringify(meeting.wardBusiness)},
  ${meeting.stakeBusiness}, 
  ${JSON.stringify(meeting.sacramentHymn)}, 
  ${JSON.stringify(meeting.speakers)}, 
  ${JSON.stringify(meeting.closingHymn)}, 
  ${meeting.closingPrayer})
  RETURNING
  id,
  date::text AS date,
  meeting_type AS "meetingType",
  presiding,
  conducting,
  announcements,
  opening_hymn AS "openingHymn",
  opening_prayer AS "openingPrayer",
  ward_business AS "wardBusiness",
  stake_business AS "stakeBusiness",
  sacrament_hymn AS "sacramentHymn",
  speakers,
  closing_hymn AS "closingHymn",
  closing_prayer AS "closingPrayer"`;

  return result[0] as SacramentMeeting;
}

export async function updateMeeting(
  id: number,
  updates: Partial<SacramentMeeting>,
): Promise<SacramentMeeting | null> {
  throw new Error('updateMeeting: database implementation coming in Week 04');
}

export async function deleteMeeting(id: number): Promise<boolean> {
  throw new Error('deleteMeeting: database implementation coming in week 4');
}

export async function getCurrentMeeting(): Promise<SacramentMeeting | null> {
  const currentDate = new Date();

  const today = currentDate.toISOString().split('T')[0];

  const endingDate = new Date(currentDate.setDate(currentDate.getDate() + 6));

  const endDate = endingDate.toISOString().split('T')[0];
  const meeting = await sql`
  SELECT * FROM meetings 
  WHERE date BETWEEN ${today} AND ${endDate}
  ORDER BY date`;
  return meeting[0] as SacramentMeeting | null;
}

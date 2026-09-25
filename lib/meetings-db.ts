import type { SacramentMeeting, NewMeeting } from './types';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);
const ITEMS_PER_PAGE = 5;

export async function getMeetingById(
  id: number,
): Promise<SacramentMeeting | undefined> {
  try {
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
    return meetings[0] as SacramentMeeting | undefined;
  } catch (error) {
    console.error('Failed to fetch meeting by Id', error);
    throw new Error('We had a problem with the database.  Try again later.');
  }
}

export async function getMeetings(
  query: string = '',
  currentPage: number = 1,
): Promise<SacramentMeeting[]> {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
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
  
  (${query} = '' OR (
    presiding ILIKE ${`%${query}%`}
    OR conducting ILIKE ${`%${query}%`}
    OR meeting_type ILIKE ${`%${query}%`}
    OR speakers::text ILIKE ${`%${query}%`}
    OR date::text ILIKE ${`%${query}%`}
  ))
  ORDER BY date DESC
  LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
`;

    return meetings as SacramentMeeting[];
  } catch (error) {
    console.error('Error fetching meetings:', error);
    throw new Error('Failed to fetch meetings. Please try again later.');
  }
}

export async function getMeetingsTotalPages(
  query: string = '',
): Promise<number> {
  const searchTerm = `%${query}%`;
  try {
    const rows = await sql`
  SELECT COUNT (*) FROM meetings 
  WHERE 
  presiding  ILIKE ${searchTerm}
  OR conducting ILIKE ${searchTerm}
  OR meeting_type ILIKE ${searchTerm}
  OR speakers::text ILIKE ${searchTerm}`;
    return Math.ceil(Number(rows[0].count) / ITEMS_PER_PAGE);
  } catch (error) {
    console.error('Failed to get count', error);
    throw new Error('Failed to get count from Database.  Try again Later.');
  }
}

export async function insertMeeting(
  meeting: NewMeeting,
): Promise<SacramentMeeting> {
  try {
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
  } catch (error) {
    console.error('Error inserting meeting:', error);
    throw new Error('Failed to insert meeting. Please try again later.');
  }
}

export async function getCurrentMeeting(): Promise<SacramentMeeting | null> {
  const currentDate = new Date();

  const today = currentDate.toISOString().split('T')[0];

  const endingDate = new Date(currentDate.setDate(currentDate.getDate() + 6));

  const endDate = endingDate.toISOString().split('T')[0];
  try {
    const responseArray = await sql`
  SELECT * FROM meetings 
  WHERE date BETWEEN ${today} AND ${endDate}
  ORDER BY date`;

    const responseItem = responseArray[0];
    if (responseItem) {
      const meeting: SacramentMeeting = {
        id: responseItem.id,
        date: responseItem.date.toString(),
        meetingType: responseItem.meeting_type,
        presiding: responseItem.presiding,
        conducting: responseItem.conducting,
        announcements: responseItem.announcements,
        openingHymn: responseItem.opening_hymn,
        openingPrayer: responseItem.opening_prayer,
        wardBusiness: responseItem.ward_business,
        stakeBusiness: responseItem.stake_business,
        sacramentHymn: responseItem.sacrament_hymn,
        speakers: responseItem.speakers,
        closingHymn: responseItem.closing_hymn,
        closingPrayer: responseItem.closing_prayer,
      };
      return meeting as SacramentMeeting;
    }
    return null;
  } catch (error) {
    console.error('Error fetching current meeting', error);
    throw new Error(
      'Failed to fetch current meeting.  Please try again later.',
    );
  }
}

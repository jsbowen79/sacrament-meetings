'use server';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { redirect } from 'next/navigation';

export type State = {
  errors?: {
    date?: string[];
    meetingType?: string[];
    presiding?: string[];
    conducting?: string[];
    announcements?: string[];
    openingHymn?: string[];
    openingPrayer?: string[];
    wardBusiness?: string[];
    stakeBusiness?: string[];
    sacramentHymn?: string[];
    speakers?: string[];
    closingHymn?: string[];
    closingPrayer?: string[];
  };
  message?: string | null;
};

const SacramentMeetingSchema = z.object({
  date: z.string(),
  meetingType: z.enum(['testimony', 'regular', 'stake', 'general']),
  presiding: z.string(),
  conducting: z.string(),
  announcements: z.array(z.string()).optional(),
  openingHymn: z.object({
    number: z.number(),
    title: z.string(),
  }),
  openingPrayer: z.string(),
  wardBusiness: z.array(
    z.object({
      description: z.string(),
    }),
  ),
  stakeBusiness: z.boolean(),
  sacramentHymn: z.object({
    number: z.number(),
    title: z.string(),
  }),
  speakers: z
    .array(
      z.object({
        id: z.number(),
        name: z.string(),
        topic: z.string(),
        type: z.enum(['speaker', 'musical-number']),
      }),
      'You must provide a valid speaker or musical number.',
    )
    .min(1, 'You must provide at least one speaker or musical number.'),
  closingHymn: z.object({
    number: z.number(),
    title: z.string(),
  }),
  closingPrayer: z.string(),
});

////CREATE MEETING

export async function createMeeting(
  prevState: State,
  formData: FormData,
): Promise<State> {
  let rawAnnouncements;
  let rawOpeningHymn;
  let rawWardBusiness;
  let rawSacramentHymn;
  let rawSpeakers;
  let rawClosingHymn;

  try {
    rawAnnouncements = JSON.parse(formData.get('announcements') as string);

    rawOpeningHymn = formData.get('openingHymn')
      ? JSON.parse(formData.get('openingHymn') as string)
      : undefined;
    rawWardBusiness = formData.get('wardBusiness')
      ? JSON.parse(formData.get('wardBusiness') as string)
      : [];
    rawSacramentHymn = formData.get('sacramentHymn')
      ? JSON.parse(formData.get('sacramentHymn') as string)
      : undefined;
    rawSpeakers = formData.get('speakers')
      ? JSON.parse(formData.get('speakers') as string)
      : undefined;
    rawClosingHymn = formData.get('closingHymn')
      ? JSON.parse(formData.get('closingHymn') as string)
      : undefined;
  } catch {
    return {
      ...prevState,
      message: 'Unable to process the submitted data. Please try again.',
    };
  }

  const raw = {
    date: formData.get('date'),
    meetingType: formData.get('meetingType'),
    presiding: formData.get('presiding'),
    conducting: formData.get('conducting'),
    announcements: rawAnnouncements,
    openingHymn: rawOpeningHymn,
    openingPrayer: formData.get('openingPrayer'),
    wardBusiness: rawWardBusiness,
    stakeBusiness: formData.get('stakeBusiness') === 'on',
    sacramentHymn: rawSacramentHymn,
    speakers: rawSpeakers,
    closingHymn: rawClosingHymn,
    closingPrayer: formData.get('closingPrayer'),
  };

  const parsed = SacramentMeetingSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      errors: parsed.error.flatten().fieldErrors,
      message: 'Missing or invalid Fields.  Failed to create meeting.',
    };
  }
  const {
    date,
    meetingType,
    presiding,
    conducting,
    announcements,
    openingHymn,
    openingPrayer,
    wardBusiness,
    stakeBusiness,
    sacramentHymn,
    speakers,
    closingHymn,
    closingPrayer,
  } = parsed.data;

  const announcementsValue = announcements
    ? `{${announcements.map((item) => `"${item.replace(/"/g, '\\"')}"`).join(',')}}`
    : '{}';
  try {
    await sql`INSERT INTO meetings (date, meeting_type, presiding, conducting, announcements, opening_hymn, opening_prayer, 
    ward_business, stake_business, sacrament_hymn, speakers, closing_hymn, closing_prayer)
    VALUES (${date}, ${meetingType}, ${presiding}, ${conducting}, ${announcementsValue}, ${JSON.stringify(openingHymn)}, ${openingPrayer}, 
    ${JSON.stringify(wardBusiness)}, ${stakeBusiness}, ${JSON.stringify(sacramentHymn)}, ${JSON.stringify(speakers)}, ${JSON.stringify(closingHymn)}, 
    ${closingPrayer})`;
  } catch (error) {
    console.error('Error creating meeting:', error);
    throw new Error('Failed to create meeting. Please try again later.');
  }
  revalidatePath('/meetings');
  redirect('/meetings');
}

////////////UpdateMeeting

export async function updateMeeting(
  prevState: State,
  formData: FormData,
): Promise<State> {
  const id = Number(formData.get('id'));

  if (!Number.isInteger(id) || id <= 0) {
    return {
      message: 'Missing or invalid meeting ID. Failed to update meeting.',
    };
  }
  const rawAnnouncements = JSON.parse(formData.get('announcements') as string);

  const rawOpeningHymn = formData.get('openingHymn')
    ? JSON.parse(formData.get('openingHymn') as string)
    : undefined;
  const rawWardBusiness = formData.get('wardBusiness')
    ? JSON.parse(formData.get('wardBusiness') as string)
    : [];

  const rawSacramentHymn = formData.get('sacramentHymn')
    ? JSON.parse(formData.get('sacramentHymn') as string)
    : undefined;
  const rawSpeakers = formData.get('speakers')
    ? JSON.parse(formData.get('speakers') as string)
    : undefined;
  const rawClosingHymn = formData.get('closingHymn')
    ? JSON.parse(formData.get('closingHymn') as string)
    : undefined;

  const raw = {
    date: formData.get('date'),
    meetingType: formData.get('meetingType'),
    presiding: formData.get('presiding'),
    conducting: formData.get('conducting'),
    announcements: rawAnnouncements,
    openingHymn: rawOpeningHymn,
    openingPrayer: formData.get('openingPrayer'),
    wardBusiness: rawWardBusiness,
    stakeBusiness: formData.get('stakeBusiness') === 'on',
    sacramentHymn: rawSacramentHymn,
    speakers: rawSpeakers,
    closingHymn: rawClosingHymn,
    closingPrayer: formData.get('closingPrayer'),
  };

  const parsed = SacramentMeetingSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      errors: parsed.error.flatten().fieldErrors,
      message: 'Missing or invalid Fields.  Failed to update meeting.',
    };
  }
  const {
    date,
    meetingType,
    presiding,
    conducting,
    announcements,
    openingHymn,
    openingPrayer,
    wardBusiness,
    stakeBusiness,
    sacramentHymn,
    speakers,
    closingHymn,
    closingPrayer,
  } = parsed.data;

  const announcementsValue = announcements
    ? `{${announcements.map((item) => `"${item.replace(/"/g, '\\"')}"`).join(',')}}`
    : '{}';

  try {
    await sql`UPDATE meetings SET date = ${date}, meeting_type = ${meetingType}, presiding = ${presiding}, conducting = ${conducting}, announcements = ${announcementsValue}, opening_hymn = ${JSON.stringify(openingHymn)}, opening_prayer = ${openingPrayer}, 
    ward_business = ${JSON.stringify(wardBusiness)}, stake_business = ${stakeBusiness}, sacrament_hymn = ${JSON.stringify(sacramentHymn)}, speakers = ${JSON.stringify(speakers)}, closing_hymn = ${JSON.stringify(closingHymn)}, 
    closing_prayer = ${closingPrayer} WHERE id = ${id}`;
  } catch (error) {
    console.error('Error updating meeting:', error);
    throw new Error('Failed to update meeting. Please try again later.');
  }
  revalidatePath('/meetings');
  redirect(`/meetings/${id}`);
}

export async function deleteMeeting(id: number): Promise<void> {
  try {
    await sql`DELETE FROM meetings WHERE id = ${id}`;
  } catch (error) {
    console.error('Error deleting meeting:', error);
    throw new Error('Failed to delete meeting. Please try again later.');
  }
  revalidatePath('/meetings');
  redirect('/meetings');
}

export type MeetingType = 'testimony' | 'regular' | 'stake' | 'general';

export interface Hymn {
  number: number;
  title: string;
}

export interface SpeakerItem {
  id: number;
  name: string;
  topic: string;
  type: 'speaker' | 'musical-number';
}

export interface WardBusinessItem {
  description: string;
}

export enum Calling {
  bishop,
  bishopric1stCounselor,
  bishopric2ndCounselor,
  bishopricExecutiveSecretary,
  other,
}

export interface SacramentMeeting {
  id: number;
  date: string;
  meetingType: MeetingType;
  presiding: string;
  conducting: string;
  announcements?: string[];
  openingHymn: Hymn;
  openingPrayer: string;
  wardBusiness: WardBusinessItem[];
  stakeBusiness: boolean;
  sacramentHymn: Hymn;
  speakers: SpeakerItem[];
  closingHymn: Hymn;
  closingPrayer: string;
}

export type NewMeeting = Omit<SacramentMeeting, 'id'>;

export interface Account {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: string;
}

export type NewAccount = Omit<Account, 'id' | 'createdAt'>;

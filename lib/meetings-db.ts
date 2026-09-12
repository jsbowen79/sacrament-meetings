import type { SacramentMeeting } from './types';

export function getMeetingById(id: number): SacramentMeeting | undefined {
  return meetings.find((meeting) => meeting.id === id);
}

export const meetings: SacramentMeeting[] = [
  {
    id: 1,
    date: '2026-09-12',
    meetingType: 'regular',
    presiding: 'Bishop Salas',
    conducting: 'Brother Harris',
    openingHymn: { number: 2, title: 'The Spirit of God' },
    openingPrayer: 'Sister Johnson',
    wardBusiness: [{ description: 'Sustaining of Ward Mission Leader' }],
    stakeBusiness: false,
    sacramentHymn: { number: 169, title: 'In Remembrance of Thy Suffering' },
    speakers: [
      {
        id: 1,
        name: 'Sister Brown',
        topic: 'Faith in Jesus Christ',
        type: 'speaker',
      },
      { id: 2, name: 'Youth Choir', topic: '', type: 'musical-number' },
    ],
    closingHymn: { number: 31, title: 'O God, Our Help in Ages Past' },
    closingPrayer: 'Brother Taylor',
    announcements: ['Ward temple night: May 10'],
  },
  {
    id: 2,
    date: '2026-05-10',
    meetingType: 'regular',
    presiding: 'Bishop Salas',
    conducting: 'Brother Jeffries',
    openingHymn: { number: 85, title: 'How Firm a Foundation' },
    openingPrayer: 'Brother Martinez',
    wardBusiness: [{ description: 'Sustaining of Primary Secretary' }],
    stakeBusiness: false,
    sacramentHymn: { number: 193, title: 'I Stand All Amazed' },
    speakers: [
      {
        id: 3,
        name: 'Brother Anderson',
        topic: 'The Atonement of Jesus Christ',
        type: 'speaker',
      },
      {
        id: 4,
        name: 'Sister Wilson',
        topic: 'Finding Peace Through the Gospel',
        type: 'speaker',
      },
    ],
    closingHymn: { number: 227, title: 'There Is Sunshine in My Soul Today' },
    closingPrayer: 'Sister Davis',
    announcements: ['Ward temple night: May 17', 'Youth activity: May 13'],
  },

  {
    id: 3,
    date: '2026-05-17',
    meetingType: 'regular',
    presiding: 'Bishop Salas',
    conducting: 'Bishop Salas',
    openingHymn: { number: 2, title: 'The Spirit of God' },
    openingPrayer: 'Sister Martinez',
    wardBusiness: [{ description: 'Sustaining of Sunday School Presidency' }],
    stakeBusiness: true,
    sacramentHymn: { number: 185, title: 'Reverently and Meekly Now' },
    speakers: [
      {
        id: 5,
        name: 'Sister Thompson',
        topic: 'The Importance of Prayer',
        type: 'speaker',
      },
      {
        id: 6,
        name: 'Brother Lewis',
        topic: 'Strengthening Our Families',
        type: 'speaker',
      },
      { id: 2, name: 'Youth Choir', topic: '', type: 'musical-number' },
    ],
    closingHymn: { number: 249, title: 'Called to Serve' },
    closingPrayer: 'Brother Peterson',
    announcements: ['Ward picnic: May 24', 'Relief Society activity: May 21'],
  },

  {
    id: 4,
    date: '2026-05-24',
    meetingType: 'regular',
    presiding: 'Bishop Salas',
    conducting: 'Brother Harris',
    openingHymn: { number: 85, title: 'How Firm a Foundation' },
    openingPrayer: 'Brother Nelson',
    wardBusiness: [
      { description: 'Sustaining of New Relief Society Activity Committee' },
    ],
    stakeBusiness: false,
    sacramentHymn: { number: 174, title: 'While of These Emblems We Partake' },
    speakers: [
      {
        id: 7,
        name: 'Brother Garcia',
        topic: 'Remembering the Savior',
        type: 'speaker',
      },
      {
        id: 8,
        name: 'Sister Clark',
        topic: 'Faith During Difficult Times',
        type: 'speaker',
      },
    ],
    closingHymn: { number: 227, title: 'There Is Sunshine in My Soul Today' },
    closingPrayer: 'Sister Robinson',
    announcements: [
      'Ward picnic today after meetings',
      'Temple recommend interviews: May 31',
    ],
  },

  {
    id: 5,
    date: '2026-05-31',
    meetingType: 'regular',
    presiding: 'Bishop Salas',
    conducting: 'Brother Jeffries',
    openingHymn: { number: 30, title: 'Come, Come, Ye Saints' },
    openingPrayer: 'Sister Anderson',
    wardBusiness: [{ description: 'Sustaining of Ward Activities Committee' }],
    stakeBusiness: true,
    sacramentHymn: { number: 181, title: 'Jesus of Nazareth, Savior and King' },
    speakers: [
      {
        id: 9,
        name: 'Brother Wilson',
        topic: 'Following the Example of Jesus Christ',
        type: 'speaker',
      },
      {
        id: 10,
        name: 'Sister Harris',
        topic: 'Serving Others with Love',
        type: 'speaker',
      },
    ],
    closingHymn: { number: 81, title: 'Press Forward, Saints' },
    closingPrayer: 'Brother Clark',
    announcements: ['Youth fireside: June 7', 'Ward choir rehearsal: June 3'],
  },

  {
    id: 6,
    date: '2026-06-07',
    meetingType: 'regular',
    presiding: 'Bishop Salas',
    conducting: 'Brother Harris',
    openingHymn: { number: 21, title: "Come, Listen to a Prophet's Voice" },
    openingPrayer: 'Brother Taylor',
    wardBusiness: [{ description: 'Sustaining of New Ward Mission Leader' }],
    stakeBusiness: false,
    sacramentHymn: { number: 195, title: 'How Great the Wisdom and the Love' },
    speakers: [
      {
        id: 11,
        name: 'Sister Mitchell',
        topic: 'The Blessings of the Sacrament',
        type: 'speaker',
      },
      {
        id: 12,
        name: 'Brother Young',
        topic: 'Living the Gospel of Jesus Christ',
        type: 'speaker',
      },
      {
        id: 13,
        name: 'Relief Society Choir',
        topic: '',
        type: 'musical-number',
      },
    ],
    closingHymn: { number: 226, title: 'Improve the Shining Moments' },
    closingPrayer: 'Sister Harris',
    announcements: ['Ward temple night: June 14', 'Baptismal service: June 13'],
  },

  {
    id: 7,
    date: '2026-06-14',
    meetingType: 'regular',
    presiding: 'Bishop Salas',
    conducting: 'Bishop Salas',
    openingHymn: { number: 4, title: 'Truth Eternal' },
    openingPrayer: 'Brother Brown',
    wardBusiness: [
      { description: 'Sustaining of New Elders Quorum Secretary' },
    ],
    stakeBusiness: true,
    sacramentHymn: { number: 190, title: 'In Memory of the Crucified' },
    speakers: [
      {
        id: 14,
        name: 'Sister Evans',
        topic: 'Gratitude for the Savior',
        type: 'speaker',
      },
      {
        id: 15,
        name: 'Brother Johnson',
        topic: 'Keeping Our Covenants',
        type: 'speaker',
      },
    ],
    closingHymn: { number: 230, title: 'Scatter Sunshine' },
    closingPrayer: 'Sister Taylor',
    announcements: [
      'Ward service project: June 20',
      'Stake conference reminder: June 28',
    ],
  },
];

export function getMeetings(date?: string | null): SacramentMeeting[] {
  if (date) return meetings.filter((m) => m.date === date);
  return meetings;
}

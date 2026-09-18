'use client';

import { redirect } from 'next/navigation';
import { useState } from 'react';
import {
  NewMeeting,
  MeetingType,
  WardBusinessItem,
  SpeakerItem,
} from '@/lib/types';

export default function CreateNewMeeting() {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [meetingType, setMeetingType] = useState('regular' as MeetingType);
  const [presiding, setPresiding] = useState('Joseph Salas');
  const [conducting, setConducting] = useState('Joseph Salas');
  const [openingHymnNumber, setOpeningHymnNumber] = useState('2');
  const [openingHymnTitle, setOpeningHymnTitle] = useState('The Spirit of God');
  const [openingPrayer, setOpeningPrayer] = useState('TBA');
  const [wardBusiness, setWardBusiness] = useState<WardBusinessItem[]>([
    { description: '' },
  ]);
  const [businessDescription, setBusinessDescription] = useState('TBA');
  const [sacramentHymnNumber, setSacramentHymnNumber] = useState('169');
  const [sacramentHymnTitle, setSacramentHymnTitle] = useState(
    'In Remembrance of Thy Suffering',
  );
  const [stakeBusiness, setStakeBusiness] = useState(false);
  const [speakers, setSpeakers] = useState<SpeakerItem[]>([]);
  const [speakerName, setSpeakerName] = useState('TBA');
  const [speakerTopic, setSpeakerTopic] = useState('TBA');
  const [speakerType, setSpeakerType] =
    useState<SpeakerItem['type']>('speaker');
  const [closingHymnNumber, setClosingHymnNumber] = useState('31');
  const [closingHymnTitle, setClosingHymnTitle] = useState(
    'O God, Our Help in Ages Past',
  );
  const [closingPrayer, setClosingPrayer] = useState('TBA');
  const [announcements, setAnnouncements] = useState<string[]>([]);
  const [announcementText, setAnnouncementText] = useState('None');

  function addAnnouncement() {
    // const newAnnouncement: string = announcementText;
    setAnnouncements([...announcements, announcementText]);
    setAnnouncementText('');
  }

  function addBusiness() {
    const newBusiness: WardBusinessItem = {
      description: businessDescription,
    };

    setWardBusiness([...wardBusiness, newBusiness]);

    setBusinessDescription('');
  }

  function addSpeaker() {
    const newSpeaker: SpeakerItem = {
      id: speakers.length + 1,
      name: speakerName,
      topic: speakerTopic,
      type: speakerType,
    };

    setSpeakers([...speakers, newSpeaker]);

    setSpeakerName('');
    setSpeakerTopic('');
    setSpeakerType('speaker');
  }

  async function addMeeting() {
    const openingHymnObject = {
      number: Number(openingHymnNumber),
      title: openingHymnTitle,
    };
    const sacramentHymnObject = {
      number: Number(sacramentHymnNumber),
      title: sacramentHymnTitle,
    };
    const closingHymnObject = {
      number: Number(closingHymnNumber),
      title: closingHymnTitle,
    };

    const meeting: NewMeeting = {
      date: date,
      meetingType: meetingType,
      presiding: presiding,
      conducting: conducting,
      openingHymn: openingHymnObject,
      openingPrayer: openingPrayer,
      wardBusiness: wardBusiness,
      sacramentHymn: sacramentHymnObject,
      stakeBusiness: stakeBusiness,
      speakers: speakers,
      closingHymn: closingHymnObject,
      closingPrayer: closingPrayer,
      announcements: announcements,
    };
    const response = await fetch('/api/meetings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(meeting),
    });
    if (!response.ok) {
      console.log('Failed to add Meeting');
      redirect('/meetings/error');
    }
    console.log('Meeting added Successfully');
    redirect('/meetings/added');
  }

  return (
    <section className="grid grid-cols-[200px_1fr] gap-4 max-w-[500px] mx-auto">
      <label htmlFor="date">Enter Meeting Date:</label>
      <input
        id="date"
        type="date"
        value={date}
        onChange={(event) => setDate(event.target.value)}
        className="border-2 border-black p-2 m-2"
      />

      <label htmlFor="meetingType">Select a Meeting Type: </label>
      <select
        id="meetingType"
        value={meetingType}
        onChange={(event) => setMeetingType(event.target.value as MeetingType)}
        className="border-2 border-black p-2 m-2"
      >
        <option value="testimony">Testimony</option>
        <option value="regular">Regular</option>
        <option value="stake">Stake</option>
        <option value="general">General</option>
      </select>

      <label htmlFor="presiding">Who is Presiding:</label>
      <input
        id="presiding"
        type="text"
        value={presiding}
        onChange={(event) => setPresiding(event.target.value)}
        className="border-2 border-black p-2 m-2"
      />

      <label htmlFor="conducting">Who is conducting:</label>
      <input
        id="conducting"
        type="text"
        value={conducting}
        onChange={(event) => setConducting(event.target.value)}
        className="border-2 border-black p-2 m-2"
      />
      <div className="col-span-2 grid grid-cols-[200px_1fr] gap-4 max-w-[500px] border">
        <h3 className="col-span-2 text-3xl mx-auto">Opening Hymn</h3>
        <label htmlFor="openingHymnNumber" className="m-2">
          What is the Opening Hymn Number:
        </label>
        <input
          id="openingHymnNumber"
          type="text"
          value={openingHymnNumber}
          onChange={(event) => setOpeningHymnNumber(event.target.value)}
          className="border-2 border-black p-2 m-2"
        />

        <label htmlFor="openingHymnTitle" className="m-2">
          What is the Opening Hymn Title:
        </label>
        <input
          id="openingHymnTitle"
          type="text"
          value={openingHymnTitle}
          onChange={(event) => setOpeningHymnTitle(event.target.value)}
          className="border-2 border-black p-2 m-2"
        />
      </div>

      <label htmlFor="openingPrayer">Who is offering the opening prayer:</label>
      <input
        id="openingPrayer"
        type="text"
        value={openingPrayer}
        onChange={(event) => setOpeningPrayer(event.target.value)}
        className="border-2 border-black p-2 m-2"
      />

      <div className="col-span-2 grid grid-cols-[200px_1fr] gap-4 max-w-[500px] border">
        <label htmlFor="businessDescription" className="m-2">
          Enter Ward business item:
        </label>
        <input
          id="businessDescription"
          type="text"
          value={businessDescription}
          onChange={(event) => setBusinessDescription(event.target.value)}
          className="border-2 border-black p-2 m-2"
        />

        <button
          type="button"
          onClick={addBusiness}
          className="bg-[var(--church-blue-dark)] text-white border rounded-lg p-2 col-span-2 m-2"
        >
          Add Business
        </button>
      </div>

      <label htmlFor="stakeBusiness">Check the box for Stake business:</label>

      <input
        id="stakeBusiness"
        type="checkbox"
        checked={stakeBusiness}
        onChange={(event) => setStakeBusiness(event.target.checked)}
        className="m-2 size-6"
      />

      <div className="col-span-2 grid grid-cols-[200px_1fr] gap-4 max-w-[500px] border">
        <h3 className="col-span-2 text-3xl mx-auto">Sacrament Hymn</h3>
        <label htmlFor="sacramentHymnNumber" className="m-2">
          What is the Sacrament hymn number:
        </label>
        <input
          id="sacramentHymnNumber"
          type="text"
          value={sacramentHymnNumber}
          onChange={(event) => setSacramentHymnNumber(event.target.value)}
          className="border-2 border-black p-2 m-2"
        />

        <label htmlFor="sacramentHymnTitle" className="m-2">
          What is the Sacrament Hymn Title:
        </label>
        <input
          id="sacramentHymnTitle"
          type="text"
          value={sacramentHymnTitle}
          onChange={(event) => setSacramentHymnTitle(event.target.value)}
          className="border-2 border-black p-2 m-2"
        />
      </div>

      <div className="col-span-2 grid grid-cols-[200px_1fr] gap-4 max-w-[500px] border">
        <h3 className="col-span-2 mx-auto text-3xl">Speakers</h3>

        <label htmlFor="speakerName" className="m-2">
          Name:
        </label>
        <input
          id="speakerName"
          type="text"
          value={speakerName}
          onChange={(event) => setSpeakerName(event.target.value)}
          className="border-2 border-black p-2 m-2"
        />

        <label htmlFor="speakerTopic" className="m-2">
          Topic:
        </label>
        <input
          id="speakerTopic"
          type="text"
          value={speakerTopic}
          onChange={(event) => setSpeakerTopic(event.target.value)}
          className="border-2 border-black p-2 m-2"
        />

        <label htmlFor="speakerType" className="m-2">
          Type:
        </label>
        <select
          id="speakerType"
          value={speakerType}
          onChange={(event) =>
            setSpeakerType(event.target.value as SpeakerItem['type'])
          }
          className="border-2 border-black p-2 m-2"
        >
          <option value="speaker">Speaker</option>
          <option value="musical-number">Musical Number</option>
        </select>

        <button
          type="button"
          onClick={addSpeaker}
          className="bg-[var(--church-blue-dark)] text-white border rounded-lg p-2 col-span-2 m-2"
        >
          Add Speaker
        </button>
      </div>

      <div className="col-span-2 grid grid-cols-[200px_1fr] gap-4 max-w-[500px] border">
        <h3 className="col-span-2 text-3xl mx-auto">Closing Hymn</h3>

        <label htmlFor="closingHymnNumber" className="m-2">
          What is the closing hymn number:
        </label>
        <input
          id="closingHymnNumber"
          type="text"
          value={closingHymnNumber}
          onChange={(event) => setClosingHymnNumber(event.target.value)}
          className="border-2 border-black p-2 m-2"
        />

        <label htmlFor="closingHymnTitle" className="m-2">
          What is the closing hymn title:
        </label>
        <input
          id="closingHymnTitle"
          type="text"
          value={closingHymnTitle}
          onChange={(event) => setClosingHymnTitle(event.target.value)}
          className="border-2 border-black p-2 m-2"
        />
      </div>

      <label htmlFor="closingPrayer">Who is offering the closing prayer:</label>
      <input
        id="closingPrayer"
        type="text"
        value={closingPrayer}
        onChange={(event) => setClosingPrayer(event.target.value)}
        className="border-2 border-black p-2 m-2"
      />

      <label htmlFor="announcements">Enter any announcements:</label>
      <input
        id="announcements"
        type="text"
        value={announcementText}
        onChange={(event) => setAnnouncementText(event.target.value)}
        className="border-2 border-black p-2 m-2"
      />

      <button
        type="button"
        onClick={addAnnouncement}
        className="bg-[var(--church-blue-dark)] text-white border rounded-lg p-2 col-span-2"
      >
        Add Announcement
      </button>

      <button
        onClick={addMeeting}
        className="bg-[var(--church-blue-dark)] text-white border rounded-lg p-2 col-span-2"
      >
        Add Meeting
      </button>
    </section>
  );
}

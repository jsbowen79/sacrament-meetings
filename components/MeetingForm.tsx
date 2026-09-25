'use client';
import { SacramentMeeting } from '@/lib/types';
import { createMeeting, State, updateMeeting } from '@/lib/actions';
import { useActionState, useState } from 'react';
import { MeetingType, WardBusinessItem, SpeakerItem } from '@/lib/types';

export default function MeetingForm({
  initialMeeting,
}: {
  initialMeeting?: SacramentMeeting;
}) {
  const initialState: State = {
    message: null,
  };

  const action = initialMeeting ? updateMeeting : createMeeting;

  const [state, formAction] = useActionState(action, initialState);

  const [date, setDate] = useState(
    initialMeeting?.date || new Date().toISOString().split('T')[0],
  );
  const [meetingType, setMeetingType] = useState(
    initialMeeting?.meetingType || ('regular' as MeetingType),
  );
  const [presiding, setPresiding] = useState(
    initialMeeting?.presiding || 'Joseph Salas',
  );
  const [conducting, setConducting] = useState(
    initialMeeting?.conducting || 'Joseph Salas',
  );
  const [openingHymnNumber, setOpeningHymnNumber] = useState(
    initialMeeting?.openingHymn.number || 2,
  );
  const [openingHymnTitle, setOpeningHymnTitle] = useState(
    initialMeeting?.openingHymn.title || 'The Spirit of God',
  );
  const [openingPrayer, setOpeningPrayer] = useState(
    initialMeeting?.openingPrayer || 'TBA',
  );
  const [wardBusiness, setWardBusiness] = useState<WardBusinessItem[]>(
    initialMeeting?.wardBusiness || [],
  );
  const [businessDescription, setBusinessDescription] = useState('');
  const [sacramentHymnNumber, setSacramentHymnNumber] = useState(
    initialMeeting?.sacramentHymn.number || 169,
  );
  const [sacramentHymnTitle, setSacramentHymnTitle] = useState(
    initialMeeting?.sacramentHymn.title || 'In Remembrance of Thy Suffering',
  );
  const [stakeBusiness, setStakeBusiness] = useState(
    initialMeeting?.stakeBusiness || false,
  );
  const [speakers, setSpeakers] = useState<SpeakerItem[]>(
    initialMeeting?.speakers || [],
  );
  const [speakerName, setSpeakerName] = useState('');
  const [speakerTopic, setSpeakerTopic] = useState('');
  const [speakerType, setSpeakerType] =
    useState<SpeakerItem['type']>('speaker');
  const [closingHymnNumber, setClosingHymnNumber] = useState(
    initialMeeting?.closingHymn.number || 31,
  );
  const [closingHymnTitle, setClosingHymnTitle] = useState(
    initialMeeting?.closingHymn.title || 'O God, Our Help in Ages Past',
  );
  const [closingPrayer, setClosingPrayer] = useState(
    initialMeeting?.closingPrayer || 'TBA',
  );
  const [announcements, setAnnouncements] = useState<string[]>(
    initialMeeting?.announcements || [],
  );
  const [announcementText, setAnnouncementText] = useState('');

  function addAnnouncement() {
    setAnnouncements([...announcements, announcementText]);
    setAnnouncementText('');
  }

  function updateAnnouncement(index: number, newText: string) {
    const updatedAnnouncements = [...announcements];
    updatedAnnouncements[index] = newText;
    setAnnouncements(updatedAnnouncements);
  }

  function addBusiness() {
    const newBusiness: WardBusinessItem = {
      description: businessDescription,
    };
    setWardBusiness([...wardBusiness, newBusiness]);
    setBusinessDescription('');
  }

  function updateWardBusiness(index: number, newDescription: string) {
    const updatedBusiness = [...wardBusiness];
    updatedBusiness[index] = { description: newDescription };
    setWardBusiness(updatedBusiness);
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

  function updateSpeaker(
    index: number,
    newName: string,
    newTopic: string,
    newType: SpeakerItem['type'],
  ) {
    const updatedSpeakers = [...speakers];
    updatedSpeakers[index] = {
      ...updatedSpeakers[index],
      name: newName,
      topic: newTopic,
      type: newType,
    };
    setSpeakers(updatedSpeakers);

    setSpeakerName('');
    setSpeakerTopic('');
    setSpeakerType('speaker');
  }

  return (
    <form
      action={formAction}
      className="mx-auto grid max-w-[500px] grid-cols-[200px_1fr] gap-4 [&_input:not([type=hidden])]:m-2 [&_select]:m-2"
    >
      <input type="hidden" name="id" value={initialMeeting?.id || ''} />
      <label htmlFor="date">Enter Meeting Date:</label>
      <input
        id="date"
        type="date"
        name="date"
        value={date}
        onChange={(event) => setDate(event.target.value)}
        className="border-2 border-black p-2 m-2"
        aria-describedby="date-error"
      />
      {state.errors?.date && (
        <p id="date-error" className="col-span-2 text-red-600">
          {state.errors.date.join(', ')}
        </p>
      )}

      <label htmlFor="meetingType">Select a Meeting Type: </label>
      <select
        id="meetingType"
        name="meetingType"
        value={meetingType}
        onChange={(event) => setMeetingType(event.target.value as MeetingType)}
        className="border-2 border-black p-2 m-2"
        aria-describedby="meetingType-error"
      >
        <option value="testimony">Testimony</option>
        <option value="regular">Regular</option>
        <option value="stake">Stake</option>
        <option value="general">General</option>
      </select>
      {state.errors?.meetingType && (
        <p className="col-span-2 text-red-600" id="meetingType-error">
          {state.errors.meetingType.join(', ')}
        </p>
      )}

      <label htmlFor="presiding">Who is Presiding:</label>
      <input
        id="presiding"
        type="text"
        name="presiding"
        value={presiding}
        onChange={(event) => setPresiding(event.target.value)}
        className="border-2 border-black p-2 m-2"
        aria-describedby="presiding-error"
      />
      {state.errors?.presiding && (
        <p className="col-span-2 text-red-600" id="presiding-error">
          {state.errors.presiding.join(', ')}
        </p>
      )}

      <label htmlFor="conducting">Who is conducting:</label>
      <input
        id="conducting"
        type="text"
        name="conducting"
        value={conducting}
        onChange={(event) => setConducting(event.target.value)}
        className="border-2 border-black p-2 m-2"
        aria-describedby="conducting-error"
      />
      {state.errors?.conducting && (
        <p className="col-span-2 text-red-600" id="conducting-error">
          {state.errors.conducting.join(', ')}
        </p>
      )}

      <div className="col-span-2 grid grid-cols-[200px_1fr] gap-4 max-w-[500px] border p-2">
        <h3 className="col-span-2 text-3xl mx-auto">Opening Hymn</h3>
        <label htmlFor="openingHymnNumber" className="m-2">
          What is the Opening Hymn Number:
        </label>
        <input
          id="openingHymnNumber"
          type="text"
          value={openingHymnNumber}
          onChange={(event) => setOpeningHymnNumber(Number(event.target.value))}
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
        <input
          type="hidden"
          name="openingHymn"
          value={JSON.stringify({
            number: openingHymnNumber,
            title: openingHymnTitle,
          })}
          aria-describedby="openingHymn-error"
        />

        <input
          type="hidden"
          name="openingHymnTitle"
          value={JSON.stringify(openingHymnTitle)}
        />
      </div>
      {state.errors?.openingHymn && (
        <p className="col-span-2 text-red-600" id="openingHymn-error">
          {state.errors.openingHymn.join(', ')}
        </p>
      )}

      <label htmlFor="openingPrayer">Who is offering the opening prayer:</label>
      <input
        id="openingPrayer"
        type="text"
        name="openingPrayer"
        value={openingPrayer}
        onChange={(event) => setOpeningPrayer(event.target.value)}
        className="border-2 border-black p-2 m-2"
        aria-describedby="openingPrayer-error"
      />
      {state.errors?.openingPrayer && (
        <p className="col-span-2 text-red-600" id="openingPrayer-error">
          {state.errors.openingPrayer.join(', ')}
        </p>
      )}

      <div className="col-span-2 grid grid-cols-[200px_1fr] gap-4 max-w-[500px] border p-2">
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
          className="col-span-2 m-2 rounded-[0.625rem] border border-[var(--church-blue-dark)] bg-[var(--church-blue-light)] px-4 py-3 font-semibold text-[var(--church-blue-dark)] hover:bg-[var(--church-blue-dark)] hover:!text-white hover:opacity-100"
        >
          Add Business
        </button>
        <input
          type="hidden"
          name="wardBusiness"
          aria-describedby="wardBusiness-error"
          value={JSON.stringify(wardBusiness)}
        />
        {state.errors?.wardBusiness && (
          <p className="col-span-2 text-red-600" id="wardBusiness-error">
            {state.errors.wardBusiness.join(', ')}
          </p>
        )}
      </div>
      {wardBusiness &&
        wardBusiness.map((item, index) => (
          <div
            key={index}
            className="col-span-2 grid grid-cols-[200px_1fr] gap-4 max-w-[500px] border p-2"
          >
            <label htmlFor={`businessDescription-${index}`} className="m-2">
              Enter Ward business update:
            </label>
            <input
              id={`businessDescription-${index}`}
              type="text"
              value={item.description}
              onChange={(event) =>
                updateWardBusiness(index, event.target.value)
              }
              className="border-2 border-black p-2 m-2"
            />
          </div>
        ))}

      <label htmlFor="stakeBusiness">Check the box for Stake business:</label>

      <input
        id="stakeBusiness"
        type="checkbox"
        name="stakeBusiness"
        checked={stakeBusiness}
        onChange={(event) => setStakeBusiness(event.target.checked)}
        className="m-2 size-6"
      />

      <div className="col-span-2 grid grid-cols-[200px_1fr] gap-4 max-w-[500px] border p-2">
        <h3 className="col-span-2 text-3xl mx-auto">Sacrament Hymn</h3>
        <label htmlFor="sacramentHymnNumber" className="m-2">
          What is the Sacrament hymn number:
        </label>
        <input
          id="sacramentHymnNumber"
          type="text"
          value={sacramentHymnNumber}
          onChange={(event) =>
            setSacramentHymnNumber(Number(event.target.value))
          }
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
        <input
          type="hidden"
          name="sacramentHymn"
          value={JSON.stringify({
            number: sacramentHymnNumber,
            title: sacramentHymnTitle,
          })}
          aria-describedby="sacramentHymn-error"
        />

        {state.errors?.sacramentHymn && (
          <p className="col-span-2 text-red-600" id="sacramentHymn-error">
            {state.errors.sacramentHymn.join(', ')}
          </p>
        )}
      </div>

      <div className="col-span-2 grid grid-cols-[200px_1fr] gap-4 max-w-[500px] border p-2">
        <div className="col-span-2 grid grid-cols-[200px_1fr] gap-4 p-2">
          <h3 className="col-span-2 mx-auto text-3xl">New Speakers</h3>
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

          <input
            type="hidden"
            name="speakers"
            value={JSON.stringify(speakers)}
            aria-describedby="speakers-error"
          />
          {state.errors?.speakers && (
            <p className="col-span-2 text-red-600" id="speakers-error">
              {state.errors.speakers.join(', ')}
            </p>
          )}
          <button
            type="button"
            onClick={addSpeaker}
            className="col-span-2 m-2 rounded-[0.625rem] border border-[var(--church-blue-dark)] bg-[var(--church-blue-light)] px-4 py-3 font-semibold text-[var(--church-blue-dark)] hover:bg-[var(--church-blue-dark)] hover:!text-white hover:opacity-100"
          >
            Add Speaker
          </button>
        </div>
        {/* )} */}

        <h3 className="col-span-2 mx-auto text-3xl">Edit Existing Speakers</h3>
        {speakers &&
          speakers.map((speaker, index) => (
            <div
              key={speaker.id}
              className="col-span-2 grid grid-cols-[200px_1fr] gap-4 p-2"
            >
              <label htmlFor={`speakerName-${speaker.id}`} className="m-2">
                Name:
              </label>
              <input
                id={`speakerName-${speaker.id}`}
                type="text"
                value={speaker.name}
                onChange={(event) =>
                  updateSpeaker(
                    index,
                    event.target.value,
                    speaker.topic,
                    speaker.type,
                  )
                }
                className="border-2 border-black p-2 m-2"
              />

              <label htmlFor={`speakerTopic-${speaker.id}`} className="m-2">
                Topic:
              </label>
              <input
                id={`speakerTopic-${speaker.id}`}
                type="text"
                value={speaker.topic}
                onChange={(event) =>
                  updateSpeaker(
                    index,
                    speaker.name,
                    event.target.value,
                    speaker.type,
                  )
                }
                className="border-2 border-black p-2 m-2"
              />

              <label htmlFor={`speakerType-${speaker.id}`} className="m-2">
                Type:
              </label>
              <select
                id={`speakerType-${speaker.id}`}
                value={speaker.type}
                onChange={(event) =>
                  updateSpeaker(
                    index,
                    speaker.name,
                    speaker.topic,
                    event.target.value as SpeakerItem['type'],
                  )
                }
                className="border-2 border-black p-2 m-2"
              >
                <option value="speaker">Speaker</option>
                <option value="musical-number">Musical Number</option>
              </select>

              {state.errors?.speakers && (
                <p className="col-span-2 text-red-600">
                  {state.errors.speakers.join(', ')}
                </p>
              )}
            </div>
          ))}
      </div>

      <div className="col-span-2 grid grid-cols-[200px_1fr] gap-4 max-w-[500px] border p-2">
        <h3 className="col-span-2 text-3xl mx-auto">Closing Hymn</h3>

        <label htmlFor="closingHymnNumber" className="m-2">
          What is the closing hymn number:
        </label>
        <input
          id="closingHymnNumber"
          type="text"
          value={closingHymnNumber}
          onChange={(event) => setClosingHymnNumber(Number(event.target.value))}
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
        <input
          type="hidden"
          name="closingHymn"
          value={JSON.stringify({
            number: closingHymnNumber,
            title: closingHymnTitle,
          })}
          aria-describedby="closingHymn-error"
        />

        {state.errors?.closingHymn && (
          <p className="col-span-2 text-red-600" id="closingHymn-error">
            {state.errors.closingHymn.join(', ')}
          </p>
        )}
      </div>

      <label htmlFor="closingPrayer">Who is offering the closing prayer:</label>
      <input
        id="closingPrayer"
        type="text"
        name="closingPrayer"
        value={closingPrayer}
        onChange={(event) => setClosingPrayer(event.target.value)}
        className="border-2 border-black p-2 m-2"
        aria-describedby="closingPrayer-error"
      />
      {state.errors?.closingPrayer && (
        <p className="col-span-2 text-red-600" id="closingPrayer-error">
          {state.errors.closingPrayer.join(', ')}
        </p>
      )}

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
        className="col-span-2 rounded-[0.625rem] border border-[var(--church-blue-dark)] bg-[var(--church-blue-light)] px-4 py-3 font-semibold text-[var(--church-blue-dark)] hover:bg-[var(--church-blue-dark)] hover:!text-white hover:opacity-100"
      >
        Add Announcement
      </button>
      <input
        type="hidden"
        name="announcements"
        value={JSON.stringify(announcements)}
        aria-label="announcements_error"
      />
      {state.errors?.announcements && (
        <p className="col-span-2 text-red-600 p-2" id="announcements-error">
          {state.errors.announcements.join(', ')}
        </p>
      )}

      {state.message && (
        <p className="col-span-2 text-red-600" aria-live="polite">
          {state.message}
        </p>
      )}

      {announcements &&
        announcements.map((announcement, index) => (
          <div
            key={index}
            className="col-span-2 grid grid-cols-[200px_1fr] gap-4 max-w-[500px] border p-2"
          >
            <label htmlFor={`announcements-${index}`}>
              Enter any announcements:
            </label>
            <input
              id={`announcements-${index}`}
              type="text"
              value={announcement}
              onChange={(event) =>
                updateAnnouncement(index, event.target.value)
              }
              className="border-2 border-black p-2 m-2"
            />
          </div>
        ))}

      <button
        type="submit"
        className="col-span-2 mb-4 rounded-[0.625rem] border border-[var(--church-blue-dark)] bg-[var(--church-blue-dark)] px-4 py-3 font-semibold text-white hover:bg-[var(--church-blue-light)] hover:!text-[var(--church-blue-dark)] hover:opacity-100"
      >
        Update/Create Meeting
      </button>
    </form>
  );
}

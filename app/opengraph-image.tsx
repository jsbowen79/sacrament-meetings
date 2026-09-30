import { ImageResponse } from 'next/og';

export const alt = 'Sacrament Meeting Tracker agenda overview';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        backgroundColor: '#f1f6f4',
        padding: 34,
        color: '#142a35',
      }}
    >
      <div
        style={{
          width: '68%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#005175',
          padding: '54px 58px',
          color: '#ffffff',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            fontSize: 18,
            fontWeight: 700,
            letterSpacing: 2,
            color: '#bce5d6',
          }}
        >
          <div style={{ width: 42, height: 5, backgroundColor: '#e2b85d' }} />
          WARD MEETING RECORDS
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              fontFamily: 'Georgia',
              fontSize: 68,
              fontWeight: 700,
              lineHeight: 1.04,
            }}
          >
            <span>Sacrament</span>
            <span>Meeting Tracker</span>
          </div>
          <div style={{ fontSize: 25, color: '#d7e8ed' }}>
            Agendas, hymns, and the people who serve.
          </div>
        </div>
        <div style={{ fontSize: 16, color: '#bce5d6' }}>
          PLAN · PUBLISH · REVIEW
        </div>
      </div>
      <div
        style={{
          width: '32%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 22,
          padding: '40px 30px',
          backgroundColor: '#ffffff',
        }}
      >
        <div style={{ fontSize: 15, fontWeight: 700, color: '#007da5' }}>
          SUNDAY MEETING
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            fontFamily: 'Georgia',
            fontSize: 30,
            fontWeight: 700,
            color: '#005175',
          }}
        >
          Order of
          <span>meeting</span>
        </div>
        {['Opening hymn', 'Sacrament', 'Speakers', 'Closing hymn'].map(
          (item, index) => (
            <div
              key={item}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                fontSize: 16,
                color: '#344b56',
              }}
            >
              <div
                style={{
                  width: 5,
                  height: 26,
                  backgroundColor: index === 1 ? '#d5a53b' : '#35a28b',
                }}
              />
              {item}
            </div>
          ),
        )}
      </div>
    </div>,
    size,
  );
}

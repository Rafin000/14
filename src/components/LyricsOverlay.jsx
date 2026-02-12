import { useState } from 'react';
import './LyricsOverlay.css';

const lyrics = `Orpita...

From the moment I saw you
My world was never the same
You walked in like a soft morning light
And whispered my name

Rafin was lost before you came
Now every road leads back to you

Orpita, you are my dream
My light when the world goes dark
In this world of a million faces
You're the only one in my heart

Your laugh is my favorite sound
Your eyes hold the stars I need
Every second I spend with you
Is more than enough for me

Orpita, you are my dream
My light when the world goes dark
Rafin gave you his whole heart
And you gave him a brand new start

Rafin and Orpita
Written in the stars above
This isn't just a story
This is love

Forever yours, forever mine
Forever us
Forever yours, forever mine
Forever... us`;

function highlightNames(text) {
  return text.split(/(Rafin|Orpita)/g).map((part, i) => {
    if (part === 'Rafin' || part === 'Orpita') {
      return <span key={i} className="lyrics-name">{part}</span>;
    }
    return part;
  });
}

export default function LyricsOverlay() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button className="lyrics-toggle" onClick={() => setOpen(true)} title="View Song Lyrics">
        🎶
      </button>

      {open && (
        <div className="lyrics-backdrop" onClick={() => setOpen(false)}>
          <div className="lyrics-modal" onClick={(e) => e.stopPropagation()}>
            <button className="lyrics-close" onClick={() => setOpen(false)}>×</button>
            <h3 className="lyrics-title">Our Song</h3>
            <p className="lyrics-subtitle">Rafin & Orpita</p>
            <div className="lyrics-body">
              {lyrics.split('\n').map((line, i) => (
                <p key={i} className={line.trim() === '' ? 'lyrics-gap' : 'lyrics-line'}>
                  {line.trim() === '' ? '\u00A0' : highlightNames(line)}
                </p>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

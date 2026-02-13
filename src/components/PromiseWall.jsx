import { useState } from 'react';
import './PromiseWall.css';

const promises = [
  { emoji: '😂', text: 'I promise to always make you laugh, even on your worst days.', bg: 'rgba(255,107,157,0.08)' },
  { emoji: '🤝', text: 'I promise to never let go of your hand.', bg: 'rgba(160,120,255,0.08)' },
  { emoji: '🌙', text: 'I promise I will never let you sleep alone.', bg: 'rgba(100,140,255,0.08)' },
  { emoji: '☕', text: 'I promise to make you coffee when you start for office.', bg: 'rgba(255,180,100,0.08)' },
  { emoji: '⏰', text: 'I promise I will always make time for you.', bg: 'rgba(255,107,157,0.08)' },
  { emoji: '💝', text: 'I promise I will always give you my attention.', bg: 'rgba(200,100,255,0.08)' },
  { emoji: '🫂', text: 'I promise I will always take care of you.', bg: 'rgba(100,200,200,0.08)' },
  { emoji: '💋', text: 'I promise to kiss you before you go to office.', bg: 'rgba(255,100,130,0.08)' },
  { emoji: '♾️', text: 'I promise to love you... forever and beyond.', bg: 'rgba(255,107,157,0.12)' },
];

const transitions = [
  'reveal-zoom', 'reveal-flip', 'reveal-slide-up', 'reveal-rotate',
  'reveal-zoom', 'reveal-slide-up', 'reveal-flip', 'reveal-rotate', 'reveal-final',
];

export default function PromiseWall({ onNext }) {
  const [current, setCurrent] = useState(0);
  const [phase, setPhase] = useState('show');
  const [direction, setDirection] = useState('next');

  const go = (index) => {
    if (phase === 'exit' || index === current) return;
    if (index < 0 || index >= promises.length) return;

    setDirection(index > current ? 'next' : 'prev');
    setPhase('exit');
    setTimeout(() => {
      setCurrent(index);
      setPhase('show');
    }, 350);
  };

  const handleClick = (e) => {
    const x = e.clientX / window.innerWidth;
    if (x < 0.3) {
      go(current - 1);
    } else {
      go(current + 1);
    }
  };

  const p = promises[current];
  const anim = transitions[current];

  return (
    <div className="pw-screen" onClick={handleClick}>
      {/* Progress bar */}
      <div className="pw-progress-bar">
        {promises.map((_, i) => (
          <div key={i} className="pw-bar-segment" onClick={(e) => { e.stopPropagation(); go(i); }}>
            <div className={`pw-bar-fill ${i < current ? 'done' : ''} ${i === current ? 'active' : ''}`} />
          </div>
        ))}
      </div>

      <p className="pw-header">My Promises To You</p>

      {/* Navigation arrows */}
      {current > 0 && (
        <button className="pw-arrow pw-arrow-left" onClick={(e) => { e.stopPropagation(); go(current - 1); }}>
          ‹
        </button>
      )}
      {current < promises.length - 1 && (
        <button className="pw-arrow pw-arrow-right" onClick={(e) => { e.stopPropagation(); go(current + 1); }}>
          ›
        </button>
      )}

      {/* Promise card */}
      <div
        className={`pw-card ${anim} ${phase} ${direction}`}
        key={current}
        style={{ background: p.bg }}
      >
        <div className="pw-emoji-wrap">
          <span className="pw-emoji">{p.emoji}</span>
          <div className="pw-emoji-ring" />
          <div className="pw-emoji-ring pw-ring-2" />
        </div>
        <p className="pw-promise-text">{p.text}</p>
        <span className="pw-promise-num">{current + 1} of {promises.length}</span>
      </div>

      <p className="pw-tap">tap left to go back · tap right for next</p>

      {current === promises.length - 1 && onNext && (
        <button className="pw-continue-btn" onClick={(e) => { e.stopPropagation(); onNext(); }}>
          Continue 💕
        </button>
      )}
    </div>
  );
}

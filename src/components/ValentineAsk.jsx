import { useState, useRef } from 'react';
import './ValentineAsk.css';

const noTexts = [
  "Nope!", "Try again!", "Not happening!",
  "Think again!", "Really?!", "No way!",
  "Impossible!", "Are you sure?!", "Wrong button!",
  "Hehe, can't click me!", "I'm too fast!",
];

export default function ValentineAsk({ onYes }) {
  const [noText, setNoText] = useState("No");
  const [noSize, setNoSize] = useState(22);
  const [yesSize, setYesSize] = useState(22);
  const [yesGuard, setYesGuard] = useState(false);
  const btnRef = useRef(null);
  const yesBtnRef = useRef(null);

  const runAway = () => {
    const btn = btnRef.current;
    const yesBtn = yesBtnRef.current;
    if (!btn) return;

    const padding = 20;
    const maxX = window.innerWidth - btn.offsetWidth - padding;
    const maxY = window.innerHeight - btn.offsetHeight - padding;

    // Get Yes button bounds to avoid overlapping it
    const yesRect = yesBtn ? yesBtn.getBoundingClientRect() : null;
    const margin = 60;

    let newX, newY, attempts = 0;
    do {
      newX = Math.max(padding, Math.random() * maxX);
      newY = Math.max(padding, Math.random() * maxY);
      attempts++;
    } while (
      attempts < 30 &&
      yesRect &&
      newX < yesRect.right + margin &&
      newX + btn.offsetWidth > yesRect.left - margin &&
      newY < yesRect.bottom + margin &&
      newY + btn.offsetHeight > yesRect.top - margin
    );

    btn.style.position = 'fixed';
    btn.style.left = newX + 'px';
    btn.style.top = newY + 'px';

    setNoText(noTexts[Math.floor(Math.random() * noTexts.length)]);
    setNoSize(prev => Math.max(12, prev - 2));
    setYesSize(prev => Math.min(40, prev + 3));

    // Briefly guard the Yes button so the size change doesn't cause an accidental tap
    setYesGuard(true);
    setTimeout(() => setYesGuard(false), 400);
  };

  return (
    <div className="valentine-screen">
      <div className="valentine-box">
        <div className="valentine-big-heart">💗</div>
        <h1 className="valentine-question">
          Will you be my<br />Valentine?
        </h1>
        <div className="valentine-names">Rafin & Orpita</div>
        <div className="valentine-btns">
          <button
            ref={yesBtnRef}
            className="valentine-yes"
            onClick={() => { if (!yesGuard) onYes(); }}
            style={{ fontSize: yesSize + 'px', padding: `${14 + (yesSize - 22) * 0.5}px ${50 + (yesSize - 22) * 2}px` }}
          >
            Yes! 💕
          </button>
          <button
            ref={btnRef}
            className="valentine-no"
            onMouseEnter={runAway}
            onClick={runAway}
            onTouchStart={runAway}
            style={{ fontSize: noSize + 'px' }}
          >
            {noText}
          </button>
        </div>
      </div>
    </div>
  );
}

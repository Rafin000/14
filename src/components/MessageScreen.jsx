import { useEffect, useState } from 'react';
import './MessageScreen.css';

const poemLines = [
  { text: 'Every moment with you feels like a beautiful dream.', style: 'line-drift-right' },
  { text: 'Your smile lights up my entire world', style: 'line-drift-left' },
  { text: 'in ways words could never capture.', style: 'line-blur-in' },
  { text: null }, // spacer
  { text: 'You are my favorite person,', style: 'line-drift-right' },
  { text: 'my best friend, my everything.', style: 'line-scale-in' },
  { text: null }, // spacer
  { text: '~ Rafin, for his Orpita ~', style: 'line-glow-in', className: 'message-signature' },
];

export default function MessageScreen({ onNext }) {
  const [typed, setTyped] = useState('');
  const [typingDone, setTypingDone] = useState(false);
  const [visibleLines, setVisibleLines] = useState(0);
  const [showBtn, setShowBtn] = useState(false);

  const fullText = "Hey Orpita, my love...";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i <= fullText.length) {
        setTyped(fullText.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
        setTypingDone(true);
        // Reveal lines one by one
        let lineIndex = 0;
        const lineTimer = setInterval(() => {
          lineIndex++;
          setVisibleLines(lineIndex);
          if (lineIndex >= poemLines.length) {
            clearInterval(lineTimer);
            setTimeout(() => setShowBtn(true), 600);
          }
        }, 500);
      }
    }, 80);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="message-screen">
      <div className="message-box">
        <h2 className="message-typed">
          {typed}
          {!typingDone && <span className="message-cursor">|</span>}
        </h2>

        <div className="message-poem">
          {poemLines.map((line, i) => {
            if (!line.text) {
              return <div key={i} className={`poem-spacer ${i < visibleLines ? 'visible' : ''}`} />;
            }
            return (
              <p
                key={i}
                className={`poem-line ${line.style} ${line.className || ''} ${i < visibleLines ? 'visible' : ''}`}
              >
                {line.text}
              </p>
            );
          })}
        </div>

        <button
          className={`message-btn ${showBtn ? 'visible' : ''}`}
          onClick={onNext}
        >
          🚪 Open The Door
        </button>
      </div>
    </div>
  );
}

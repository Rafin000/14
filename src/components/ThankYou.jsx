import { useState, useEffect } from 'react';
import './ThankYou.css';

const lines = [
  'For being my light on the darkest days',
  'For loving me the way you do',
  'For making every ordinary moment magical',
  'For choosing me, every single day',
  'For being you — my everything',
];

export default function ThankYou() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [showClosing, setShowClosing] = useState(false);

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      i++;
      setVisibleLines(i);
      if (i >= lines.length) {
        clearInterval(timer);
        setTimeout(() => setShowClosing(true), 800);
      }
    }, 700);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="ty-screen">
      <div className="ty-heart-top">💗</div>

      <h1 className="ty-title">Thank You, Orpita</h1>
      <p className="ty-subtitle">for everything you are</p>

      <div className={`ty-paper ${visibleLines > 0 ? 'visible' : ''}`}>
        {lines.map((line, i) => (
          <p key={i} className={`ty-line ${i < visibleLines ? 'visible' : ''}`}>
            {line}
          </p>
        ))}
      </div>

      <div className={`ty-divider ${showClosing ? 'visible' : ''}`}>
        💕 ✨ 💕
      </div>

      <div className={`ty-closing ${showClosing ? 'visible' : ''}`}>
        <p className="ty-not-end">This is not the end...</p>
        <p className="ty-continuing">Our love story is just beginning</p>
        <div className="ty-infinity">∞</div>
      </div>

      <div className={`ty-footer ${showClosing ? 'visible' : ''}`}>
        <span>Rafin</span>
        <span className="ty-footer-heart">❤️</span>
        <span>Orpita</span>
      </div>
      <p className={`ty-forever ${showClosing ? 'visible' : ''}`}>Forever & Always</p>
    </div>
  );
}

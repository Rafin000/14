import { useEffect, useRef } from 'react';
import './Celebration.css';

const confettiShapes = ['❤️', '💕', '💖', '✨', '🎉', '💗', '🩷', '🌸'];
const confettiColors = ['#ff6b9d', '#ff9a9e', '#fad0c4', '#ffecd2', '#a18cd1', '#fbc2eb', '#ff6b6b', '#ee5a6f'];

export default function Celebration({ onNext }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Launch confetti
    for (let i = 0; i < 100; i++) {
      setTimeout(() => {
        const piece = document.createElement('div');
        piece.className = 'confetti-piece';

        if (Math.random() > 0.4) {
          piece.textContent = confettiShapes[Math.floor(Math.random() * confettiShapes.length)];
          piece.style.fontSize = (10 + Math.random() * 18) + 'px';
        } else {
          piece.style.background = confettiColors[Math.floor(Math.random() * confettiColors.length)];
          piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '3px';
          piece.style.width = (6 + Math.random() * 12) + 'px';
          piece.style.height = (6 + Math.random() * 12) + 'px';
        }

        piece.style.left = Math.random() * 100 + '%';
        piece.style.animationDuration = (2.5 + Math.random() * 3) + 's';
        piece.style.animationDelay = (Math.random() * 0.5) + 's';
        container.appendChild(piece);

        setTimeout(() => piece.remove(), 6000);
      }, i * 40);
    }
  }, []);

  return (
    <div className="celebration-screen">
      <div className="confetti-layer" ref={containerRef} />

      <div className="celebration-content">
        <div className="celebration-emoji">🎉</div>
        <h1 className="celebration-title">She Said YES!</h1>
        <p className="celebration-text">
          I knew you would!
        </p>
        <p className="celebration-love">
          I love you, Orpita!
        </p>
        <div className="celebration-heart-row">
          💕 💖 💗 💖 💕
        </div>
        <p className="celebration-footer">
          You just made me the happiest person alive.<br />
          Happy Valentine's Day, my love!
        </p>
        <div className="celebration-names">
          <span>Rafin</span>
          <span className="celebration-amp">❤️</span>
          <span>Orpita</span>
        </div>
        <p className="celebration-forever">Forever & Always</p>
        <button className="celebration-btn" onClick={onNext}>
          See Our Memories 📸
        </button>
      </div>
    </div>
  );
}

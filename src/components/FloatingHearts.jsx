import { useEffect, useRef } from 'react';
import './FloatingHearts.css';

const hearts = ['💕', '💖', '💗', '💓', '❤️', '🩷', '♥', '🌸', '✨'];

export default function FloatingHearts() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const items = [];

    for (let i = 0; i < 25; i++) {
      const heart = document.createElement('div');
      heart.className = 'fh-heart';
      heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
      heart.style.left = Math.random() * 100 + '%';
      heart.style.animationDuration = (8 + Math.random() * 14) + 's';
      heart.style.animationDelay = (Math.random() * 12) + 's';
      heart.style.fontSize = (12 + Math.random() * 22) + 'px';
      container.appendChild(heart);
      items.push(heart);
    }

    return () => items.forEach(h => h.remove());
  }, []);

  return <div className="fh-container" ref={containerRef} />;
}

import { useState, useEffect, useCallback, useRef } from 'react';
import './GalleryScreen.css';

const photos = [
  { src: '/photos/1.jpg', caption: 'Our first moment together' },
  { src: '/photos/2.jpg', caption: 'My favorite smile' },
  { src: '/photos/3.jpg', caption: 'Us being us' },
  { src: '/photos/4.jpg', caption: 'That magical day' },
  { src: '/photos/5.jpg', caption: 'You make everything better' },
  { src: '/photos/6.jpg', caption: 'My whole world' },
  { src: '/photos/7.jpg', caption: 'Forever & always' },
];

export default function GalleryScreen({ onNext }) {
  const [active, setActive] = useState(0);
  const timerRef = useRef(null);

  const resetAutoplay = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActive(prev => (prev + 1) % photos.length);
    }, 2500);
  }, []);

  useEffect(() => {
    resetAutoplay();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [resetAutoplay]);

  const handleSelect = (i) => {
    setActive(i);
    resetAutoplay();
  };

  const getCardStyle = (i) => {
    const diff = i - active;
    const absDiff = Math.abs(diff);

    if (absDiff === 0) {
      return {
        transform: 'translateX(-50%) scale(1)',
        zIndex: 10,
        opacity: 1,
        filter: 'brightness(1)',
      };
    }

    const direction = diff > 0 ? 1 : -1;
    const isMobile = window.innerWidth <= 600;
    const gap = isMobile ? 80 : 120;
    const offset = direction * Math.min(absDiff, 3) * gap;
    const scale = Math.max(0.6, 1 - absDiff * 0.15);
    const rotateY = -direction * 35;
    const opacity = Math.max(0, 1 - absDiff * 0.3);

    return {
      transform: `translateX(calc(-50% + ${offset}px)) scale(${scale}) rotateY(${rotateY}deg)`,
      zIndex: 10 - absDiff,
      opacity,
      filter: `brightness(${Math.max(0.4, 1 - absDiff * 0.2)})`,
    };
  };

  return (
    <div className="gallery-screen">
      <h2 className="gallery-title">Our Moments Together</h2>
      <p className="gallery-sub">TAP TO BROWSE OUR MEMORIES</p>

      <div className="gallery-coverflow">
        {photos.map((item, i) => (
          <div
            key={i}
            className={`gallery-card ${i === active ? 'active' : ''}`}
            style={getCardStyle(i)}
            onClick={() => handleSelect(i)}
          >
            <img src={item.src} alt={item.caption} className="gallery-img" />
            <div className="gallery-overlay" />
          </div>
        ))}
      </div>

      <div className="gallery-dots">
        {photos.map((_, i) => (
          <button
            key={i}
            className={`gallery-dot ${i === active ? 'active' : ''}`}
            onClick={() => handleSelect(i)}
          />
        ))}
      </div>

      <p className="gallery-caption">{photos[active].caption}</p>

      {onNext && (
        <button className="gallery-btn" onClick={onNext}>
          Continue
        </button>
      )}
    </div>
  );
}

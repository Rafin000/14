import { useState, useEffect } from 'react';
import './Countdown.css';

const VALENTINE = new Date('2026-02-14T00:00:00');

function getTimeLeft() {
  const now = new Date();
  const diff = VALENTINE - now;

  if (diff <= 0) return null;

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function Countdown() {
  const [time, setTime] = useState(getTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!time) {
    return (
      <div className="countdown-screen">
        <div className="countdown-box">
          <div className="countdown-heart">💗</div>
          <h2 className="countdown-title">It's Valentine's Day!</h2>
          <p className="countdown-sub">Happy Valentine's Day, Orpita!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="countdown-screen">
      <div className="countdown-box">
        <div className="countdown-heart">💗</div>
        <h2 className="countdown-title">Until Valentine's Day</h2>

        <div className="countdown-units">
          <div className="countdown-unit">
            <span className="countdown-number">{time.days}</span>
            <span className="countdown-label">days</span>
          </div>
          <span className="countdown-sep">:</span>
          <div className="countdown-unit">
            <span className="countdown-number">{String(time.hours).padStart(2, '0')}</span>
            <span className="countdown-label">hours</span>
          </div>
          <span className="countdown-sep">:</span>
          <div className="countdown-unit">
            <span className="countdown-number">{String(time.minutes).padStart(2, '0')}</span>
            <span className="countdown-label">minutes</span>
          </div>
          <span className="countdown-sep">:</span>
          <div className="countdown-unit">
            <span className="countdown-number">{String(time.seconds).padStart(2, '0')}</span>
            <span className="countdown-label">seconds</span>
          </div>
        </div>

        <p className="countdown-footer">Rafin & Orpita</p>
      </div>
    </div>
  );
}

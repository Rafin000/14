import { useState } from 'react';
import './IntroScreen.css';

export default function IntroScreen({ onOpen }) {
  const [opening, setOpening] = useState(false);

  const handleOpen = () => {
    setOpening(true);
    setTimeout(() => onOpen(), 800);
  };

  return (
    <div className={`intro ${opening ? 'fade-out' : ''}`}>
      <div className="intro-envelope" onClick={handleOpen}>
        <div className="envelope-body">
          <div className="envelope-heart">💌</div>
        </div>
        <div className={`envelope-flap ${opening ? 'open' : ''}`} />
      </div>

      <p className="intro-small">i made something special for you</p>
      <h1 className="intro-name">For Orpita</h1>
      <p className="intro-from">- with all my love, Rafin</p>

      <button className="intro-btn" onClick={handleOpen}>
        Open
      </button>

      <div className="intro-footer">
        <span>Rafin</span>
        <span className="intro-heart-divider">❤️</span>
        <span>Orpita</span>
      </div>
    </div>
  );
}

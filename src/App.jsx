import { useState } from 'react';
import FloatingHearts from './components/FloatingHearts';
import SparkleTrail from './components/SparkleTrail';
import IntroScreen from './components/IntroScreen';
import MessageScreen from './components/MessageScreen';
import GalleryScreen from './components/GalleryScreen';
import ValentineAsk from './components/ValentineAsk';
import Celebration from './components/Celebration';
import PromiseWall from './components/PromiseWall';
import ThankYou from './components/ThankYou';
import LyricsOverlay from './components/LyricsOverlay';
import { startMusic } from './utils/musicGenerator';
import './App.css';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('intro');
  const [transitioning, setTransitioning] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const goTo = (screen) => {
    setTransitioning(true);
    setTimeout(() => {
      setCurrentScreen(screen);
      setTransitioning(false);
    }, 500);
  };

  const handleIntroOpen = () => {
    startMusic();
    setMusicPlaying(true);
    goTo('message');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'intro':
        return <IntroScreen onOpen={handleIntroOpen} />;
      case 'message':
        return <MessageScreen onNext={() => goTo('valentine')} />;
      case 'valentine':
        return <ValentineAsk onYes={() => goTo('celebration')} />;
      case 'celebration':
        return <Celebration onNext={() => goTo('gallery')} />;
      case 'gallery':
        return <GalleryScreen onNext={() => goTo('promises')} />;
      case 'promises':
        return <PromiseWall onNext={() => goTo('thankyou')} />;
      case 'thankyou':
        return <ThankYou />;
      default:
        return null;
    }
  };

  return (
    <div className="app">
      <FloatingHearts />
      <SparkleTrail />
      {musicPlaying && <LyricsOverlay />}

      <div className={`screen-wrapper ${transitioning ? 'fade-out' : 'fade-in'}`}>
        {renderScreen()}
      </div>
    </div>
  );
}

import './MusicToggle.css';

export default function MusicToggle({ playing, onToggle }) {
  return (
    <button className="music-toggle" onClick={onToggle} title="Toggle Music">
      {playing ? '🎵' : '🔇'}
    </button>
  );
}

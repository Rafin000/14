let audio = null;
let isPlaying = false;

export function startMusic() {
  if (isPlaying) return;

  audio = new Audio('/song.mp3');
  audio.loop = true;
  audio.volume = 0.8;

  audio.play().then(() => {
    isPlaying = true;
  }).catch(() => {
    audio = null;
    isPlaying = false;
  });
}

export function stopMusic() {
  isPlaying = false;
  if (audio) {
    audio.pause();
    audio.currentTime = 0;
    audio = null;
  }
}

export function isMusicPlaying() {
  return isPlaying;
}

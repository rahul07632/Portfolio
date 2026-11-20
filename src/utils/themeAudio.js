/**
 * Continuous Lo-Fi Background Music Engine
 * - Tracks:
 *    • Dark Theme: 'Memory Box' (Warm vintage piano melody, vinyl flutter)
 *    • Light Theme: 'Puddles' (Cozy acoustic rain keys, peaceful cafe chill)
 * - Mute / Unmute: 100% instant UI response & persistent user preference
 * - Theme crossfade: Smooth 1.2s fade between themes
 * - Gentle volume (~0.20) for comfortable long-term listening
 */

let darkAudio = null;
let lightAudio = null;
let isPlaying = false;
let userMuted = false;
let hasAttachedListener = false;
let currentTheme = 'dark';
let activeFadeInterval = null;
const TARGET_VOLUME = 0.22;
const listeners = new Set();

// Read initial user mute preference if saved
try {
  if (typeof window !== 'undefined') {
    userMuted = localStorage.getItem('rv_user_muted') === 'true';
  }
} catch {}

function notifyListeners() {
  listeners.forEach((fn) => {
    try {
      fn(isPlaying);
    } catch {}
  });
}

export function subscribeSoundState(fn) {
  listeners.add(fn);
  fn(isPlaying);
  return () => listeners.delete(fn);
}

function initAudioElements() {
  if (typeof window === 'undefined') return;
  if (!darkAudio) {
    darkAudio = new Audio('/audio/dark-theme.mp3');
    darkAudio.loop = true;
    darkAudio.volume = 0;
    darkAudio.preload = 'auto';
  }
  if (!lightAudio) {
    lightAudio = new Audio('/audio/light-theme.mp3');
    lightAudio.loop = true;
    lightAudio.volume = 0;
    lightAudio.preload = 'auto';
  }
}

function clearFade() {
  if (activeFadeInterval) {
    clearInterval(activeFadeInterval);
    activeFadeInterval = null;
  }
}

// Crossfade between two audio tracks
function crossfade(toTrack, fromTrack, durationMs = 1200) {
  clearFade();
  const steps = 20;
  const stepTime = durationMs / steps;
  let currentStep = 0;

  if (toTrack) {
    toTrack.play().catch(() => {});
  }

  activeFadeInterval = setInterval(() => {
    currentStep++;
    const progress = Math.min(1, currentStep / steps);

    if (toTrack) {
      toTrack.volume = Math.min(TARGET_VOLUME, progress * TARGET_VOLUME);
    }
    if (fromTrack) {
      fromTrack.volume = Math.max(0, (1 - progress) * TARGET_VOLUME);
    }

    if (progress >= 1) {
      clearFade();
      if (fromTrack) {
        fromTrack.pause();
        fromTrack.volume = 0;
      }
    }
  }, stepTime);
}

// Start playing music
export function startAmbientSound(theme = 'dark') {
  initAudioElements();
  currentTheme = theme;
  userMuted = false;
  try {
    localStorage.setItem('rv_user_muted', 'false');
  } catch {}

  const targetAudio = theme === 'light' ? lightAudio : darkAudio;
  const otherAudio = theme === 'light' ? darkAudio : lightAudio;

  if (!targetAudio) return;

  // Immediate state update for UI responsiveness
  isPlaying = true;
  notifyListeners();

  crossfade(targetAudio, otherAudio, 800);
}

// Stop / Mute background music instantly
export function stopAmbientSound() {
  clearFade();
  userMuted = true;
  try {
    localStorage.setItem('rv_user_muted', 'true');
  } catch {}

  // Immediate state update so UI switches to "Muted" with 0ms delay
  isPlaying = false;
  notifyListeners();

  if (darkAudio) {
    darkAudio.pause();
    darkAudio.volume = 0;
  }
  if (lightAudio) {
    lightAudio.pause();
    lightAudio.volume = 0;
  }
}

// Toggle Sound On / Off
export function toggleAmbientSound(theme) {
  if (isPlaying) {
    stopAmbientSound();
  } else {
    startAmbientSound(theme || currentTheme);
  }
}

// Switch music when theme changes
export function setAmbientTheme(newTheme) {
  currentTheme = newTheme;
  if (!isPlaying) return;

  initAudioElements();
  const toTrack = newTheme === 'light' ? lightAudio : darkAudio;
  const fromTrack = newTheme === 'light' ? darkAudio : lightAudio;

  crossfade(toTrack, fromTrack, 1200);
}

// Autostart on first user click or keypress (if not explicitly muted)
export function attachAutoplayListener(themeGetter) {
  if (typeof window === 'undefined' || hasAttachedListener) return;
  hasAttachedListener = true;

  const onFirstInteraction = (e) => {
    // Clean up event listeners after first interaction
    window.removeEventListener('click', onFirstInteraction);
    window.removeEventListener('keydown', onFirstInteraction);

    // If user clicked the sound button, that button's onClick handles it
    if (e?.target?.closest?.('#ambientSoundBtn')) return;

    // If user explicitly muted previously, respect their choice
    if (userMuted) return;

    const theme = typeof themeGetter === 'function' ? themeGetter() : 'dark';
    if (!isPlaying) {
      startAmbientSound(theme);
    }
  };

  window.addEventListener('click', onFirstInteraction, { once: true });
  window.addEventListener('keydown', onFirstInteraction, { once: true });
}

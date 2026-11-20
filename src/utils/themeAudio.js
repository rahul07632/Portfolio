/**
 * Infinite Generative Ambient Soundtrack Engine (Web Audio API)
 * - 0 KB Audio files, 100% synthesized in real-time
 * - Continuous playback: plays when visiting portfolio, adapts continuously to theme
 * - Dark Mode: Cinematic Cyber-Void Synthpad (Deep Dm9 ambient drone, warm LFO filter sweep)
 * - Light Mode: Radiant Atelier Daybreak Harmony (Warm Cmaj9 acoustic bell chimes & morning arpeggio)
 * - Seamless 1.2s crossfade between themes
 * - Browser Autoplay Compliant: starts on first click / keypress anywhere or via Sound button
 */

let audioCtx = null;
let masterGain = null;
let darkGain = null;
let lightGain = null;
let isPlaying = false;
let currentTheme = 'dark';
let activeOscillators = [];
let ambientTimer = null;
const listeners = new Set();

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

function getAudioContext() {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

// Setup the multi-bus routing
function setupAudioGraph() {
  const ctx = getAudioContext();
  if (!ctx) return;

  if (!masterGain) {
    masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.0001, ctx.currentTime);
    masterGain.connect(ctx.destination);
  }

  if (!darkGain) {
    darkGain = ctx.createGain();
    darkGain.gain.setValueAtTime(currentTheme === 'dark' ? 1 : 0, ctx.currentTime);
    darkGain.connect(masterGain);
  }

  if (!lightGain) {
    lightGain = ctx.createGain();
    lightGain.gain.setValueAtTime(currentTheme === 'light' ? 1 : 0, ctx.currentTime);
    lightGain.connect(masterGain);
  }
}

// 🌙 Dark Mode: Deep Cyber-Void Drone (Dm9: D2, A2, F3, C4, E4)
function startDarkGenerative() {
  const ctx = getAudioContext();
  if (!ctx || !darkGain) return;

  const freqs = [73.42, 110.0, 174.61, 261.63, 329.63]; // D2, A2, F3, C4, E4

  // Lowpass filter with slow breathing LFO
  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(280, ctx.currentTime);
  filter.Q.setValueAtTime(3.2, ctx.currentTime);
  filter.connect(darkGain);

  // LFO for filter breathing (slow 0.10 Hz cycle)
  const lfo = ctx.createOscillator();
  const lfoGain = ctx.createGain();
  lfo.type = 'sine';
  lfo.frequency.setValueAtTime(0.10, ctx.currentTime);
  lfoGain.gain.setValueAtTime(130, ctx.currentTime);
  lfo.connect(lfoGain);
  lfoGain.connect(filter.frequency);
  lfo.start();
  activeOscillators.push(lfo);

  freqs.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
    // Subtle detune for lush analog chorus effect
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    osc.detune.setValueAtTime((idx - 2) * 4, ctx.currentTime);

    const targetVol = idx === 0 ? 0.08 : 0.035;
    gain.gain.setValueAtTime(targetVol, ctx.currentTime);

    osc.connect(gain);
    gain.connect(filter);
    osc.start();
    activeOscillators.push(osc);
  });
}

// ☀️ Light Mode: Radiant Atelier Daybreak Harmony (Cmaj9 + wind chimes)
function scheduleLightChimes() {
  if (ambientTimer) {
    clearTimeout(ambientTimer);
    ambientTimer = null;
  }

  const chimeNotes = [523.25, 659.25, 783.99, 880.0, 1046.5, 1174.66]; // C5, E5, G5, A5, C6, D6

  function triggerNextChime() {
    if (!isPlaying) return;

    // Only synthesize chime if Light theme is active
    if (currentTheme === 'light' && lightGain && audioCtx) {
      const now = audioCtx.currentTime;
      const note = chimeNotes[Math.floor(Math.random() * chimeNotes.length)];

      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(note, now);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.035, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);

      osc.connect(gain);
      gain.connect(lightGain);

      osc.start(now);
      osc.stop(now + 1.9);
    }

    const nextDelay = 1600 + Math.random() * 2200;
    ambientTimer = setTimeout(triggerNextChime, nextDelay);
  }

  ambientTimer = setTimeout(triggerNextChime, 600);
}

function startLightGenerative() {
  const ctx = getAudioContext();
  if (!ctx || !lightGain) return;

  const baseFreqs = [130.81, 196.0, 329.63]; // C3, G3, E4 warm gentle bed
  baseFreqs.forEach((freq) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(0.03, ctx.currentTime);
    osc.connect(gain);
    gain.connect(lightGain);
    osc.start();
    activeOscillators.push(osc);
  });

  scheduleLightChimes();
}

// Start playing the continuous ambient soundtrack
export function startAmbientSound(initialTheme = 'dark') {
  currentTheme = initialTheme;
  const ctx = getAudioContext();
  if (!ctx || isPlaying) return;

  setupAudioGraph();

  // Clear any existing oscillators
  activeOscillators.forEach((osc) => {
    try {
      osc.stop();
      osc.disconnect();
    } catch {}
  });
  activeOscillators = [];

  // Set bus balance to current theme
  const now = ctx.currentTime;
  darkGain.gain.cancelScheduledValues(now);
  lightGain.gain.cancelScheduledValues(now);
  darkGain.gain.setValueAtTime(currentTheme === 'dark' ? 1.0 : 0.0, now);
  lightGain.gain.setValueAtTime(currentTheme === 'light' ? 1.0 : 0.0, now);

  startDarkGenerative();
  startLightGenerative();

  // Gentle master fade-in
  masterGain.gain.cancelScheduledValues(now);
  masterGain.gain.setValueAtTime(masterGain.gain.value || 0.0001, now);
  masterGain.gain.exponentialRampToValueAtTime(0.26, now + 1.2);

  isPlaying = true;
  notifyListeners();
}

// Stop / Mute the continuous ambient soundtrack
export function stopAmbientSound() {
  const ctx = getAudioContext();
  if (!ctx || !masterGain || !isPlaying) return;

  const now = ctx.currentTime;
  masterGain.gain.cancelScheduledValues(now);
  masterGain.gain.setValueAtTime(masterGain.gain.value, now);
  masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);

  if (ambientTimer) {
    clearTimeout(ambientTimer);
    ambientTimer = null;
  }

  setTimeout(() => {
    isPlaying = false;
    activeOscillators.forEach((osc) => {
      try {
        osc.stop();
        osc.disconnect();
      } catch {}
    });
    activeOscillators = [];
    notifyListeners();
  }, 650);
}

// Toggle Sound On / Off
export function toggleAmbientSound(theme) {
  if (isPlaying) {
    stopAmbientSound();
  } else {
    startAmbientSound(theme || currentTheme);
  }
}

// Smoothly crossfade soundtrack when switching theme
export function setAmbientTheme(newTheme) {
  currentTheme = newTheme;
  const ctx = getAudioContext();
  if (!ctx || !darkGain || !lightGain || !isPlaying) return;

  const now = ctx.currentTime;
  const fadeDuration = 1.2; // 1.2s smooth cinematic crossfade

  if (newTheme === 'dark') {
    darkGain.gain.cancelScheduledValues(now);
    lightGain.gain.cancelScheduledValues(now);

    darkGain.gain.setValueAtTime(darkGain.gain.value, now);
    darkGain.gain.linearRampToValueAtTime(1.0, now + fadeDuration);

    lightGain.gain.setValueAtTime(lightGain.gain.value, now);
    lightGain.gain.linearRampToValueAtTime(0.0, now + fadeDuration);
  } else {
    darkGain.gain.cancelScheduledValues(now);
    lightGain.gain.cancelScheduledValues(now);

    darkGain.gain.setValueAtTime(darkGain.gain.value, now);
    darkGain.gain.linearRampToValueAtTime(0.0, now + fadeDuration);

    lightGain.gain.setValueAtTime(lightGain.gain.value, now);
    lightGain.gain.linearRampToValueAtTime(1.0, now + fadeDuration);

    if (!ambientTimer) {
      scheduleLightChimes();
    }
  }
}

// Autostart on first user click or keypress anywhere on the page
export function attachAutoplayListener(themeGetter) {
  if (typeof window === 'undefined') return;

  const onFirstInteraction = (e) => {
    // If user clicked the mute/sound toggle button directly, let its onClick handle it
    if (e.target?.closest?.('#ambientSoundBtn')) {
      window.removeEventListener('click', onFirstInteraction);
      window.removeEventListener('keydown', onFirstInteraction);
      return;
    }

    window.removeEventListener('click', onFirstInteraction);
    window.removeEventListener('keydown', onFirstInteraction);

    const theme = typeof themeGetter === 'function' ? themeGetter() : 'dark';
    if (!isPlaying) {
      startAmbientSound(theme);
    }
  };

  window.addEventListener('click', onFirstInteraction, { once: true });
  window.addEventListener('keydown', onFirstInteraction, { once: true });
}

/**
 * Theme-Adaptive Interactive Sound Effects (SFX) Engine (Web Audio API)
 * - 100% Synthesized in real-time (0 KB audio files, 0ms lag)
 * - Automatically changes sound character based on active theme!
 *
 * 🌙 DARK MODE:
 *   • Hover: Futuristic Cyber-Arcade Laser Blip (8-bit sci-fi tech chirp)
 *   • Click: Cyber-Spring Punch / Sci-Fi Energy Coin Blip
 *
 * ☀️ LIGHT MODE:
 *   • Hover: Cute Funny Cartoon Bubble Pop / Water Droplet (cheerful cartoon bloop)
 *   • Click: Hilarious Cartoon Spring "Boing" / Rubber Squeak
 *
 * - Switch sound: Satisfying heavy mechanical switch / lamp cord "CLACK!"
 * - Global mute/unmute control from Navbar
 */

let sfxCtx = null;
let lastHoverTime = 0;
let sfxMuted = false;
let activeTheme = 'dark';
let bubbleStep = 0;

const LIGHT_SCALE = [523.25, 587.33, 659.25, 783.99, 880.0, 1046.5];
const DARK_CYBER_FREQS = [440, 554, 659, 880, 987, 1174];

try {
  if (typeof window !== 'undefined') {
    sfxMuted = localStorage.getItem('rv_sfx_muted') === 'true';
  }
} catch {}

const listeners = new Set();

function notifyListeners() {
  listeners.forEach((fn) => {
    try {
      fn(!sfxMuted);
    } catch {}
  });
}

export function subscribeSfxState(fn) {
  listeners.add(fn);
  fn(!sfxMuted);
  return () => listeners.delete(fn);
}

export function setSfxTheme(theme) {
  if (theme === 'dark' || theme === 'light') {
    activeTheme = theme;
  }
}

export function toggleSfx() {
  sfxMuted = !sfxMuted;
  try {
    localStorage.setItem('rv_sfx_muted', sfxMuted ? 'true' : 'false');
  } catch {}
  notifyListeners();
  if (!sfxMuted) {
    playClickSound();
  }
}

export function isSfxMuted() {
  return sfxMuted;
}

function getAudioContext() {
  if (typeof window === 'undefined') return null;
  if (!sfxCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      sfxCtx = new AudioContextClass();
    }
  }
  if (sfxCtx && sfxCtx.state === 'suspended') {
    sfxCtx.resume().catch(() => {});
  }
  return sfxCtx;
}

// 💡 Heavy Mechanical Light Switch / Pull-Cord "CLACK!"
export function playSwitchSound() {
  if (sfxMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const t = ctx.currentTime;

  // Sharp mechanical spring impact (high snap)
  const snap = ctx.createOscillator();
  const snapGain = ctx.createGain();
  snap.type = 'triangle';
  snap.frequency.setValueAtTime(2400, t);
  snap.frequency.exponentialRampToValueAtTime(300, t + 0.02);
  snapGain.gain.setValueAtTime(0.001, t);
  snapGain.gain.linearRampToValueAtTime(0.12, t + 0.003);
  snapGain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);

  // Heavy tactile body thump (low clack resonance)
  const thump = ctx.createOscillator();
  const thumpGain = ctx.createGain();
  thump.type = 'square';
  thump.frequency.setValueAtTime(180, t + 0.015);
  thump.frequency.exponentialRampToValueAtTime(70, t + 0.07);
  thumpGain.gain.setValueAtTime(0.001, t + 0.015);
  thumpGain.gain.linearRampToValueAtTime(0.09, t + 0.022);
  thumpGain.gain.exponentialRampToValueAtTime(0.001, t + 0.09);

  snap.connect(snapGain);
  snapGain.connect(ctx.destination);
  thump.connect(thumpGain);
  thumpGain.connect(ctx.destination);

  snap.start(t);
  snap.stop(t + 0.05);
  thump.start(t + 0.015);
  thump.stop(t + 0.1);
}

// 🎛️ Theme-Adaptive Hover Sound
export function playHoverSound() {
  if (sfxMuted) return;
  const now = Date.now();
  if (now - lastHoverTime < 60) return;
  lastHoverTime = now;

  const ctx = getAudioContext();
  if (!ctx) return;

  const t = ctx.currentTime;

  if (activeTheme === 'dark') {
    // 🌙 Dark Mode: Sci-Fi Cyber-Arcade Laser Blip
    const freq = DARK_CYBER_FREQS[bubbleStep % DARK_CYBER_FREQS.length];
    bubbleStep++;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(freq * 1.4, t);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.7, t + 0.035);

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(2200, t);
    filter.Q.setValueAtTime(4.0, t);

    gain.gain.setValueAtTime(0.001, t);
    gain.gain.linearRampToValueAtTime(0.045, t + 0.006);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(t);
    osc.stop(t + 0.045);
  } else {
    // ☀️ Light Mode: Cute Funny Cartoon Bubble Pop / Waterdrop
    const freq = LIGHT_SCALE[bubbleStep % LIGHT_SCALE.length];
    bubbleStep++;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq * 0.85, t);
    osc.frequency.exponentialRampToValueAtTime(freq * 1.35, t + 0.035);

    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.linearRampToValueAtTime(0.05, t + 0.006);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.045);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(t);
    osc.stop(t + 0.05);
  }
}

// 🔘 Theme-Adaptive Click Sound
export function playClickSound() {
  if (sfxMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const t = ctx.currentTime;

  if (activeTheme === 'dark') {
    // 🌙 Dark Mode: Cyber Punch / Retro 8-bit Power Ding
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();

    osc1.type = 'square';
    osc1.frequency.setValueAtTime(880, t);
    osc1.frequency.setValueAtTime(1320, t + 0.03);

    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(440, t);
    osc2.frequency.setValueAtTime(660, t + 0.03);

    gain.gain.setValueAtTime(0.001, t);
    gain.gain.linearRampToValueAtTime(0.07, t + 0.008);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(ctx.destination);

    osc1.start(t);
    osc1.stop(t + 0.13);
    osc2.start(t);
    osc2.stop(t + 0.13);
  } else {
    // ☀️ Light Mode: Hilarious Cartoon Spring "Boing"
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(320, t);
    osc.frequency.exponentialRampToValueAtTime(900, t + 0.06);
    osc.frequency.linearRampToValueAtTime(620, t + 0.09);
    osc.frequency.linearRampToValueAtTime(820, t + 0.13);

    gain.gain.setValueAtTime(0.001, t);
    gain.gain.linearRampToValueAtTime(0.09, t + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.16);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(t);
    osc.stop(t + 0.17);
  }
}

// 🌓 Sci-Fi Theme Switch Sound
export function playThemeSwitchSound(newTheme) {
  setSfxTheme(newTheme);
  if (sfxMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const t = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  if (newTheme === 'dark') {
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(740, t);
    osc.frequency.exponentialRampToValueAtTime(220, t + 0.18);
    gain.gain.setValueAtTime(0.05, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
  } else {
    osc.type = 'sine';
    osc.frequency.setValueAtTime(392, t);
    osc.frequency.exponentialRampToValueAtTime(880, t + 0.18);
    gain.gain.setValueAtTime(0.06, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
  }

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(t);
  osc.stop(t + 0.22);
}

// Global Event Listeners for Automatic Hover & Click Sounds on interactive elements
export function attachGlobalSfxListeners() {
  if (typeof window === 'undefined') return () => {};

  const interactiveSelector =
    'button, a, [role="button"], input, textarea, select, .atelier-card, .nav-pill-btn, .magnetic-btn, .social-icon-btn, .interactive-input';

  const handleMouseOver = (e) => {
    if (e.target?.closest?.(interactiveSelector)) {
      playHoverSound();
    }
  };

  const handleMouseDown = (e) => {
    if (e.target?.closest?.(interactiveSelector)) {
      playClickSound();
    }
  };

  document.addEventListener('mouseover', handleMouseOver, { passive: true });
  document.addEventListener('mousedown', handleMouseDown, { passive: true });

  return () => {
    document.removeEventListener('mouseover', handleMouseOver);
    document.removeEventListener('mousedown', handleMouseDown);
  };
}

/**
 * Theme Audio Synthesizer (Web Audio API)
 * Zero external audio files, 0ms latency, zero bandwidth overhead.
 * - Dark Mode: Deep futuristic Cyber-Void Warp (atmospheric descending resonance)
 * - Light Mode: Crisp uplifting Daybreak Prism Chime (sparkling harmonic bell tones)
 */

let audioCtx = null;

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

export function playThemeSound(targetTheme) {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    if (targetTheme === 'dark') {
      // ==========================================
      // DARK MODE: Futuristic Cyber-Void Warp Drop
      // ==========================================
      const master = ctx.createGain();
      master.gain.setValueAtTime(0.001, now);
      master.gain.exponentialRampToValueAtTime(0.12, now + 0.03);
      master.gain.exponentialRampToValueAtTime(0.0001, now + 0.55);
      master.connect(ctx.destination);

      // Deep Sub-Bass Sweep (220Hz -> 65Hz)
      const osc1 = ctx.createOscillator();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(220, now);
      osc1.frequency.exponentialRampToValueAtTime(65, now + 0.45);

      // Low-pass filter for warm analog warmth
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(450, now);
      filter.frequency.exponentialRampToValueAtTime(120, now + 0.45);

      osc1.connect(filter);
      filter.connect(master);

      // Subtle Cyber Overtone (Chirp)
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(440, now);
      osc2.frequency.exponentialRampToValueAtTime(110, now + 0.35);
      gain2.gain.setValueAtTime(0.04, now);
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

      osc2.connect(gain2);
      gain2.connect(master);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.55);
      osc2.stop(now + 0.35);

    } else {
      // ==========================================
      // LIGHT MODE: Crisp Daybreak Glass Chime
      // ==========================================
      const master = ctx.createGain();
      master.gain.setValueAtTime(0.001, now);
      master.gain.exponentialRampToValueAtTime(0.09, now + 0.015);
      master.gain.exponentialRampToValueAtTime(0.0001, now + 0.48);
      master.connect(ctx.destination);

      // Sparkling Two-Tone Glass Harmonic (A5 880Hz -> E6 1318Hz)
      const notes = [
        { freq: 880, start: 0, duration: 0.35, gain: 0.07 },
        { freq: 1318.5, start: 0.05, duration: 0.42, gain: 0.06 },
        { freq: 1760, start: 0.1, duration: 0.35, gain: 0.03 }
      ];

      notes.forEach(({ freq, start, duration, gain }) => {
        const osc = ctx.createOscillator();
        const noteGain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + start);

        noteGain.gain.setValueAtTime(0.001, now + start);
        noteGain.gain.exponentialRampToValueAtTime(gain, now + start + 0.015);
        noteGain.gain.exponentialRampToValueAtTime(0.0001, now + start + duration);

        osc.connect(noteGain);
        noteGain.connect(master);

        osc.start(now + start);
        osc.stop(now + start + duration + 0.05);
      });
    }
  } catch (err) {
    // Audio is a delightful enhancement; fail silently if user blocked audio
    console.debug('Theme audio hint:', err);
  }
}

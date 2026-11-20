// Background music removed completely as per user preference (Only fun interactive SFX used)
export function startAmbientSound() {}
export function stopAmbientSound() {}
export function toggleAmbientSound() {}
export function setAmbientTheme() {}
export function subscribeSoundState(fn) {
  if (typeof fn === 'function') fn(false);
  return () => {};
}
export function attachAutoplayListener() {}

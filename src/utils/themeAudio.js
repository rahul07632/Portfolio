// Sound disabled as per user preference (clean, silent, distraction-free portfolio)
export function playThemeSound() {}
export function startAmbientSound() {}
export function stopAmbientSound() {}
export function toggleAmbientSound() {}
export function setAmbientTheme() {}
export function subscribeSoundState(fn) {
  if (typeof fn === 'function') fn(false);
  return () => {};
}
export function attachAutoplayListener() {}

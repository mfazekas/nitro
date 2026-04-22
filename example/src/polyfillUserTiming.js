// Polyfill performance.measure and console.timeStamp BEFORE React loads
// to enable supportsUserTiming in ReactFabric-dev.js (same as Expo environment)
// This must be the FIRST import in the app entry point.
if (typeof console.timeStamp !== 'function') {
  console.timeStamp = () => {}
}
if (typeof performance !== 'undefined' && typeof performance.measure !== 'function') {
  performance.measure = () => {}
}

// Polyfill performance.measure and console.timeStamp BEFORE React loads.
// This enables `supportsUserTiming` in ReactFabric-dev.js, which activates
// React's logComponentRender profiling — the code path that triggers
// the dispose crash (addObjectDiffToProperties deeply diffs old vs new props).
// Expo has these APIs natively, so this polyfill simulates the Expo environment.
require('./src/polyfillUserTiming')

const { AppRegistry } = require('react-native')
const { default: App } = require('./src/App')
const { name: appName } = require('./app.json')

AppRegistry.registerComponent(appName, () => App)

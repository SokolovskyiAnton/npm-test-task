const { configure } = require('quasar/wrappers');

module.exports = configure(function (/* ctx */) {
  return {
    eslint: {
      warnings: true,
      errors: true,
    },
    boot: ['axios'],
    css: ['app.styl'],
    extras: [
      'roboto-font', // optional, you are not bound to it
      'material-icons', // optional, you are not bound to it
    ],
    build: {
      target: {
        browser: ['es2019', 'edge88', 'firefox78', 'chrome87', 'safari13.1'],
        node: 'node16',
      },
      vueRouterMode: 'history', // available values: 'hash', 'history'
      env: {
        ...require('dotenv').config().parsed,
      },
    },
    devServer: {
      open: true, // opens browser window automatically
    },
    framework: {
      config: {},
      plugins: ['Notify', 'Dialog', 'Loading'],
    },
    animations: [],
    ssr: {
      pwa: false,
      prodPort: 3000, // The default port that the production server should use
      middlewares: [
        'render', // keep this as last one
      ],
    },
    pwa: {
      workboxMode: 'generateSW', // or 'injectManifest'
      injectPwaMetaTags: true,
      swFilename: 'sw.js',
      manifestFilename: 'manifest.json',
      useCredentialsForManifestTag: false,
    },
    cordova: {},
    capacitor: {
      hideSplashscreen: true,
    },
    electron: {
      inspectPort: 5858,
      bundler: 'packager', // 'packager' or 'builder'
      packager: {},

      builder: {
        appId: 'test-project-v1',
      },
    },
    bex: {
      contentScripts: ['my-content-script'],
    },
  };
});

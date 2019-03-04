/**
 * Check out https://googlechromelabs.github.io/sw-toolbox/ for
 * more info on how to use sw-toolbox to custom configure your service worker.
 */


'use strict';
importScripts('./build/sw-toolbox.js');
importScripts('https://www.gstatic.com/firebasejs/4.9.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.9.0/firebase-messaging.js');

self.toolbox.options.cache = {
  name: 'ionic-cache'
};

// pre-cache our key assets
self.toolbox.precache(
  [
    './build/main.js',
    './build/vendor.js',
    './build/main.css',
    './build/polyfills.js',
    'index.html',
    'manifest.json'
  ]
);

// dynamically cache any other local assets
self.toolbox.router.any('/*', self.toolbox.fastest);

// for any other requests go to the network, cache,
// and then only use that cached resource if your user goes offline
self.toolbox.router.default = self.toolbox.networkFirst;

firebase.initializeApp({
  // get this from Firebase console, Cloud messaging section
  'messagingSenderId': 'AAAA02LXmfA:APA91bENwBwoPaEIgg1F1t0uLfIBkaDZHa_hezqO73gV9NjLipzEllnMA1HD1Pa6WTJ1wisu8mPV33uN8EOPYXtNmH3G2CB9ap3-qQpjbe-4-hFnYdSfmsVUq0CLWkBlM3oCb7LjutFe'
});
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
  console.log('Received background message ', payload);
  // here you can override some options describing what's in the message;
  // however, the actual content will come from the Webtask
  const notificationOptions = {
    icon: '/assets/images/logo-128.png'
  };
  return self.registration.showNotification(notificationTitle, notificationOptions);
});

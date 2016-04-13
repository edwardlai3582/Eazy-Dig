importScripts('./serviceworker-cache-polyfill.js');


var staticCacheName = 'eazyDig-static-v0';
var contentImgsCache = 'eazyDig-content-imgs';
var allCaches = [
  staticCacheName,
  contentImgsCache
];
//////////////////////////////////////////////////////
var idbDatabase;
var IDB_VERSION = 1;
var STOP_RETRYING_AFTER = 86400000; // One day, in milliseconds.
var STORE_NAME = 'urls';

// This is basic boilerplate for interacting with IndexedDB. Adapted from
// https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB
function openDatabaseAndReplayRequests() {
  var indexedDBOpenRequest = indexedDB.open('offline-analytics', IDB_VERSION);

  // This top-level error handler will be invoked any time there's an IndexedDB-related error.
  indexedDBOpenRequest.onerror = function(error) {
    console.error('IndexedDB error:', error);
  };

  // This should only execute if there's a need to create a new database for the given IDB_VERSION.
  indexedDBOpenRequest.onupgradeneeded = function() {
    this.result.createObjectStore(STORE_NAME, {keyPath: 'url'});
  };

  // This will execute each time the database is opened.
  indexedDBOpenRequest.onsuccess = function() {
    idbDatabase = this.result;
    //replayAnalyticsRequests();
  };
}

// Helper method to get the object store that we care about.
function getObjectStore(storeName, mode) {
  return idbDatabase.transaction(storeName, mode).objectStore(storeName);
}

//////////////////////////////////////////////////////
self.addEventListener('install', function(event) {
    var urlsToCache = [
        '/',
        'bootstrap.min.css',
        'bundle.js',
        'style.css',
        '/fonts/glyphicons-halflings-regular.eot',
        '/fonts/glyphicons-halflings-regular.svg',
        '/fonts/glyphicons-halflings-regular.ttf',
        '/fonts/glyphicons-halflings-regular.woff',
        '/fonts/glyphicons-halflings-regular.woff2'
    ];
    
    event.waitUntil(
        caches.open(staticCacheName).then(function(cache){
            return cache.addAll(urlsToCache);
        })
    );
});

openDatabaseAndReplayRequests();

self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.filter(function(cacheName) {
                    //return cacheName.startsWith('eazyDig') && cacheName != staticCacheName;
                    return cacheName.startsWith('eazyDig') && !allCaches.includes(cacheName);
                }).map(function(cacheName) {
                    return caches.delete(cacheName);
                })
            );
        })
    );
});

self.addEventListener('fetch', function(event) {
    var requestUrl = new URL(event.request.url);
    //console.log(requestUrl);
    
    if (requestUrl.hostname === 'api-img.discogs.com') {
      event.respondWith(servePhoto(event.request));
      return;
    }
    
    if (requestUrl.hostname === 'edwardlai3582.com') {
      event.respondWith(serveEdward(event.request));
      return;
    }
    
    event.respondWith(
        caches.match(event.request).then(function(response) {
            if (response) {
                return response;
            }
            return fetch(event.request);
        })    
    );
});

function serveEdward(request) {
    console.log('SERVE EDWARD');
    var storageUrl = request.url;//.replace(/-\d+px\.jpg$/, '');
    
    return fetch(request).then(function(networkResponse) {
        ///*
        var response2 = networkResponse.clone();
        //response2.json().then(function(myJson) {
        getObjectStore(STORE_NAME, 'readwrite').add({
            url: storageUrl,
            result: response2
        });
        //*/
        console.log(networkResponse);
        console.log('============================')
        return networkResponse;
    });

}


function servePhoto(request) {
    console.log('SERVE PHOTO');
  var storageUrl = request.url;//.replace(/-\d+px\.jpg$/, '');

  return caches.open(contentImgsCache).then(function(cache) {
    return cache.match(storageUrl).then(function(response) {
      if (response) return response;

      return fetch(request).then(function(networkResponse) {
        cache.put(storageUrl, networkResponse.clone());
        return networkResponse;
      });
    });
  });
}

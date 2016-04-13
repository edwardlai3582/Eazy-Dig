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
      //event.respondWith(serveEdward(event.request));
      serveQuery(event);    
      return;
    }
    
    event.respondWith(
        caches.open(staticCacheName).then(function(cache) {
            return cache.match(event.request.url).then(function(response) {
                if (response) return response;

                return fetch(event.request).then(function(networkResponse) {
                    cache.put(event.request.url, networkResponse.clone());
                    return networkResponse;
                });
            });
        })
    );
});

function serveQuery(ne) {
    console.log('SERVE QUERY:'+ ne.request.url);
    var storageUrl = ne.request.url;
    
    getObjectStore(STORE_NAME, 'readwrite').get(storageUrl).onsuccess = function(event) {
        if(event.target.result){
            console.log('found in db');
            var json = JSON.stringify(event.target.result.result);
            var myBlob = new Blob([json], {type: "application/json"});
            var init = { "status" : 200 , "statusText" : "response from SW" };
            var myResponse = new Response(myBlob,init);

            //ne.respondWith(myResponse);
            return myResponse;
        }
        else{
            console.log('not in db so fetch');
            fetch(ne.request).then(function(networkResponse) {
                var response2 = networkResponse.clone();
                if(response2.ok){
                    response2.json().then(function(myJson) {
                        getObjectStore(STORE_NAME, 'readwrite').add({
                            url: storageUrl,
                            result: myJson
                        });
                    });    
                }

                //ne.respondWith(networkResponse);
                return networkResponse;
            });            
        }

    }; 
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


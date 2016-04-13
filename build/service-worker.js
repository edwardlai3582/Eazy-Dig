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
/*
// This sample illustrates an aggressive approach to caching, in which every valid response is
// cached and every request is first checked against the cache.
// This may not be an appropriate approach if your web application makes requests for
// arbitrary URLs as part of its normal operation (e.g. a RSS client or a news aggregator),
// as the cache could end up containing large responses that might not end up ever being accessed.
// Other approaches, like selectively caching based on response headers or only caching
// responses served from a specific domain, might be more appropriate for those use cases.
self.addEventListener('fetch', function(event) {
  console.log('Handling fetch event for', event.request.url);

  event.respondWith(
    caches.open(CURRENT_CACHES['offline-analytics']).then(function(cache) {
      return cache.match(event.request).then(function(response) {
        if (response) {
          // If there is an entry in the cache for event.request, then response will be defined
          // and we can just return it.
          console.log(' Found response in cache:', response);

          return response;
        }

        // Otherwise, if there is no entry in the cache for event.request, response will be
        // undefined, and we need to fetch() the resource.
        console.log(' No response for %s found in cache. ' +
          'About to fetch from network...', event.request.url);

        // We call .clone() on the request since we might use it in the call to cache.put() later on.
        // Both fetch() and cache.put() "consume" the request, so we need to make a copy.
        // (see https://fetch.spec.whatwg.org/#dom-request-clone)
        return fetch(event.request.clone()).then(function(response) {
          console.log('  Response for %s from network is: %O',
            event.request.url, response);

          // Optional: add in extra conditions here, e.g. response.type == 'basic' to only cache
          // responses from the same domain. See https://fetch.spec.whatwg.org/#concept-response-type
          if (response.status < 400) {
            // This avoids caching responses that we know are errors (i.e. HTTP status code of 4xx or 5xx).
            // One limitation is that, for non-CORS requests, we get back a filtered opaque response
            // (https://fetch.spec.whatwg.org/#concept-filtered-response-opaque) which will always have a
            // .status of 0, regardless of whether the underlying HTTP call was successful. Since we're
            // blindly caching those opaque responses, we run the risk of caching a transient error response.
            //
            // We need to call .clone() on the response object to save a copy of it to the cache.
            // (https://fetch.spec.whatwg.org/#dom-request-clone)
            cache.put(event.request, response.clone());
          } else if (response.status >= 500) {
            // If this is a Google Analytics ping then we want to retry it if a HTTP 5xx response
            // was returned, just like we'd retry it if the network was down.
            checkForAnalyticsRequest(event.request.url);
          }

          // Return the original response object, which will be used to fulfill the resource request.
          return response;
        }).catch(function(error) {
          // The catch() will be triggered for network failures. Let's see if it was a request for
          // a Google Analytics ping, and save it to be retried if it was.
          checkForAnalyticsRequest(event.request.url);

          throw error;
        });
      }).catch(function(error) {
        // This catch() will handle exceptions that arise from the match() or fetch() operations.
        // Note that a HTTP error response (e.g. 404) will NOT trigger an exception.
        // It will return a normal response object that has the appropriate error code set.
        throw error;
      });
    })
  );
});

function checkForAnalyticsRequest(requestUrl) {
  // Construct a URL object (https://developer.mozilla.org/en-US/docs/Web/API/URL.URL)
  // to make it easier to check the various components without dealing with string parsing.
  var url = new URL(requestUrl);

  if ((url.hostname === 'www.google-analytics.com' ||
       url.hostname === 'ssl.google-analytics.com') &&
       url.pathname === '/collect') {
    console.log('  Storing Google Analytics request in IndexedDB ' +
      'to be replayed later.');
    saveAnalyticsRequest(requestUrl);
  }
}

function saveAnalyticsRequest(requestUrl) {
  getObjectStore(STORE_NAME, 'readwrite').add({
    url: requestUrl,
    timestamp: Date.now()
  });
}
*/
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


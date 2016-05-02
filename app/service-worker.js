import './serviceworker-cache-polyfill'
import idb from './idb';


var staticCacheName = 'eazyDig-static-v7';
var contentImgsCache = 'eazyDig-content-imgs';
var contentAudiosCache = 'eazyDig-content-audios';
var allCaches = [
  staticCacheName,
  contentImgsCache,
  contentAudiosCache    
];

function openDatabase() {
  return idb.open('eazyDig', 3, function(upgradeDb) {
            switch (upgradeDb.oldVersion) {
                case 0:
                    upgradeDb.createObjectStore('urls', {
                        keyPath: 'url'
                    });
                case 1:
                    var store=upgradeDb.createObjectStore('history', { 
                                keyPath: "timestamp"
                            });
                    store.createIndex('by-time', 'timestamp');
                    
                case 2:
                    var store=upgradeDb.createObjectStore('fav', { 
                                keyPath: "id"
                            });
                    store.createIndex('by-name', 'chosen_title');      
            }
        });
}


self.addEventListener('install', function(event) {
    var urlsToCache = [
        '/',
        'bundle.js',
        'style.css',
    ];
    
    //skipWainting
    if (self.skipWaiting) { self.skipWaiting(); }
    
    event.waitUntil(
        caches.open(staticCacheName).then(function(cache){
            return cache.addAll(urlsToCache);
        })
    );
});

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
    
    if (requestUrl.hostname === 'api-img.discogs.com' || (event.request.url.indexOf("whosampled.com") !== -1) || event.request.url.indexOf("yelpcdn") !== -1) {
      event.respondWith(servePhoto(event.request));
      return;
    }
    ///*
    //not work for gh-pages
    else if ( event.request.url.indexOf("mp3-preview") !== -1 || requestUrl.hostname === 'api.spotify.com' )  {
      //event.respondWith(serveSpotify(event.request));
      return;
    }
    //*/
    //|| requestUrl.hostname === 'thawing-savannah-20177.herokuapp.com'
    else if (requestUrl.hostname === 'edwardlai3582.com' || requestUrl.hostname === 'whosampled-illl48.c9users.io' || requestUrl.hostname === 'api.discogs.com') {
      serveQuery(event);    
      return;
    }
    else{
        event.respondWith(
            caches.open(staticCacheName).then(function(cache) {

                //console.log('DAMN:'+event.request.url);
                return cache.match(event.request.url).then(function(response) {
                    if (response) return response;

                    return fetch(event.request).then(function(networkResponse) {
                        cache.put(event.request.url, networkResponse.clone());
                        return networkResponse;
                    });
                });
            })
        );    
    }
    
});

function serveQuery(ne) {
    //console.log('SERVE QUERY:'+ ne.request.url);
    var storageUrl = ne.request.url;

    ne.respondWith(
    openDatabase().then(function(db){
        var index = db.transaction('urls').objectStore('urls');
        
        return index.get(storageUrl).then(function(result){
            if(result){
                //console.log('result= '+result);
                var json = JSON.stringify(result.result);
                var myBlob = new Blob([json], {type: "application/json"});
                var init = { "status" : 200 , "statusText" : "DAMNok" };
                var myResponse = new Response(myBlob,init);
                
                return myResponse;
            }
            else{
                //console.log('result= 0');
                //console.log(ne.request.url);
                
                return fetch(ne.request).then(function(networkResponse) {
                    var response2 = networkResponse.clone();
                    if(response2.ok){
                        response2.json().then(function(myJson) {
                            if(myJson==='error'){
                                console.log('get error from fetch '+storageUrl);
                                return;
                            }
                            
                            openDatabase().then(function(db){
                                db.transaction('urls', 'readwrite').objectStore('urls').add({
                                    url: storageUrl,
                                    result: myJson
                                });
                            });
                        });    
                    }

                    return networkResponse;
                }); 
                
            }
        });
    })
    );
    
}

function servePhoto(request) {
    //console.log('SERVE PHOTO:' + request.url);
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

function serveSpotify(request) {
    //console.log('SERVE SPOTIFY:' + request.url);
  var storageUrl = request.url;

  return caches.open(contentAudiosCache).then(function(cache) {
    return cache.match(storageUrl).then(function(response) {
      if (response) return response;

      return fetch(request).then(function(networkResponse) {
        cache.put(storageUrl, networkResponse.clone());
        return networkResponse;
      });
    });
  });
}
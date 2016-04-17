//importScripts('./serviceworker-cache-polyfill.js');
import './serviceworker-cache-polyfill'
import idb from './idb';


var staticCacheName = 'eazyDig-static-v0';
var contentImgsCache = 'eazyDig-content-imgs';
var allCaches = [
  staticCacheName,
  contentImgsCache
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
    
    if (requestUrl.hostname === 'api-img.discogs.com' || requestUrl.hostname === 'whosampled.com') {
      event.respondWith(servePhoto(event.request));
      return;
    }
    else if (requestUrl.hostname === 'edwardlai3582.com') {
      //event.respondWith(serveQuery(event));
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
    console.log('SERVE QUERY:'+ ne.request.url);
    var storageUrl = ne.request.url;

    ne.respondWith(
    openDatabase().then(function(db){
        var index = db.transaction('urls').objectStore('urls');
        
        return index.get(storageUrl).then(function(result){
            if(result){
                console.log('result= '+result);
                var json = JSON.stringify(result.result);
                var myBlob = new Blob([json], {type: "application/json"});
                var init = { "status" : 200 , "statusText" : "DAMNok" };
                var myResponse = new Response(myBlob,init);
                
                return myResponse;
            }
            else{
                console.log('result= 0');
                console.log(ne.request.url);
                
                return fetch(ne.request).then(function(networkResponse) {
                    var response2 = networkResponse.clone();
                    if(response2.ok){
                        response2.json().then(function(myJson) {
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


const APP_PREFIX = 'track-my-expenses_';   
const VERSION = 'version_01';
const CACHE_NAME = APP_PREFIX + VERSION;

console.log("service worker loading")


//can only add files under public directory, or addAll() will fail
const FILES_TO_CACHE = [
    "./index.html",
    "./js/index.js",
    "./js/idb.js",
    "./icons/icon-72x72.png",
];

self.addEventListener('install', function (e) {
    e.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
          console.log('installing cache : ' + CACHE_NAME)
          return cache.addAll(FILES_TO_CACHE)
        })
    )
})

self.addEventListener('activate', function(e){
    e.waitUntil(
      caches.keys().then(function(keylist){ 
        let cacheKeeplist = keylist.filter(function(key){
          return key.indexOf(APP_PREFIX) 
        })

        cacheKeeplist.push(CACHE_NAME)
  

        return Promise.all(keyList.map(function (key, i) { 
          if (cacheKeeplist.indexOf(key) === -1) { 
            console.log('deleting cache : ' + keyList[i] );
            return caches.delete(keyList[i]); 
          }
        }));
    })
    )
})

self.addEventListener('fetch', function (e) {
    console.log('fetch request : ' + e.request.url)
  
    e.respondWith( 
        caches.match(e.request).then(function (request) {
          if (request) { 
            console.log('responding with cache : ' + e.request.url)
            return request
          } else {  
            console.log('file is not cached, fetching : ' + e.request.url)
            return fetch(e.request)
        }

        })
    )
})
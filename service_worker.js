!function(t){function e(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return t[r].call(o.exports,o,o.exports,e),o.loaded=!0,o.exports}var n={};return e.m=t,e.c=n,e.p="",e(0)}({0:function(t,e,n){(function(t){"use strict";function e(t){return t&&t.__esModule?t:{"default":t}}function r(){return u["default"].open("eazyDig",3,function(t){switch(t.oldVersion){case 0:t.createObjectStore("urls",{keyPath:"url"});case 1:var e=t.createObjectStore("history",{keyPath:"timestamp"});e.createIndex("by-time","timestamp");case 2:var e=t.createObjectStore("fav",{keyPath:"id"});e.createIndex("by-name","chosen_title")}})}function o(e){var n=e.request.url;e.respondWith(r().then(function(o){var i=o.transaction("urls").objectStore("urls");return i.get(n).then(function(o){if(o){var i=JSON.stringify(o.result),s=new Blob([i],{type:"application/json"}),u={status:200,statusText:"DAMNok"},a=new Response(s,u);return a}return t(e.request).then(function(t){var e=t.clone();return e.ok&&e.json().then(function(t){return"error"===t?void console.log("get error from fetch "+n):void r().then(function(e){e.transaction("urls","readwrite").objectStore("urls").add({url:n,result:t})})}),t})})}))}function i(e){var n=e.url;return caches.open(c).then(function(r){return r.match(n).then(function(o){return o?o:t(e).then(function(t){return r.put(n,t.clone()),t})})})}n(287);var s=n(56),u=e(s),a="eazyDig-static-v0",c="eazyDig-content-imgs",h="eazyDig-content-audios",f=[a,c,h];self.addEventListener("install",function(t){var e=["/","bundle.js","style.css"];t.waitUntil(caches.open(a).then(function(t){return t.addAll(e)}))}),self.addEventListener("activate",function(t){t.waitUntil(caches.keys().then(function(t){return Promise.all(t.filter(function(t){return t.startsWith("eazyDig")&&!f.includes(t)}).map(function(t){return caches["delete"](t)}))}))}),self.addEventListener("fetch",function(e){var n=new URL(e.request.url);if("api-img.discogs.com"===n.hostname||-1!==e.request.url.indexOf("whosampled.com"))return void e.respondWith(i(e.request));if(-1===e.request.url.indexOf("mp3-preview")&&"api.spotify.com"!==n.hostname)return"edwardlai3582.com"===n.hostname||"whosampled-illl48.c9users.io"===n.hostname||"api.discogs.com"===n.hostname?void o(e):void e.respondWith(caches.open(a).then(function(n){return n.match(e.request.url).then(function(r){return r?r:t(e.request).then(function(t){return n.put(e.request.url,t.clone()),t})})}))})}).call(e,n(28))},28:function(t,e){(function(e){(function(){!function(t){"use strict";function e(t){if("string"!=typeof t&&(t=String(t)),/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(t))throw new TypeError("Invalid character in header field name");return t.toLowerCase()}function n(t){return"string"!=typeof t&&(t=String(t)),t}function r(t){this.map={},t instanceof r?t.forEach(function(t,e){this.append(e,t)},this):t&&Object.getOwnPropertyNames(t).forEach(function(e){this.append(e,t[e])},this)}function o(t){return t.bodyUsed?Promise.reject(new TypeError("Already read")):void(t.bodyUsed=!0)}function i(t){return new Promise(function(e,n){t.onload=function(){e(t.result)},t.onerror=function(){n(t.error)}})}function s(t){var e=new FileReader;return e.readAsArrayBuffer(t),i(e)}function u(t){var e=new FileReader;return e.readAsText(t),i(e)}function a(){return this.bodyUsed=!1,this._initBody=function(t){if(this._bodyInit=t,"string"==typeof t)this._bodyText=t;else if(l.blob&&Blob.prototype.isPrototypeOf(t))this._bodyBlob=t;else if(l.formData&&FormData.prototype.isPrototypeOf(t))this._bodyFormData=t;else if(t){if(!l.arrayBuffer||!ArrayBuffer.prototype.isPrototypeOf(t))throw new Error("unsupported BodyInit type")}else this._bodyText="";this.headers.get("content-type")||("string"==typeof t?this.headers.set("content-type","text/plain;charset=UTF-8"):this._bodyBlob&&this._bodyBlob.type&&this.headers.set("content-type",this._bodyBlob.type))},l.blob?(this.blob=function(){var t=o(this);if(t)return t;if(this._bodyBlob)return Promise.resolve(this._bodyBlob);if(this._bodyFormData)throw new Error("could not read FormData body as blob");return Promise.resolve(new Blob([this._bodyText]))},this.arrayBuffer=function(){return this.blob().then(s)},this.text=function(){var t=o(this);if(t)return t;if(this._bodyBlob)return u(this._bodyBlob);if(this._bodyFormData)throw new Error("could not read FormData body as text");return Promise.resolve(this._bodyText)}):this.text=function(){var t=o(this);return t?t:Promise.resolve(this._bodyText)},l.formData&&(this.formData=function(){return this.text().then(f)}),this.json=function(){return this.text().then(JSON.parse)},this}function c(t){var e=t.toUpperCase();return y.indexOf(e)>-1?e:t}function h(t,e){e=e||{};var n=e.body;if(h.prototype.isPrototypeOf(t)){if(t.bodyUsed)throw new TypeError("Already read");this.url=t.url,this.credentials=t.credentials,e.headers||(this.headers=new r(t.headers)),this.method=t.method,this.mode=t.mode,n||(n=t._bodyInit,t.bodyUsed=!0)}else this.url=t;if(this.credentials=e.credentials||this.credentials||"omit",!e.headers&&this.headers||(this.headers=new r(e.headers)),this.method=c(e.method||this.method||"GET"),this.mode=e.mode||this.mode||null,this.referrer=null,("GET"===this.method||"HEAD"===this.method)&&n)throw new TypeError("Body not allowed for GET or HEAD requests");this._initBody(n)}function f(t){var e=new FormData;return t.trim().split("&").forEach(function(t){if(t){var n=t.split("="),r=n.shift().replace(/\+/g," "),o=n.join("=").replace(/\+/g," ");e.append(decodeURIComponent(r),decodeURIComponent(o))}}),e}function p(t){var e=new r,n=t.getAllResponseHeaders().trim().split("\n");return n.forEach(function(t){var n=t.trim().split(":"),r=n.shift().trim(),o=n.join(":").trim();e.append(r,o)}),e}function d(t,e){e||(e={}),this.type="default",this.status=e.status,this.ok=this.status>=200&&this.status<300,this.statusText=e.statusText,this.headers=e.headers instanceof r?e.headers:new r(e.headers),this.url=e.url||"",this._initBody(t)}if(!t.fetch){r.prototype.append=function(t,r){t=e(t),r=n(r);var o=this.map[t];o||(o=[],this.map[t]=o),o.push(r)},r.prototype["delete"]=function(t){delete this.map[e(t)]},r.prototype.get=function(t){var n=this.map[e(t)];return n?n[0]:null},r.prototype.getAll=function(t){return this.map[e(t)]||[]},r.prototype.has=function(t){return this.map.hasOwnProperty(e(t))},r.prototype.set=function(t,r){this.map[e(t)]=[n(r)]},r.prototype.forEach=function(t,e){Object.getOwnPropertyNames(this.map).forEach(function(n){this.map[n].forEach(function(r){t.call(e,r,n,this)},this)},this)};var l={blob:"FileReader"in t&&"Blob"in t&&function(){try{return new Blob,!0}catch(t){return!1}}(),formData:"FormData"in t,arrayBuffer:"ArrayBuffer"in t},y=["DELETE","GET","HEAD","OPTIONS","POST","PUT"];h.prototype.clone=function(){return new h(this)},a.call(h.prototype),a.call(d.prototype),d.prototype.clone=function(){return new d(this._bodyInit,{status:this.status,statusText:this.statusText,headers:new r(this.headers),url:this.url})},d.error=function(){var t=new d(null,{status:0,statusText:""});return t.type="error",t};var m=[301,302,303,307,308];d.redirect=function(t,e){if(-1===m.indexOf(e))throw new RangeError("Invalid status code");return new d(null,{status:e,headers:{location:t}})},t.Headers=r,t.Request=h,t.Response=d,t.fetch=function(t,e){return new Promise(function(n,r){function o(){return"responseURL"in s?s.responseURL:/^X-Request-URL:/m.test(s.getAllResponseHeaders())?s.getResponseHeader("X-Request-URL"):void 0}var i;i=h.prototype.isPrototypeOf(t)&&!e?t:new h(t,e);var s=new XMLHttpRequest;s.onload=function(){var t=1223===s.status?204:s.status;if(100>t||t>599)return void r(new TypeError("Network request failed"));var e={status:t,statusText:s.statusText,headers:p(s),url:o()},i="response"in s?s.response:s.responseText;n(new d(i,e))},s.onerror=function(){r(new TypeError("Network request failed"))},s.open(i.method,i.url,!0),"include"===i.credentials&&(s.withCredentials=!0),"responseType"in s&&l.blob&&(s.responseType="blob"),i.headers.forEach(function(t,e){s.setRequestHeader(e,t)}),s.send("undefined"==typeof i._bodyInit?null:i._bodyInit)})},t.fetch.polyfill=!0}}("undefined"!=typeof self?self:this),t.exports=e.fetch}).call(e)}).call(e,function(){return this}())},56:function(t,e,n){"use strict";!function(){function e(t){return Array.prototype.slice.call(t)}function n(t){return new Promise(function(e,n){t.onsuccess=function(){e(t.result)},t.onerror=function(){n(t.error)}})}function r(t,e,r){var o,i=new Promise(function(i,s){o=t[e].apply(t,r),n(o).then(i,s)});return i.request=o,i}function o(t,e,n){var o=r(t,e,n);return o.then(function(t){return t?new h(t,o.request):void 0})}function i(t,e,n){n.forEach(function(n){Object.defineProperty(t.prototype,n,{get:function(){return this[e][n]}})})}function s(t,e,n,o){o.forEach(function(o){o in n.prototype&&(t.prototype[o]=function(){return r(this[e],o,arguments)})})}function u(t,e,n,r){r.forEach(function(r){r in n.prototype&&(t.prototype[r]=function(){return this[e][r].apply(this[e],arguments)})})}function a(t,e,n,r){r.forEach(function(r){r in n.prototype&&(t.prototype[r]=function(){return o(this[e],r,arguments)})})}function c(t){this._index=t}function h(t,e){this._cursor=t,this._request=e}function f(t){this._store=t}function p(t){this._tx=t,this.complete=new Promise(function(e,n){t.oncomplete=function(){e()},t.onerror=function(){n(t.error)}})}function d(t,e,n){this._db=t,this.oldVersion=e,this.transaction=new p(n)}function l(t){this._db=t}i(c,"_index",["name","keyPath","multiEntry","unique"]),s(c,"_index",IDBIndex,["get","getKey","getAll","getAllKeys","count"]),a(c,"_index",IDBIndex,["openCursor","openKeyCursor"]),i(h,"_cursor",["direction","key","primaryKey","value"]),s(h,"_cursor",IDBCursor,["update","delete"]),["advance","continue","continuePrimaryKey"].forEach(function(t){t in IDBCursor.prototype&&(h.prototype[t]=function(){var e=this,r=arguments;return Promise.resolve().then(function(){return e._cursor[t].apply(e._cursor,r),n(e._request).then(function(t){return t?new h(t,e._request):void 0})})})}),f.prototype.createIndex=function(){return new c(this._store.createIndex.apply(this._store,arguments))},f.prototype.index=function(){return new c(this._store.index.apply(this._store,arguments))},i(f,"_store",["name","keyPath","indexNames","autoIncrement"]),s(f,"_store",IDBObjectStore,["put","add","delete","clear","get","getAll","getAllKeys","count"]),a(f,"_store",IDBObjectStore,["openCursor","openKeyCursor"]),u(f,"_store",IDBObjectStore,["deleteIndex"]),p.prototype.objectStore=function(){return new f(this._tx.objectStore.apply(this._tx,arguments))},i(p,"_tx",["objectStoreNames","mode"]),u(p,"_tx",IDBTransaction,["abort"]),d.prototype.createObjectStore=function(){return new f(this._db.createObjectStore.apply(this._db,arguments))},i(d,"_db",["name","version","objectStoreNames"]),u(d,"_db",IDBDatabase,["deleteObjectStore","close"]),l.prototype.transaction=function(){return new p(this._db.transaction.apply(this._db,arguments))},i(l,"_db",["name","version","objectStoreNames"]),u(l,"_db",IDBDatabase,["close"]),["openCursor","openKeyCursor"].forEach(function(t){[f,c].forEach(function(n){n.prototype[t.replace("open","iterate")]=function(){var n=e(arguments),r=n[n.length-1],o=(this._store||this._index)[t].apply(this._store,n.slice(0,-1));o.onsuccess=function(){r(o.result)}}})}),[c,f].forEach(function(t){t.prototype.getAll||(t.prototype.getAll=function(t,e){var n=this,r=[];return new Promise(function(o){n.iterateCursor(t,function(t){return t?(r.push(t.value),void 0!==e&&r.length==e?void o(r):void t["continue"]()):void o(r)})})})});var y={open:function(t,e,n){var o=r(indexedDB,"open",[t,e]),i=o.request;return i.onupgradeneeded=function(t){n&&n(new d(i.result,t.oldVersion,i.transaction))},o.then(function(t){return new l(t)})},"delete":function(t){return r(indexedDB,"deleteDatabase",[t])}};t.exports=y}()},287:function(t,e,n){(function(t){"use strict";Cache.prototype.add||(Cache.prototype.add=function(t){return this.addAll([t])}),Cache.prototype.addAll||(Cache.prototype.addAll=function(e){function n(t){this.name="NetworkError",this.code=19,this.message=t}var r=this;return n.prototype=Object.create(Error.prototype),Promise.resolve().then(function(){if(arguments.length<1)throw new TypeError;return e=e.map(function(t){return t instanceof Request?t:String(t)}),Promise.all(e.map(function(e){"string"==typeof e&&(e=new Request(e));var r=new URL(e.url).protocol;if("http:"!==r&&"https:"!==r)throw new n("Invalid scheme");return t(e.clone())}))}).then(function(t){return Promise.all(t.map(function(t,n){return r.put(e[n],t)}))}).then(function(){})}),CacheStorage.prototype.match||(CacheStorage.prototype.match=function(t,e){var n=this;return this.keys().then(function(r){var o;return r.reduce(function(r,i){return r.then(function(){return o||n.open(i).then(function(n){return n.match(t,e)}).then(function(t){return o=t})})},Promise.resolve())})})}).call(e,n(28))}});
const cache_assets ='assets';
const dinamicCache = 'dinamic';

const cache_messages = 'messages';
let assets = ['/', 
'/index.html', 
'/css/estilos.css', 
'/css/cards.css',
'/css/avatars_icons.css',
'/assets/img/boy_avatar.png',
'/assets/img/defaultProfile.png',
'/assets/img/girl_avatar.png',
'index.js'];
//console.log({ self });
self.addEventListener('install', (ev) => {
    //service worker is installed.
    console.log('installed');
    ev.waitUntil(
      caches.open(cache_assets).then((cache) => {
        cache.addAll(assets).then(
          () => {
            //addAll == fetch() + put()
            console.log(`${cache_assets} has been updated`);
          },
          (err) => {
            console.warn(`failed to update ${cache_assets}.`);
          }
        );
      })
    );
  });
  self.addEventListener('activate', (ev) => {
    //service worker is activated
    console.log('activated');
  });
  
  self.addEventListener('fetch', (ev) => {
    //service worker intercepted a fetch call
    console.log('intercepted a http request', ev.request);
  });
  
  self.addEventListener('message', async (ev) => {
    let data = ev.data;
    console.log(ev.data);
    //let main_content =data.new_messages;
   
  });
import { search_question, 
  preguntas, 
  db, 
  delete_options, 
  message_format_builder, 
  user_avatar,
  loading,
  normal_message,
  user_info
 } from "./js/functions.js";
import { set, get } from "https://cdn.jsdelivr.net/npm/idb-keyval@6/+esm";

const startbtn = document.getElementById('start');
const APP = {
    SW: null,
    DB: null, //TODO:
    init() {
      APP.write_bd();
      //APP.registerSW();
      
    },
    registerSW() {
      if ('serviceWorker' in navigator) {
        // Register a service worker hosted at the root of the site
        navigator.serviceWorker.register('/SW.js').then(
          (registration) => {
            APP.SW =
              registration.installing ||
              registration.waiting ||
              registration.active;
          },
          (error) => {
            console.log('Service worker registration failed:', error);
          }
        );
        //listen for the latest sw
        navigator.serviceWorker.addEventListener('controllerchange', async () => {
          APP.SW = navigator.serviceWorker.controller;
        });
        //listen for messages from the service worker
        navigator.serviceWorker.addEventListener('message', APP.onMessage);
      } else {
        console.log('Service workers are not supported.');
      }
    },
    write_bd(){
      var i = 1;
      for (let pregunta of preguntas){
        set(i.toString(),pregunta,db)
        .then(console.log('question '+i+' written'))
        .catch(console.warn);
        i++;
      }
    },
    openDB() {
      let req = indexedDB.open('kiri');
      req.onsuccess = (ev) => {
        APP.DB = ev.target.result;
        APP.write_bd();
        console.log('bd connected');
       
      };
      req.onerror = (err) => {
        console.warn();
      };
    },
    async test(num){
      var interval;
      if (num <19){
       search_question(num);
        interval =setInterval(() => {
         get(num.toString(),db).then((data) =>{ 
                        if( data.respuesta_u != 0){
                          num++;
                          APP.test(num);
                          clearInterval(interval);
                        }
                      })
                      .catch(console.warn());
       }, 4000);
      } else {
        alert('You have completed the test!');
        
        clearInterval(interval);
      }
    }
  };
  
  window.addEventListener('load', (e) => {
 
   // createStore('Kiri','Perfil');
    APP.init();
    //
    startbtn.addEventListener('click', async()=>{
      startbtn.remove()
      normal_message('Hola..?',user_avatar);

      setTimeout(()=>{
        normal_message('Hola!', 'kiri')
        
      },2000)
      setTimeout(()=>{
        user_info();
     
      },4000)
    })
    //APP.test(1);
    

});

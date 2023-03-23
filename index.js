import { search_question, preguntas, db, main } from "./js/functions.js";
import { set, createStore } from "https://cdn.jsdelivr.net/npm/idb-keyval@6/+esm";
const APP = {
    SW: null,
    DB: null, //TODO:
    init() {
      
      APP.registerSW();
      
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
        .then(alert('question '+i+' written'))
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
      //1- call search question with a starting number obviously 1
      if (num <3){
       search_question(num);
       main.addEventListener('change', () =>{
        num++;
        APP.test(num);
       })
       
      } else {
        alert('You have completed the test!');
      }
    }
  };
  
  window.addEventListener('load', (e) => {
 
    alert('I am here');
   // createStore('Kiri','Perfil');
    APP.init();
    APP.test(1);
    

});

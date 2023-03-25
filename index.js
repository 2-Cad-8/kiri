import { search_question, 
  preguntas, 
  db, 
  user_avatar,
  normal_message,
  user_info,
  user,
  user_asnwer_options,
  doubts,
  doubtsDB,
  userDB
 } from "./js/functions.js";
import { set, get } from "https://cdn.jsdelivr.net/npm/idb-keyval@6/+esm";

const dudas_btns = ['¿Qué es un test?',
'¿Cómo funciona?',
'¿Dónde puedo ver los resultados?',
'¿Puedo volver a hacer el test?'
]
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
      set('user_info',user,userDB)
        .then(console.log('userdb created'))
        .catch(console.warn);
      var i = 1;
      for (let pregunta of preguntas){ //wrinting questions of the test
        set(i.toString(),pregunta,db)
        .then(console.log('question '+i+' written'))
        .catch(console.warn);
        i++;
      }
      i =1;
      for (let doubt of doubts){//writing doubts
        set(doubt.duda,doubt,doubtsDB)
        .then(console.log('duda '+i+' written'))
        .catch(console.warn);
        i++;
      }
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
        //options to ask for what is kiri
        user_asnwer_options(1,'¿Qué eres?','doubt');
        var interval = setInterval(() => {
          get('¿Qué eres?',doubtsDB).then((data)=>{
            if(data.estado){
              clearInterval(interval);
              setTimeout(() => {
                user_info();
              }, 2000);
              
            }
          }).catch(console.warn)
        }, 2000);
     
      },5000)

      var interval = setInterval(()=>{
        get('user_info',userDB).then((data)=>{
          if(data.name != ''){
            clearInterval(interval);
            setTimeout(() => {
              user_asnwer_options(4,dudas_btns,'doubt');
            }, 2000);
            
          }
        }).catch(console.warn)
      }, 2000)
    })
    //APP.test(1);
    

});

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
  userDB,
  calc_results,
  keys,
  profileDB,
  profiles,
  retake_test_flag
 } from "./js/functions.js";
import { set, get,  } from "https://cdn.jsdelivr.net/npm/idb-keyval@6/+esm";


const dudas_btns = ['¿Qué es un test?',
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
      var i = 1;
      for (let profile of profiles){ //wrinting profiles of the test
        set(profile.clave,profile,profileDB)
        .then(console.log('Profiles written'))
        .catch(console.warn);
        i++;
      }
    },
    dudas_preTest(){
      var interval;
        if(dudas_btns.length === 0){
          clearInterval(interval);
          //escribir codigo de instrucciones para comenzar el test 'instrucciones_test'
          //Let's modify the como funciona question for 'instrucciones'
          //so instead of go as a doubt, go here and explain the test
          get('instrucciones_test',doubtsDB).then((data)=>{
            normal_message(data.respuesta,'kiri');
            data.estado = true;
            set('instrucciones_test',data,doubtsDB).then(console.log('upadates isntructions state')).catch(console.warn);
            
            setTimeout(() => {
              var answer = user_asnwer_options(2,['Si','No'],'test');
             
            },2000);
            
            var interval = setInterval(() => {
              get('advertencia', doubtsDB).then((data) => {
                 if(data.estado){
                    clearInterval(interval);
                    setTimeout(() =>{
                      APP.test(1);
                    },2000)
                 }
              }).catch(console.warn)
              
            }, 2000);
          }).catch(console.warn);
          //ask to the user if they are ready
           //if so start the test else wait
        } else{
            setTimeout(() => {
              user_asnwer_options(1,dudas_btns[0],'doubt');
              interval = setInterval(() => {
                get(dudas_btns[0],doubtsDB).then((d) =>{
                  if (d.estado){
                    clearInterval(interval);
                    dudas_btns.shift();
                    setTimeout(() =>{APP.dudas_preTest();}, 1500)
                  }
                }).catch(console.warn)
              }, 2000);
            }, 2000)
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
       
        clearInterval(interval);
        calc_results(keys);
  
        setTimeout(() => {
          normal_message('¡Hemos terminado!','kiri');
          setTimeout(() => {
            var clave_temp= ['',{
              nombre:'',
              definicion: '',
              carreras: ''
            },
            {
              nombre:'',
              definicion: '',
              carreras: ''
            },
            {
              nombre:'',
              definicion: '',
              carreras: ''
            }];
            //add claves
            var interval =setInterval(() => {
            get('user_info',userDB).then((data)=>{
              //clave y nombres
              clave_temp[0] = data.resultados[0].clave +data.resultados[1].clave  + data.resultados[2].clave 
              clave_temp[1].nombre = data.resultados[0].nombre_perfil;
              clave_temp[2].nombre = data.resultados[1].nombre_perfil;
              clave_temp[3].nombre = data.resultados[2].nombre_perfil;
              //descripcion
              clave_temp[1].definicion = data.resultados[0].descripcion;
              clave_temp[2].definicion = data.resultados[1].descripcion;
              clave_temp[3].definicion = data.resultados[2].descripcion;
              //carreras
              clave_temp[1].carreras = data.resultados[0].carreras;
              clave_temp[2].carreras = data.resultados[1].carreras;
              clave_temp[3].carreras = data.resultados[2].carreras;
            })
            //reducing careers
          /*  for(let i = 1; i <4; i++){
              clave_temp[i].carreras = clave_temp[i].carreras.split(',');
              
            }*/
            //name of claves
            
                if(clave_temp[0] !=''){
                  clearInterval(interval);
                  var claves_perfil_nombre = 'Tienes una clave: '+ clave_temp[0] +', es decir tienes características de los perfiles de: '+ clave_temp[1].nombre+ ', '+clave_temp[2].nombre+ ', '+clave_temp[3].nombre; 
                  normal_message(claves_perfil_nombre,'kiri');
      
                  //message 3
                  setTimeout(() => {
                    var resultado_1_def = 'Tu perfil principal es '+ clave_temp[1].nombre+' es decir: '+ clave_temp[1].definicion;
                    var resultado_1_car = 'por lo que carreras como '+ clave_temp[1].carreras+', y otras similares serían de gran disfrute para ti'; 
                    normal_message(resultado_1_def,'kiri');
                    normal_message(resultado_1_car,'kiri');
                    //message 4
                    setTimeout(() => {
                      var resultado_2_def = 'adicional cuentas con un segundo perfil: '+ clave_temp[2].nombre+': '+ clave_temp[2].definicion;
                      var resultado_2_car = 'este perfil tiene afinidad con carreras como: '+ clave_temp[2].carreras+', y otras similares.'; 
                      normal_message(resultado_2_def,'kiri');
                      normal_message(resultado_2_car,'kiri');
                      //message 5
                      setTimeout(() => {
                        var resultado_3_def = 'Por ultimo también cuentas con un perfil '+ clave_temp[3].nombre+': '+ clave_temp[3].definicion;
                        var resultado_3_car = 'este perfil tiene afinidad con carreras como: '+ clave_temp[3].carreras+', y otras similares.'; 
                        normal_message(resultado_3_def,'kiri');
                        normal_message(resultado_3_car,'kiri');
                        //message 6
                        setTimeout(() => {
                          var message_6 = 'Recuerda que siempre puedes volver a hacer el test, sin embargo te recomiendo siempre consultar a un profesional en el área si tienes la posibilidad, ellos te permitirán profundizar en tus metas y tu visión a futuro.'
                          normal_message(message_6,'kiri');
                         
                          //Message 7
                          setTimeout(() => {
                            var message_7 = 'Ahora en tu perfil encontraras mas información. Si quieres repetir el test puedes decirme, pero recuerda que tus datos serán eliminados.'
                            normal_message(message_7,'kiri');
                            setTimeout(() => {
                              user_asnwer_options(1,'Quiero hacer el test de nuevo.','retake');
                              var interval = setInterval(() => {
                                if(retake_test_flag){
                                  clearInterval(interval);
                                  APP.retake_test();
                                }
                              }, 2000);
                              
                            },4000)
                            
                          }, 9000);
                        }, 8500);
      
                      }, 6500);
                    }, 4500);
                  }, 2000);
                }
            }, 1000);
           
          }, 2000);
        }, 2000); 
      }
    },
    retake_test(){
      /* We need an interval that checkes the flag until it become true and then
        first we need to clean the data base re write the results of the user
        and clean the answer from questions, only then we can call the test function
      */
        var i = 1;
          for (let pregunta of preguntas){ //wrinting questions of the test
            set(i.toString(),pregunta,db)
            .then(console.log('question '+i+' written'))
            .catch(console.warn);
            i++;
          }
          user.resultados_pKey=[];
          user.resultados = [{},{},{}];
          for(let i = 0; i<6; i++){
            keys[i].puntaje = 0;
          }
          var interval2 = setInterval(() => {
            if(keys[0].puntaje == 0){
              clearInterval(interval2);
              get('user_info',userDB).then((data) =>{
                data.resultados = user.resultados;
                data.resultados_pKey = user.resultados_pKey;
                set('user_info', data, userDB).then('updated successfully');
              })
              setTimeout(APP.test(1),4000);
            }
          }, 2000);
       
    }
  
  }//end of APP
  window.addEventListener('load', (e) => {
 
   
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
            APP.dudas_preTest();
            
          }
        }).catch(console.warn)
      }, 2000)
    })
    

});

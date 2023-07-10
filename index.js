
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
  retake_test_flag,
  main,
  update_msgs,
  change_all_avatars,
 } from "./js/functions.js";
import { set, get,  } from "./js/idb-keyval/dist/compat.js";


const dudas_btns = ['¿Qué es un test?',
'¿Dónde puedo ver los resultados?',
'¿Puedo volver a hacer el test?'
]
const startbtn = document.getElementById('start');
const icono_profile = document.getElementById('iconoP');
var link = document.getElementById('profile_link');
const loader = document.querySelector('.center'); 
const APP = {
    SW: null,
    DB: null, //TODO:
    file: null,
    response: null,
    init() {
      
      APP.registerSW();
      
    },
    registerSW() {
      if ('serviceWorker' in navigator) {
        // 1. Register a service worker hosted at the root of the
        // site using the default scope.
        navigator.serviceWorker
          .register('/sw.js', {
            scope: '/',
          })
          .then((registration) => {
            APP.SW =
              registration.installing ||
              registration.waiting ||
              registration.active;
            console.log('service worker registered');
          });
        // 2. See if the page is currently has a service worker.
        if (navigator.serviceWorker.controller) {
          console.log('we have a service worker installed');
        }
  
        // 3. Register a handler to detect when a new or
        // updated service worker is installed & activate.
        navigator.serviceWorker.oncontrollerchange = (ev) => {
          console.log('New service worker activated');
        };
  
        // 4. remove/unregister service workers
        // navigator.serviceWorker.getRegistrations().then((regs) => {
        //   for (let reg of regs) {
        //     reg.unregister().then((isUnreg) => console.log(isUnreg));
        //   }
        // });
        // 5. Listen for messages from the service worker
      } else {
        console.log('Service workers are not supported.');
      }
    },
    write_bd(){
      set('user_info',user,userDB)
        .then(console.log('userdb created'))
        .catch(console.warn);
      set('msgs', '', userDB)
      .then('mensajes cache created')
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
            
            setTimeout(async () => {
             await update_msgs('save_msg','dudas');
             user_asnwer_options(2,['Si','No'],'test');
             
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
    show_results(){
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
        //reducing the definition
        for(let i = 1; i<4; i++){
          var temp_num;
          var temp_newText;
          temp_num = clave_temp[i].definicion.indexOf('.');
          temp_newText = clave_temp[i].definicion.substring(0,temp_num);
          clave_temp[i].definicion =temp_newText;
        }
        //name of claves
        
            if(clave_temp[0] !=''){
              clearInterval(interval);
              var claves_perfil_nombre = 'Tienes una clave: '+ clave_temp[0] +', es decir tienes características de los perfiles de: '+ clave_temp[1].nombre+ ', '+clave_temp[2].nombre+ ', '+clave_temp[3].nombre; 
              normal_message(claves_perfil_nombre,'kiri');
  
              //message 3
              setTimeout(() => {
                var resultado_1_def = 'Tu perfil principal es '+ clave_temp[1].nombre+' es decir: '+ clave_temp[1].definicion;
                var resultado_1_car = 'por lo que carreras como '+ clave_temp[1].carreras[0]+', '+clave_temp[1].carreras[1]+', '+clave_temp[1].carreras[2]+', y otras similares serían de gran disfrute para ti'; 
                normal_message(resultado_1_def,'kiri');
                normal_message(resultado_1_car,'kiri');
                //message 4
                setTimeout(() => {
                  var resultado_2_def = 'adicional cuentas con un segundo perfil: '+ clave_temp[2].nombre+': '+ clave_temp[2].definicion;
                  var resultado_2_car = 'este perfil tiene afinidad con carreras como: '+ clave_temp[2].carreras[0]+', '+clave_temp[2].carreras[1]+', '+clave_temp[2].carreras[2]+', y otras similares.'; 
                  normal_message(resultado_2_def,'kiri');
                  normal_message(resultado_2_car,'kiri');
                  //message 5
                  setTimeout(() => {
                    var resultado_3_def = 'Por ultimo también cuentas con un perfil '+ clave_temp[3].nombre+': '+ clave_temp[3].definicion;
                    var resultado_3_car = 'este perfil tiene afinidad con carreras como: '+ clave_temp[3].carreras[0]+', '+clave_temp[3].carreras[1]+', '+clave_temp[3].carreras[2]+', y otras similares.'; 
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
                        update_msgs('save_msg','results');
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
     } ,
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
        update_msgs('save_msg','test_done');
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
            //reducing the definition
            for(let i = 1; i<4; i++){
              var temp_num;
              var temp_newText;
              temp_num = clave_temp[i].definicion.indexOf('.');
              temp_newText = clave_temp[i].definicion.substring(0,temp_num);
              clave_temp[i].definicion =temp_newText;
            }
            //name of claves
            
                if(clave_temp[0] !=''){
                  clearInterval(interval);
                  var claves_perfil_nombre = 'Tienes una clave: '+ clave_temp[0] +', es decir tienes características de los perfiles de: '+ clave_temp[1].nombre+ ', '+clave_temp[2].nombre+ ', '+clave_temp[3].nombre; 
                  normal_message(claves_perfil_nombre,'kiri');
      
                  //message 3
                  setTimeout(() => {
                    var resultado_1_def = 'Tu perfil principal es '+ clave_temp[1].nombre+' es decir: '+ clave_temp[1].definicion;
                    var resultado_1_car = 'por lo que carreras como '+ clave_temp[1].carreras[0]+', '+clave_temp[1].carreras[1]+', '+clave_temp[1].carreras[2]+', y otras similares serían de gran disfrute para ti'; 
                    normal_message(resultado_1_def,'kiri');
                    normal_message(resultado_1_car,'kiri');
                    //message 4
                    setTimeout(() => {
                      var resultado_2_def = 'adicional cuentas con un segundo perfil: '+ clave_temp[2].nombre+': '+ clave_temp[2].definicion;
                      var resultado_2_car = 'este perfil tiene afinidad con carreras como: '+ clave_temp[2].carreras[0]+', '+clave_temp[2].carreras[1]+', '+clave_temp[2].carreras[2]+', y otras similares.'; 
                      normal_message(resultado_2_def,'kiri');
                      normal_message(resultado_2_car,'kiri');
                      //message 5
                      setTimeout(() => {
                        var resultado_3_def = 'Por ultimo también cuentas con un perfil '+ clave_temp[3].nombre+': '+ clave_temp[3].definicion;
                        var resultado_3_car = 'este perfil tiene afinidad con carreras como: '+ clave_temp[3].carreras[0]+', '+clave_temp[3].carreras[1]+', '+clave_temp[3].carreras[2]+', y otras similares.'; 
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
                            update_msgs('save_msg','results');
                            
                            setTimeout(() => {
                              user_asnwer_options(1,'Quiero hacer el test de nuevo.','retake');
                              var interval = setInterval(() => {
                                if(retake_test_flag){
                                  clearInterval(interval);
                                  APP.retake_test();
                                }
                            }, 2500); 
                              
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
       
    },
    send_message(msg){
      if (navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage(msg);
      }
    },
    onMessage({ data }) {
      //got a message from the service worker
      console.log('Web page receiving', data);
    },
  
    
  }//end of APP
  
  window.addEventListener('load', (e) => {
    APP.init();
    
    setTimeout(() => {
      loader.style.opacity = 0;
      loader.style.zIndex = -1
      }, 2100);
    get('msgs',userDB).then(async (response)=>{
      
      if(response != undefined){
       
        await update_msgs('update_chat'); //retrieve messages
        ///////////////////////////////////////////////////chage icon profile
        await get('user_info', userDB).then((data)=>{
          if(data.sexo == 'femUser'){
            icono_profile.className = 'eicon-fem-user';
            link.href = 'profile.html';
           change_all_avatars('eicon-fem-user');
                     
          }else{
            icono_profile.className = 'eicon-male-user';
            link.href = 'profile.html';
            change_all_avatars('eicon-male-user');
          }
          console.log(document.getElementsByTagName('span'))
        });
        ////////////////////////////////////////////////// retaking process
        
        //checkpoints control
        switch(response.completed_part){
          case 'user_info':
            await window.scrollBy(0, main.scrollHeight);
             APP.dudas_preTest();
            break;
          case 'dudas':
            //guardar mensajes antes del si no y llamarlo aqui para esperar
            //check if the user said yes, if so don't show buttons else you do
            window.scrollBy(0, main.scrollHeight);
            await get('advertencia',doubtsDB).then((response)=>{
              if(!response.estado){
                setTimeout(() => {
                  user_asnwer_options(2,['Si','No'],'test');
                }, 2000);
              }else{
                normal_message('si',user_avatar);}
            });
           
            //then check to start the test
            var interval = setInterval(() => {
              get('advertencia', doubtsDB).then((data) => {
                 if(data.estado){
                    clearInterval(interval);
                    setTimeout(() =>{
                      APP.test(1);
                    },2000)
                 }
              }).catch(console.warn)
              
            }, 3000);
            
            break;
          case 'test_done':
            window.scrollBy(0, main.scrollHeight);
            await APP.show_results();
           
            break;
          case 'results':
            window.scrollBy(0, main.scrollHeight);
            setTimeout(async() => {
              await user_asnwer_options(1,'Quiero hacer el test de nuevo.','retake');
              var interval = setInterval(() => {
                if(retake_test_flag){
                  clearInterval(interval);
                  APP.retake_test();
                }
              }, 2000);
              
            },2000)
            break;
        }
      }
    })
    startbtn.addEventListener('click', async()=>{
      
      APP.write_bd();
      startbtn.remove()
      normal_message('Hola..?',user_avatar);
      
      setTimeout(()=>{
        normal_message('Hola!', 'kiri')
        
      },2000)
      await setTimeout(()=>{
        //options to ask for what is kiri
        user_asnwer_options(1,'¿Qué eres?','doubt');
        var interval = setInterval(() => {
          get('¿Qué eres?',doubtsDB).then((data)=>{
            if(data.estado){
              clearInterval(interval);
              setTimeout(async () => {
                await  user_info();
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
              update_msgs('save_msg','user_info');
              APP.dudas_preTest();
            }, 2000);
          }
        }).catch(console.warn)
      }, 2000)
    })
    
   

});

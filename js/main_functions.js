import {writer} from './writer.js';
const firebaseConfig = {
    apiKey: "AIzaSyC0B_6vcoaeQiTf6GCvBESLHNUm8nNDQ7w",
    authDomain: "kiri-451ea.firebaseapp.com",
    projectId: "kiri-451ea",
    storageBucket: "kiri-451ea.appspot.com",
    messagingSenderId: "169819015367",
    appId: "1:169819015367:web:e712b7146fb39e6a6f96e2",
    measurementId: "G-JHX48ZFJ8D"
};
firebase.initializeApp(firebaseConfig);
//****************************************************Constants/Var*************************************** */
const app = document.getElementById("app");
const main = document.getElementById("main");
var answer_box = document.getElementById('answer_box');
var enviar_boton = document.getElementById('enviar');
var i_preguntas = 1; /*Contador de preguntas */
//*******************************************************db basics
const db = firebase.firestore();
//******************************************************collections
const usuariosRef = firebase.firestore().collection('Usuario');
const preguntasRef = firebase.firestore().collection('Preguntas');

//*************************************EVENT LISTENER
window.addEventListener('DOMContentLoaded',   (e) => { 
    
        //buscar la pregunta
        create_answer_button('trial',1,5);
        loading();
        writer();
        search_question(0);
        
        
       
        //var container_trial = 'optionsContainer1';
    
})



enviar_boton.addEventListener('click', async (e) =>{
    e.preventDefault();
    //query for each question
    alert('buenas');
});

//*****************************************************FUNCTIONS **************************** */

function opciones2 (id_container,n_pregunta){
    /* Create from scratch the buttons 
    and add them directly to the container */
    var container_opt = document.getElementById(id_container);
    const botones_opt = [1,2,3,4,5,6];
    var i = 0;
    for(var o = 1; o<7; o++){
        var new_button = document.createElement('button');
        var texto = document.createTextNode(o);
        //CREATION OF TEXT
        new_button.appendChild(texto);
        //SETTING ATTRIBUTES
        new_button.setAttribute('id', 'opcion'+o);
        new_button.addEventListener('click', (e) => {
            console.log("I'm in"+ texto +' '+ n_pregunta+ ' '+botones_opt[i]);
            update_answer(n_pregunta,botones_opt[i]);
            
            i++;
        });
        container_opt.appendChild(new_button);
    }
    
}

//*******************************************************BD Functions
function search_question (i_preguntas){
    //search a question by its id and prints it
    //variables
    var id = i_preguntas.toString();
    var questionData;
    var section;
    /* section check*/
    if(i_preguntas >= 1 || i_preguntas <= 6){
        section = 0;
    }else if(i_preguntas >= 7 || i_preguntas <= 12){
        section = 1;
    }else if(i_preguntas >= 13 || i_preguntas <= 18){
        section = 2;
    }

    var temp =window.localStorage.getItem('preguntas.json');
    var temp_questions = JSON.parse(temp);
    var  question = temp_questions[i_preguntas]
    questionData = question.preguntas;
    console.log(temp_questions);
    //recover of the question
    //preguntasRef.doc(id).get().then((doc) => {
      //  if (!doc.exists) return;
     //   questionData = doc.data();
     //   alert('Estoy dentro '+questionData.preguntas);
        print_question(section,questionData,id);
   // });
}

function update_answer(i_preguntas, answer){
    //var i = i_preguntas.toString();
    var temp = window.localStorage.getItem('preguntas.json');
    var temp_array = JSON.parse(temp);
    var modifyObj = temp_array[i_preguntas];
    modifyObj.respuesta_u = answer;
    temp_array[i_preguntas] =modifyObj;

    window.localStorage.setItem('preguntas.json',JSON.stringify(temp_array));

    /*preguntasRef.doc(i)
            .update({
                respuesta_u: answer,
            })
            .then(() => {
                console.log("Document updated"); 
                // here should go the other method that erease the other options
                //leaving only the selected one
            })
            .catch((error) => {
                console.error("Error updating doc", error);
            });	*/
}
//*******************************************************DOM FUNCTIONS
function loading (fromWho){
    var load = document.createElement('div');
    var dot1 = document.createElement('span');
    var dot2 = document.createElement('span');
    var dot3 = document.createElement('span');

    load.appendChild(dot1);
    load.appendChild(dot2);
    load.appendChild(dot3);
    load.setAttribute('class', 'load');

    var message = message_format
    

    message_wrap.appendChild(message_format);
    message_wrap.setAttribute('class', 'message-group');

    main.appendChild(message_wrap);
    
}

function print_question (seccion,pregunta,n_pregunta){
    /* Creates a new element that contains the question and add it to the main
        part with a container for the options */
    const secciones_test = [
        'Tengo interes por realizar actividades',
        'Estoy seguro(a) de poder',
        'Me caracterizo por ser'
    ];

    var message_wrap = document.createElement('div');
    

    var new_message = document.createElement('div');
    var message_text = document.createTextNode(
        secciones_test[seccion] + ': ' + pregunta 
    );
    var optionsContainer = document.createElement('div');
    optionsContainer.setAttribute('class','optionsContainer');
    optionsContainer.setAttribute('id','optionsContainer'+n_pregunta);
    
    message_wrap.setAttribute('class','message-group');
    

    new_message.appendChild(message_text);
    new_message.appendChild(optionsContainer);
    new_message.setAttribute('class','message-format kiri');
    new_message.setAttribute('id','pregunta'+n_pregunta);

    message_wrap.appendChild(new_message);
    main.appendChild(message_wrap);
    var container_id_temporal = optionsContainer.id;
    //create the options here
    opciones2(container_id_temporal,n_pregunta);
    return container_id_temporal;
}
/*******************************************************************************
 *                      FUNCTIONS THAT I MIGTH DELETE IN THE END               *
 * ******************************************************************************/
function opciones (id_container){
    /* Create sx buttons and retrieve their id in a array then create the 
        Event Listeners */
    var ids_buttons = [];
    var container_opt = document.getElementById(id_container);
    for(var o = 1; o<7; o++){
        ids_buttons[o] = create_answer_button(o);
        var childButton = document.getElementById(ids_buttons[o]);
        container_opt.appendChild(childButton);
    }
    
}

function create_answer_button (opcion, n_pregunta, answer){  
    //VARIABLES
    var new_button = document.createElement('button');
    var texto = document.createTextNode(opcion);
    //CREATION OF TEXT
    new_button.appendChild(texto);
    //SETTING ATTRIBUTES
    new_button.setAttribute('id', 'opcion'+opcion);
    new_button.addEventListener('click', (e) => {
        console.log('yep it-s listening')
        update_answer(n_pregunta,answer);
        });//update_answer(n_pregunta,answer));
    
    main.appendChild(new_button);
    return new_button.id;
}
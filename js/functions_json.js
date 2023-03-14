import {
    set, 
    get,
    update,
    createStore
} from 'https://cdn.jsdelivr.net/npm/idb-keyval@6/+esm'
var  db = createStore('kiri','Preguntas');
var preguntas = [
    {   
        clave:"R",
        preguntas:"De tipo práctico que impliquen la manipulación de herramientas, instrumentos, máquinas y equipo",
        respuesta_u:0
    },
    {
        clave: 'I',
        preguntas:'De tipo científico tales como, elaboración de proyectos de investigación, lectura de revistas especializadas, resolución de problemas de las ciencias puras (física, biología, química o matemática)',
        respuesta_u:0
    }

]
window.addEventListener('load', ()=>{
    search_question(1);
});

function insert (preguntas){
    alert('entered')
    set('1', preguntas[0],db).then( () => {
        alert('it worked');
    }).catch(console.warn)
}

/********************************************************************************************
 *                                          FUNCIONES
 ********************************************************************************************/
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

    get(id,db)
    .then((pregunta) =>{
        print_question(section,pregunta.preguntas,id);
    }).catch(console.warn())

  
}
function update_answer(i_preguntas, answer){
    get(i_preguntas,db)
    .then((data)=>{
        data.respuesta_u = answer;
        update(i_preguntas,db, ()=>{
            return data;
        })
    })
    .catch(console.warn)
    
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

    message_wrap.setAttribute('class','message-group');
    optionsContainer.setAttribute('class','optionsContainer');
    optionsContainer.setAttribute('id','optionsContainer'+n_pregunta);

    new_message.appendChild(message_text);
    new_message.appendChild(optionsContainer);
    new_message.setAttribute('class','message-format kiri');
    new_message.setAttribute('id','pregunta'+n_pregunta);

    message_wrap.appendChild(new_message);
    main.appendChild(message_wrap);
    var container_id_temporal = optionsContainer.id;
    //create the options here
    opciones2(container_id_temporal,n_pregunta);
}
    

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


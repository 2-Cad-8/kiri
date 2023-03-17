import {
    set, 
    get,
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
let user_avatar='';
window.addEventListener('load', ()=>{
    
    set('1',preguntas[0],db)
    .then(alert('it is written again'))
    .catch(console.warn);
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
   
    alert(answer);
    get(i_preguntas.toString(),db)
        .then((datos)=>{
            alert('1 data ' + datos)
            alert('2 answer: '+ answer);
            datos.respuesta_u = answer;
            alert('3 changing values' + datos.respuesta_u);
            set(i_preguntas.toString(),datos,db)
            .then(alert("your answer has been updated successfully"))
            .catch(console.warn);

        }).catch(console.warn);
    
}

function print_question (seccion,pregunta,n_pregunta){
    /* Creates a new element that contains the question and add it to the main
        part with a container for the options */
    const secciones_test = [
        'Tengo interes por realizar actividades',
        'Estoy seguro(a) de poder',
        'Me caracterizo por ser'
    ];
    var message =message_format_builder('kiri');
    var texto = document.createTextNode(
        secciones_test[seccion] + ': ' + pregunta 
    );

    var temp = message.firstChild;
    temp.appendChild(texto);
    main.appendChild(message);

    //container
    var optionsContainer = document.createElement('div');
    optionsContainer.setAttribute('class','optionsContainer');
    optionsContainer.setAttribute('id','optionsContainer'+n_pregunta);
    main.appendChild(optionsContainer);
    opciones(optionsContainer.id,n_pregunta);
}
    
function message_format_builder(fromWho){
    // it builds the format/visuals for the message
    
    var who;
    let icon_class;
    if(fromWho == 'kiri'){
        who = fromWho;
        icon_class = 'eicon-kiri-normal'
        //for questions and answer of the system
    }  else if(fromWho == 'femUser'){
        who = 'user'
        icon_class = 'eicon-fem-user';
    } else if(fromWho == 'maleUser'){
        who = 'user'
        icon_class = 'eicon-male-user';
    }
    
    //+ A message group
    var message_group = document.createElement('div');
    message_group.setAttribute('class', 'message-group');
    //+ A message format (where it goes the text) and from who goes here
     var new_message = document.createElement('div');
     new_message.setAttribute('class', 'message-format '+who)
        // + An icon-user which is the circle next to the message
    var icon_message = document.createElement('div');
    icon_message.setAttribute('class','icon-message')
        //+ an icon-container which is the margin of the icon
    var icon_container = document.createElement('div');
    icon_container.setAttribute('class','icon-container ');
        // + Then the eicon-from who
    var icon_avatar = document.createElement('span');
    icon_avatar.setAttribute('class',icon_class);
    
        //eicon goes inside icon container
        icon_container.appendChild(icon_avatar);
        //icon container within icon user
        icon_message.appendChild(icon_container);
        //icon user and message format kiri goes inside message group
        message_group.appendChild(new_message);
        message_group.appendChild(icon_message);

        //return the full element and set text plus attach to the main
    return message_group;
     
}

function opciones (id_container,n_pregunta){
    /* Create from scratch the buttons 
    and add them directly to the container */
    var container_opt = document.getElementById(id_container);
    //Creating buttons
    for(var o = 1; o<7; o++){
        var new_button = document.createElement('button');
        var texto = document.createTextNode(o);
        //CREATION OF TEXT
        new_button.appendChild(texto);
        //SETTING ATTRIBUTES
        new_button.setAttribute('id', 'opcion'+o);
        container_opt.appendChild(new_button);
    }

    const buttonGroupPressed = e => { 
        const isButton = e.target.nodeName === 'BUTTON';
        if(!isButton) {
            return;
        }
        var answer_temp = e.target.id;
        var answer = answer_temp.substring(6,7);
        update_answer(n_pregunta, parseInt(answer));
        
    }
    container_opt.addEventListener("click", buttonGroupPressed);


}


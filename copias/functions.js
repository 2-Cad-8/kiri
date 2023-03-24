import {
    set, 
    get,
    createStore
} from 'https://cdn.jsdelivr.net/npm/idb-keyval@6/+esm'
export let db = createStore('kiri','Preguntas');
export const main = document.getElementById("main");
export const preguntas = [
    /*1*/{   
        clave:"R",
        preguntas:"De tipo práctico que impliquen la manipulación de herramientas, instrumentos, máquinas y equipo",
        respuesta_u:0
    },
    /*2*/{
        clave: 'I',
        preguntas:'De tipo científico tales como, elaboración de proyectos de investigación, lectura de revistas especializadas, resolución de problemas de las ciencias puras (física, biología, química o matemática)',
        respuesta_u:0
    },
    /*3*/{
        clave: 'A',
        preguntas:'Que permitan el desarrollo de la expresión creativa en la música, la literatura, las artes plásticas, escénicas y otras.',
        respuesta_u:0
    },
    /*4*/{
        clave: 'S',
        preguntas:'De tipo humanitario que impliquen guiar, ayudar, educar, formar, asesorar y asistir a otros',
        respuesta_u:0
    },
    /*5*/{
        clave: 'E',
        preguntas:'Encaminadas a dirigir a otras personas para el desarrollo de proyectos personales u organizacionales',
        respuesta_u:0
    },
    /*6*/{
        clave: 'C',
        preguntas:'Relacionadas con el manejo detallado, ordenado y sistemático de datos e información',
        respuesta_u:0
    },
    /*7*/{
        clave: 'R',
        preguntas:'Utilizar con destrezas herramientas e instrumentos, hacer reparaciones, elaborar dibujos técnicos, etc.',
        respuesta_u:0
    },
    /*8*/{
        clave: 'I',
        preguntas:'Comprender el funcionamiento de diferentes máquinas, equipos, artefactos, interpretar formulas científicas y explicar teorías sobre fenómenos de la naturaleza.',
        respuesta_u:0
    },
    /*9*/{
        clave: 'A',
        preguntas:'Utilizar o aplicar profesionalmente mi imaginación, sentimientos y gustos para interpretar y crear formas artísticas',
        respuesta_u:0
    },
    /*10*/{
        clave: 'S',
        preguntas:'Comprender e interpretar la conducta humana, comunicarme con otros fácilmente y establecer relaciones interpersonales adecuadas para favorecer su bienestar integral',
        respuesta_u:0
    },
    /*11*/{
        clave: 'E',
        preguntas:'Percibir las manifestaciones y necesidades ajenas, dirigir, controlar y planear las actividades de otros y utilizar un lenguaje convincente en la búsqueda de éxito y poder',
        respuesta_u:0
    },
    /*12*/{
        clave: 'C',
        preguntas:'Organizar, clasificar, sistematizar cifras y documentos para cumplir eficientemente con planes preestablecidos',
        respuesta_u:0
    },
    /*13*/{
        clave: 'R',
        preguntas:'Práctico, sincero, concreto, persistente, objetivo y retaido',
        respuesta_u:0
    },
    /*14*/{
        clave: 'I',
        preguntas:'Analítico, racional, curioso, metódico, intelectual y crítico',
        respuesta_u:0
    },
    /*15*/{
        clave: 'A',
        preguntas:'Idealista, intuitivo, sensible, creativo, imaginativo y liberal',
        respuesta_u:0
    },
    /*16*/{
        clave: 'S',
        preguntas:'Comunicativo, afectuoso, servicial, comprensivo, cooperativo y flexible',
        respuesta_u:0
    },
    /*17*/{
        clave: 'E',
        preguntas:'Constante, optimista, persuasivo, dominante, suspicaz y sociable',
        respuesta_u:0
    },
    /*18*/{
        clave: 'C',
        preguntas:'Reservado, organizado, metódico, concreto, sistemático y conservador',
        respuesta_u:0
    },
]
let user_avatar='maleUser';


/********************************************************************************************
 *                                          FUNCIONES
 ********************************************************************************************/
export function search_question (i_preguntas){
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
 export function update_answer(i_preguntas, answer){
    get(i_preguntas.toString(),db)
        .then((datos)=>{
            
            datos.respuesta_u = answer;
            
            set(i_preguntas.toString(),datos,db)
            .then(console.log('done'))
            .catch(console.warn);

        }).catch(console.warn);
    
}
//*************************************************************DOM CREATIONS
 export function print_question (seccion,pregunta,n_pregunta){
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
    //load
    var load = loading('kiri');
    main.appendChild(load);
    setTimeout(() => {
        load.remove();
        main.appendChild(message);

        //container
        var optionsContainer = document.createElement('div');
        optionsContainer.setAttribute('class','optionsContainer');
        optionsContainer.setAttribute('id','optionsContainer'+n_pregunta);
        main.appendChild(optionsContainer);
        
        opciones(optionsContainer.id,n_pregunta);
        
    }, 2000);
    
}
    
 export function message_format_builder(fromWho){
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

 export function opciones (id_container,n_pregunta){
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
    console.log(container_opt)
    const buttonGroupPressed = e => { 
        alert('here is working')
        const isButton = e.target.nodeName === 'BUTTON';
        if(!isButton) {
            return;
        }
        var answer_temp = e.target.id;
        var answer = answer_temp.substring(6,7);
        
        delete_options(container_opt.id,answer);
        update_answer(n_pregunta, parseInt(answer));
    }
    container_opt.addEventListener("click", buttonGroupPressed);


}

export function delete_options(id_container, selOption){
    //1. Select the container
    
    var container = document.getElementById(id_container);
    //2. delete the container
    container.remove();
    //3. add the selected answer to a message format and print
    var message = message_format_builder(user_avatar);
    var texto = document.createTextNode(selOption.toString());
    var temp = message.firstChild;
    temp.appendChild(texto);
    var load =loading(user_avatar);
    main.appendChild(load);
    setTimeout(() => {
        load.remove();
        main.appendChild(message);
        
    
    }, 2000);
    
}

//*************************************************************Animations
function button_animation (e){
    let x = e.clientX - e.target.offsetLeft;
    let y = e.clientY - e.target.offsetTop;

    let ripples = document.createElement('span');
    ripples.style.left = x + 'px';
    ripples.style.top = y + 'px'
    this.appendChild(ripples);
}

function loading (fromWho){
    
    var load = document.createElement('div');
    var dot1 = document.createElement('span');
    var dot2 = document.createElement('span');
    var dot3 = document.createElement('span');

    load.appendChild(dot1);
    load.appendChild(dot2);
    load.appendChild(dot3);
    load.setAttribute('class', 'load');

    var message = message_format_builder(fromWho);
    var temp = message.firstChild;
    temp.appendChild(load);

    return message;
    
}

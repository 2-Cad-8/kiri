import {
    set, 
    get,
    createStore
} from 'https://cdn.jsdelivr.net/npm/idb-keyval@6/+esm'

//DOM ELEMENTS
export const main = document.getElementById("main");
const typingBox = document.getElementById("type_box");
const sendBtn = document.getElementById('enviar');
//BD STUFF
export let db = createStore('kiri','Preguntas');
export let userDB = createStore('kiri_user', 'user');
export let doubtsDB = createStore('kiri_doubts', 'doubts');
export let profileDB = createStore('kiri_profiles', 'profiles');

export let profiles = [];
export let doubts = [
    /*1*/{
        'duda': '¿Qué eres?',
        'respuesta': 'Soy Kiri una aplicación móvil de test vocacional que te permitirá saber un poco más sobre ti y te dara un complemento de orientación vocacional a través de un test',
        'estado': false
    },
    /*2*/{
        'duda': '¿Qué es un test?',
        'respuesta': 'Es una prueba o examen destinada a evaluar conocimientos, aptitudes o funciones. En este caso evaluare tus gustos e intereses',
        'estado': false
    },
    /*3*/{
        'duda': 'instrucciones_test',
        'respuesta': 'Te estaré haciendo una serie de preguntas y responderás con números del 1 al 6 que tanto te identificas con cada una, siendo 1 para nada y 6 totalmente. ¿Comenzamos?',
        'estado': false
    },
    /*4*/{
        'duda': '¿Dónde puedo ver los resultados?',
        'respuesta': ' Te los hare saber aquí mismo, pero también puedes verlos en tu perfil haciendo clic en tu avatar en la barra superior',
        'estado': false
    },
    /*5*/{
        'duda': '¿Puedo volver a hacer el test?',
        'respuesta': 'Si, sin embargo los datos de tu test anterior se verán eliminados',
        'estado': false
    },
    /*6*/{
        'duda': 'advertencia',
        'respuesta': 'Antes de continuar déjame aclarar que no soy algo que pueda reemplazar completamente la ayuda de un profesional en el área así que luego de realizar este test te invito a buscar la ayuda de uno si esta dentro de tus posibilidades. Ahora sí, ¡Comencemos!',
        'estado': false
    }
];
export var preguntas = [
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
export let user_avatar='maleUser';
export let user ={
    name: '',
    sexo: '',
    email: ''
};

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
 function update_answer(i_preguntas, answer){
    get(i_preguntas.toString(),db)
        .then((datos)=>{
            
            datos.respuesta_u = answer;
            
            set(i_preguntas.toString(),datos,db)
            .then(console.log('done'))
            .catch(console.warn);

        }).catch(console.warn);
    
}
//*************************************************************DOM CREATIONS
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
        main.scrollTop = main.scrollHeight + 140;
        opciones(optionsContainer.id,n_pregunta);
        
    }, 2000);
    
}
    //functions related to the test part
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
        
        delete_options(container_opt.id,answer);
        update_answer(n_pregunta, parseInt(answer));
        
        
    }
    container_opt.addEventListener("click", buttonGroupPressed);


}

export function delete_options(id_container, selOption){
    //1. Select the container
    var texto = '';
    var container = document.getElementById(id_container);
    //2. delete the container
    container.remove();
    //3. add the selected answer to a message format and print
    var message = message_format_builder(user_avatar);
    
    if(typeof(selOption) !== 'string'){
    texto = document.createTextNode(selOption.toString());
    }else {
    texto =document.createTextNode(selOption);}
    var temp = message.firstChild;
    temp.appendChild(texto);
    var load =loading(user_avatar);
    main.appendChild(load);
    setTimeout(() => {
       
        load.remove();
        main.appendChild(message);
        main.scrollTop = main.scrollHeight;
    }, 2000);
    
}
//***************************************************any meesages
export function normal_message(texto,fromwho){
    var message = message_format_builder(fromwho);
      var text = document.createTextNode(texto);
      message.firstChild.appendChild(text);
      var load  = loading(fromwho);
      main.appendChild(load);
      setTimeout(() => {
        load.remove();
        main.appendChild(message);
      }, 2000);
      main.scrollTop = main.scrollHeight;
}
//there is only 2 types of answers besides the options at the beginning of the app
//1- asking for a doubt in specific
//2- asking to try again the test
export function user_asnwer_options(n_options,textos,type){
    //create the container
    //append container to the main
    //make answer options
    var container = document.createElement('div');
    container.setAttribute('id','optionsContainer');
    container.setAttribute('class', 'optionsContainer');
    
    main.append(container);

    for(var o = 0; o< n_options; o++){
        var texto =''
        var new_button = document.createElement('button');
        if(typeof(textos) == 'object'){
            texto = document.createTextNode(textos[o]);
            new_button.setAttribute('id', 'opcion'+textos[o]);
        }else{
            texto = document.createTextNode(textos);
            new_button.setAttribute('id', 'opcion'+textos);
        }
        //CREATION OF TEXT
        new_button.appendChild(texto);
        //SETTING ATTRIBUTES
        
        new_button.setAttribute('class', 'user_answers');
        container.appendChild(new_button);
        
    }
    
    const buttonGroupPressed = e => { 
        const isButton = e.target.nodeName === 'BUTTON';
        if(!isButton) {
            return;
        }
        var answer_temp = e.target.id;
        var answer = answer_temp.substring(6);
        
        delete_options(container.id,answer);
        
        if(type == 'doubt'){
            responder_dudas(answer);
        }else if (type == 'retake'){
            alert('here should go the retake of the test')
        }else if (type == 'test'){
            alert(answer);
            if(answer == 'Si' || answer == '¡Comencemos!'){
                
                get('advertencia',doubtsDB).then((data)=>{
                  normal_message(data.respuesta,'kiri');
                  data.estado = true;
                  set('advertencia',data, doubtsDB).then(console.log('test flag true'))
                }).catch(console.warn)
              }else if (answer == 'No'){
                
                setTimeout(() => {
                    user_asnwer_options(1,'¡Comencemos!','test')
                }, 2000);
               
              }
        }
        
        
    }
     container.addEventListener("click", buttonGroupPressed);
}

 function responder_dudas(doubt){
    // search the answer matching the doubts of the value of the option
    //go to the db and look for the answer for "doubt"
    get(doubt, doubtsDB).then((data)=>{
        // then print the answer and await for others
        normal_message(data.respuesta,'kiri');
        data.estado = true;
        set(doubt,data,doubtsDB).then(console.log("updated")).catch(console.warn);
    }).catch(console.warn())
    
}

export function  user_info (){
    //ask for user info
    normal_message('¿Y tú? ¿Qué eres?', 'kiri');
    //sex selection
        var malebutton = document.createElement('div');
        malebutton.setAttribute('id', 'maleUser');
        malebutton.setAttribute('class', 'button-icon');
        var femalebutton = document.createElement('div');
        femalebutton.setAttribute('id', 'femUser');
        femalebutton.setAttribute('class', 'button-icon');
        //icons
        var icon_male  = document.createElement('span');
        var icon_female  = document.createElement('span');
        icon_male.setAttribute('class', 'eicon-male-user');
        icon_female.setAttribute('class', 'eicon-fem-user');
        //containers
        var icon_container_fem = document.createElement('div');
        icon_container_fem.setAttribute('class','icon-container ');
        icon_container_fem.appendChild(icon_female);

         var icon_container_male = document.createElement('div');
         icon_container_male.setAttribute('class','icon-container ');
         icon_container_male.appendChild(icon_male);
         //container
         var optionsContainer = document.createElement('div');
         optionsContainer.setAttribute('class','optionsContainer');
         optionsContainer.setAttribute('id','optionsContainer');
        //adding buttons
        malebutton.appendChild(icon_container_male);
        femalebutton.appendChild(icon_container_fem);
        //SETTING ATTRIBUTES
        
        optionsContainer.appendChild(malebutton);
        optionsContainer.appendChild(femalebutton);
        setTimeout(()=>{
            main.appendChild(optionsContainer)
            malebutton.addEventListener('click', () =>{
                user_avatar='maleUser';
                user.sexo = 'maleUser';
                optionsContainer.remove()
                //replacing icon profile
                var new_icon  = document.createElement('span');
                new_icon.setAttribute('class','eicon-male-user')
                var temp = document.getElementById('iconoP');
                var parent = temp.parentNode;
                parent.removeChild(temp);
                parent.appendChild(new_icon)
            })
            femalebutton.addEventListener('click', () =>{
                user_avatar='femUser';
                user.sexo = 'femUser';
                optionsContainer.remove();
                //Replacing icon on the profile
                var new_icon  = document.createElement('span');
                new_icon.setAttribute('class','eicon-fem-user')
                var temp = document.getElementById('iconoP');
                var parent = temp.parentNode;
                parent.removeChild(temp);
                parent.appendChild(new_icon)
                //temp.appendChild(new_icon);
            })
        },2000)
       
     var interval = setInterval(() => {
        if(user.sexo){
            normal_message('Ya veo ¿Y cuál es tu nombre?', 'kiri');
            main.scrollTop = main.scrollHeight;
            clearInterval(interval);
            typingBox.focus();

        }
     }, 2000);
        
    //retrieve user info
    const saving_name = (e) =>{
        e.preventDefault();
        user.name = typingBox.value;
        typingBox.value = '';
        normal_message(user.name,user_avatar);
        main.scrollTop = main.scrollHeight;

        interval = setInterval(() =>{
            if(user.name){
                normal_message('Un gusto, '+ user.name, 'kiri');
                clearInterval(interval);
                main.scrollTop = main.scrollHeight;
                typingBox.blur();
                typingBox.disabled = true;
                set('user_info', user, userDB)
                .then(console.log('data sucessfully saved'))
                .catch(console.warn)
                sendBtn.removeEventListener('click',saving_name);
                sendBtn.disabled = true;
            }
        },1000)
    }
    sendBtn.addEventListener('click', saving_name);

    
    /*interval = setInterval(() => {
        if(user.name){
            normal_message(' Un gusto, ' + user.name, 'kiri');

            setTimeout(() => {
                normal_message('Oh, también dame tu correo por si acaso', 'kiri');
                clearInterval(interval);
                sendBtn.addEventListener('click', (e)=>{
                    e.preventDefault();
                    user.email = typingBox.value;
                    typingBox.value = '';
                    normal_message('', 'kiri');
                }, 3000);
            });
        }
    }, 2000);*/
    
     //saves data in the indexed
    //block the input field
    
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

export function loading (fromWho){
    
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

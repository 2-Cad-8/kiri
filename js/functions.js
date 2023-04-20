import {
    set, 
    get,
    createStore,
    
} from 'https://cdn.jsdelivr.net/npm/idb-keyval@6/+esm'

export var retake_test_flag = false;
//DOM ELEMENTS
export const main = document.getElementById("main");
const typingBox = document.getElementById("type_box");
const sendBtn = document.getElementById('enviar');
//BD STUFF
export let keys =[
    {clave:'A',
    puntaje: 0},
    {clave:'C',
    puntaje: 0},
    {clave:'S',
    puntaje: 0},
    {clave:'E',
    puntaje: 0},
    {clave:'I',
    puntaje: 0},
    {clave:'R',
    puntaje: 0}
    
]
export let db = createStore('kiri','Preguntas');
export let userDB = createStore('kiri_user', 'user');
export let doubtsDB = createStore('kiri_doubts', 'doubts');
export let profileDB = createStore('kiri_profiles', 'profiles');

export const profiles = [
    /*1*/{
        nombre_perfil:'Realista',
        clave: 'R',
        carreras: ['Ingeniería', 'Arquitectura', 'Gastronomía', 'Policía', 'Deportes', 'Agronomía', 'Agricultura', 'Aviación', 'Mecánica', 'Técnicos en reparación', 'Topografía', 'Carpintería', 'Conductores',' Corte y confección', 'Veterinaria'],
        descripcion: 'Este perfil se refiere a personas que se destacan por sus capacidades mecánicas y deportivas. Prefieren trabajar con maquinaria, equipamiento, plantas y animales. Es posible que también les guste trabajar fuera de una oficina',
        evitan:'La pasividad y dejar que otros resuelvan asuntos que pueden desarrollar por si mismos',
        intereses: 'Involucra la necesidad implicación física en su trabajo, lejos de la pasividad de la oficina, y/o la necesidad de ejercer una actividad al aire libre o permitiendo conservar un lazo estrecho con la naturaleza',
        motivaciones:'Realizar cosas de manera concreta, hacer objetos o ejercer una actividad que implica el uso de sus manos o de herramientas y técnicas manuales. Voluntad de no conformase solamente de una función intelectual y puramente conceptual',
    },
    /*2*/{
        nombre_perfil:'Artístico',
        clave: 'A',
        carreras: ['Literatura',' Comunicación', 'Diseño gráfico', 'Mercadotecnia', 'Medio artístico', 'Floristas', 'Fotografía', 'Arquitectura (diseño de interiores)',' Artes plásticas', 'Intérprete', 'Medios audiovisuales', 'Periodismo', 'Área infantil (trabajo con niños)', 'Danza'],
        descripcion: 'Este perfil incluye a las personas que aprecian las cualidades estéticas que expresan a través de su trabajo artístico y literario. Se caracterizan por su  flexibilidad y no conformidad o compromiso con un sistema específico',
        evitan:'La rutina, el conformismo, el no debatir ideas, los prejuicios, las actividades de cálculo, la técnica y las ciencias, las actividades físicas.',
        intereses: 'Los símbolos, el futuro, la originalidad, los conceptos y su concreción, la estética, las emociones y su representación.',
        motivaciones:'Crear, redactar, razonar por analogía, dibujar, imaginar, percibir, innovar, debatir, cuestionar el conformismo',
    },
    /*3*/{
        nombre_perfil:'Investigador',
        clave: 'I',
        carreras: ['Química', 'Docencia', 'Informática', 'Farmacéutica', 'Medicina', 'Matemática', 'Odontología', 'Psicología', 'Nutrición', 'Ingeniería (enfocada a investigaciones y logística)', 'Historia', 'Criminalística', 'Programación', 'Veterinaria', 'Inteligencia analítica'],
        descripcion: 'Este perfil representa a personas que prefieren profesiones científicas e intelectuales. Disfrutan de reunir información, identificar teorías o hechos y  analizar e interpretar información.',
        evitan:'La falta de profesionalismo, la imprecisión, la incompetencia, la cotidianidad y la subjetividad',
        intereses: 'La tecnicidad, la precisión, la profesionalidad, el rigor, y el sentido del detalle, la enseñanza, las ciencias, los métodos novedosos',
        motivaciones:'Desarrollar y valorar competencias, aconsejar a individuos o a empresas sobre estas áreas, investigar, transmitir conocimiento',
    },
    /*4*/{
        nombre_perfil:'Social',
        clave: 'S',
        carreras: ['Docencia, Enfermería', 'Comunicación Social',' Turismo', 'Sociología', 'Recursos humanos (Administración)', 'Asistencia legal (Derecho)',  'Trabajo social', 'Terapeutas', 'Servicio al cliente', 'Coaching deportivo', 'Consejeros/Orientadores', 'Área comunitaria', 'Conferenciantes y motivadores', 'Relaciones públicas', 'Terapia del lenguaje'],
        descripcion: 'Este perfil representa a las personas sociales que disfrutan al ayudar a otros. Prefieren trabajar en grupos y se caracterizan también por sus grandes habilidades de comunicación.',
        evitan:'La ausencia de contactos con el entorno exterior, el trabajo solitario. El mercantilismo, el individualismo, el hecho de no hacer nada por mejorar la vida de otros',
        intereses: 'Las buenas relaciones, los viajes y las otras culturas, las negociaciones, el ambiente de trabajo. La empatía, las relaciones humanas, el bienestar personal, la psicología, la medicina, el humanismo, la justicia',
        motivaciones:'Explicar, negociar, presentar, aconsejar y vender, tener contactos, comunicarse con los clientes o colegas, Ayudar a otros, prestar servicios, escuchar, informar, formar, ayudar a cada uno a progresar, aconsejar y orientar',
    },
    /*5*/{
        nombre_perfil:'Emprendedor',
        clave: 'E',
        carreras: ['Derecho',' Comercio exterior y aduanas',' Administración de empresas', 'Turismo', 'Ciencias políticas',' Negocios internacionales', 'Mercadotecnia o Marketing', 'Chefs (Gastronomía)', 'Medicina', 'Odontología', 'Coaching ejecutivo / Consultoría', 'Jefes de policía o bomberos', 'Bienes raíces', 'Todo lo relacionado con ventas', 'Redes sociales (influencers, bloggers, etc.)', 'Asesoría financiera'],
        descripcion: 'Este perfil incluye a las personas con personalidad administrativa. Pueden conectar eficientemente sus ideas y opiniones con los demás y persuadirlos. Además, confían mucho en sí mismos y tienen la energía necesaria para lograr sus aspiraciones.',
        evitan:'La ausencia de responsabilidades, la imposibilidad de tomar decisiones, supervisores demasiado controladores. La inmovilidad y la inacción, trabajar encerrado en un despacho, falta de iniciativa',
        intereses: 'La administración, las orientaciones estratégicas, la dirección de proyectos. La acción a corto plazo, la aventura, la toma de riesgos, los negocios y le beneficio, las nuevas modas',
        motivaciones:'Animar una reunión, supervisar motivar a los colaboradores, manejar conflictos, reconciliar, convencer, planear acciones, decidir y tomar acción. Improvisar, gestionar las urgencias, trabajar sobre la marcha, desarrollar nuevas actividades, materializar proyectos o ideas, conseguir ventas, lanzar desafíos',
    },
      /*6*/{
        nombre_perfil:'Convencional',
        clave: 'C',
        carreras: ['Administración de empresas', 'Contabilidad', 'Economía', 'Finanzas',' Función pública', 'Mercadotecnia', 'Logística internacional', 'Control de tráfico', 'Informática', 'Organización y Coordinación de eventos', 'Gestión de proyectos', 'Planeación estratégica', 'Matemáticas', 'Auditorías'],
        descripcion: 'Son aquellas personas con un alto grado de control y que prefieren trabajar con  números y cifras. Son precisos en su trabajo y siempre cumplen las normas, leyes y reglamentos laborales.',
        evitan:'El cambio repentino, la improvisación frente a situaciones importantes, la falta de métodos o medios.',
        intereses: 'La informática, las reglas y las convenciones,  los métodos, la anticipación de acontecimientos, el cuidado del detalle, la eficacia',
        motivaciones:'Organizar, planificar rigurosamente las actividades, aplicar métodos o reglas de gestión, controlar la calidad, estructurar y clasificar la información',
    },
];
export const doubts = [
    /*1*/{
        'duda': '¿Qué eres?',
        'respuesta': 'Soy Kiri una aplicación móvil de test vocacional, y te dare un complemento de orientación vocacional a través de un test',
        'estado': false
    },
    /*2*/{
        'duda': '¿Qué es un test?',
        'respuesta': 'Es una prueba o examen destinada a evaluar conocimientos, aptitudes o funciones.\n En este caso evaluare tus gustos e intereses',
        'estado': false
    },
    /*3*/{
        'duda': 'instrucciones_test',
        'respuesta': 'Ahora te estaré haciendo una serie de preguntas y responderás con números del 1 al 6 que tanto te identificas con cada una.\n\n Siendo 1 para nada y 6 totalmente. ¿Comenzamos?',
        'estado': false
    },
    /*4*/{
        'duda': '¿Dónde puedo ver los resultados?',
        'respuesta': 'Te los hare saber aquí mismo, también puedes verlos en tu perfil haciendo clic en tu avatar en la barra superior',
        'estado': false
    },
    /*5*/{
        'duda': '¿Puedo volver a hacer el test?',
        'respuesta': 'Si, sin embargo los datos de tu test anterior serán eliminados',
        'estado': false
    },
    /*6*/{
        'duda': 'advertencia',
        'respuesta': 'Antes de continuar déjame aclarar que no soy algo que pueda reemplazar completamente la ayuda de un profesional en el área.\n\n Luego de realizar este test te invito a buscar la ayuda de uno si esta dentro de tus posibilidades. \n\nAhora sí, ¡Comencemos!',
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
        preguntas:'Práctico, sincero, concreto, persistente, objetivo y retraído',
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
    email: '',
    resultados: [{},{},{}],
    resultados_pKey: {}, //resultados per key
   
};

/********************************************************************************************
 *                                          FUNCIONES
 ********************************************************************************************/
export async function search_question (i_preguntas){
    //search a question by its id and prints it
    //variables
    var id = i_preguntas.toString();
    var section;
    /* section check*/
    const define_section = (i_preguntas) =>{ 
        var section;
        if(i_preguntas >= 1 && i_preguntas <= 6){
           
        section = 0;
        return section;
        }else if(i_preguntas >= 7 && i_preguntas <= 12){
            
            section = 1;
            return section;
        }else if(i_preguntas >= 13 && i_preguntas <= 18){
           
            section = 2;
            return section;
        }   
    }
         section = await define_section(i_preguntas);
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

export function calc_results (keys){
    /* Calcula los resultados obtenidos en el test */
    
    for (var i = 1; i<19; i++){
        get(i.toString(),db).then((data) =>{ 
            switch (data.clave){
                case 'A':
                    keys[0].puntaje += parseInt(data.respuesta_u);
                break;
                case 'C':
                    keys[1].puntaje += parseInt(data.respuesta_u);
                break;
                case 'S':
                    keys[2].puntaje += parseInt(data.respuesta_u);
                break;
                case 'E':
                    keys[3].puntaje += parseInt(data.respuesta_u);
                break;    
                case 'I':
                    keys[4].puntaje += parseInt(data.respuesta_u);
                break;
                case 'R':
                    keys[5].puntaje += parseInt(data.respuesta_u);
                break;    
            }
          
        })
        
        
    }
    //organize results
    var interval = setInterval(() => {
        if(keys[0].puntaje != 0){
            //if puntaje it's different from zero then calculate else keep checking
            clearInterval(interval)
            keys.sort((a,b) =>{
                return b.puntaje -a.puntaje;
            })
            user.resultados_pKey = keys;
            
            //Retrieving the data of each profile 
            var interval2 = setInterval(() => {
                if(user.resultados_pKey[0].clave != ''){
                    clearInterval(interval2);
                    for (let i = 0; i<3; i++){
                        get(keys[i].clave,profileDB).then((data) => {
                            user.resultados[i] = data;
                        }).catch(console.error);
                    }
                    
                    //UPDATING THE USER INFO RESULTS AND GENERAL RESULTS
                    get('user_info',userDB).then((data)=>{
                        var i = 0;
                        for(let result of user.resultados){
                            data.resultados[i] = result;
                            i++
                        }
                        data.resultados_pKey = keys;
                        set('user_info',data,userDB).then(console.log('updated result'))
                    })
                }
            }, 2000);
        }
    }, 2000);
   
    
}

//*************************************************************DOM CREATIONS
 function print_question (seccion,pregunta,n_pregunta){
    /* Creates a new element that contains the question and add it to the main
        part with a container for the options */
        console.log('estamos en la seccion: '+seccion)
    const secciones_test = [
        'Tengo interes por realizar actividades',
        'Estoy seguro(a) de poder',
        'Me caracterizo por ser'
    ];
    var message =message_format_builder('kiri');
    var texto = document.createTextNode(
        n_pregunta+'/18.-' +secciones_test[seccion] + ': ' + pregunta 
    );

    var temp = message.firstChild;
    temp.appendChild(texto);
    //load
    var load = loading('kiri');
    main.appendChild(load);
    setTimeout(async() => {
        load.remove();
        main.appendChild(message);
        

        //container
        var optionsContainer = document.createElement('div');
        optionsContainer.setAttribute('class','optionsContainer');
        optionsContainer.setAttribute('id','optionsContainer'+n_pregunta);
        
        await main.appendChild(optionsContainer);
        window.scrollBy(0,window.innerHeight);
      
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

 async function opciones (id_container,n_pregunta){
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
    window.scrollBy(0,window.innerHeight);
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
    setTimeout(async () => {
       
        load.remove();
        await main.appendChild(message);
        window.scrollBy(0,window.innerHeight);
       
    }, 2000);
    
}
//***************************************************any meesages
export function normal_message(texto,fromwho){
    var message = message_format_builder(fromwho);
      var text = document.createTextNode(texto);
      message.firstChild.appendChild(text);
      var load  = loading(fromwho);
      main.appendChild(load);
      setTimeout(async() => {
        load.remove();
        await main.appendChild(message);
        window.scrollBy(0,window.innerHeight);
      }, 2000);
      
    
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
    window.scrollBy(0,window.innerHeight);
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
            retake_test_flag = true;
            
        }else if (type == 'test'){
           
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
       
     var interval = setInterval(async () => {
        if(user.sexo){
            clearInterval(interval);
            await normal_message('Ya veo ¿Y cuál es tu nombre?', 'kiri');
            typingBox.focus();

        }
     }, 2000);
        
    //retrieve user info
    const saving_name = (e) =>{
        e.preventDefault();
        user.name = typingBox.value;
        typingBox.value = '';
        normal_message(user.name,user_avatar);
        interval = setInterval(() =>{
            if(user.name){
                normal_message('Un gusto, '+ user.name, 'kiri');
                clearInterval(interval);
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

}
//*************************************************************Animations

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

/***************************************************************Profile functions */
//constants
const username = document.getElementById('username');
const icon = document.getElementById('iconoP');
//slider constants
const card_title_1 = document.getElementById('title_p1');
const card_title_2 = document.getElementById('title_p2');
const card_title_3 = document.getElementById('title_p3');

const card_desc_1 = document.getElementById('desc_p1');
const card_desc_2 = document.getElementById('desc_p2');
const card_desc_3 = document.getElementById('desc_p3');

const keyCard = document.getElementById('clave_card');
const overlay = document.getElementById('overlay');

//LG-CARD PARTS
const circleKey = document.getElementById('circle-key');
const title_profile = document.querySelector('.lg-card-title');
const definicion = document.getElementById('definicion');
const carreras = document.getElementById('carreras');
const intereses = document.getElementById('intereses');
const motivaciones = document.getElementById('motivaciones');
const evitan = document.getElementById('evitan');



//functions
export function update_user_profile(){
    /* Update the username, icon and if there's results */
    //1 Check if there's username
    get('user_info',userDB).then((data) =>{
        if(data.name){
            //2 update username
            username.innerHTML= data.name;
             //3 updare icon
            if(data.sexo == 'femUser'){
                icon.className = 'ms-female-user';
            }else{
                icon.className = 'ms-male-user';
            }
            //4 check if there's results update results
           
            if(Object.keys(data.resultados[0]).length != 0){
                //show results
                var show_results = document.getElementById('results');
                var no_results  =document.getElementById('no-results');
                show_results.style.display = 'block';
                no_results.style.display = 'none';

                let clave ='';
                for(let perfil of data.resultados){
                    clave = clave + perfil.clave;
                }
                keyCard.innerHTML = clave.toUpperCase();

                card_title_1.innerHTML = data.resultados[0].nombre_perfil.substring(0,12);
                card_title_2.innerHTML = data.resultados[1].nombre_perfil.substring(0,12);
                card_title_3.innerHTML = data.resultados[2].nombre_perfil.substring(0,12);

                card_desc_1.innerHTML = data.resultados[0].descripcion.substring(0,55) +"... <button class= 'read-more' id='SM-1' >Ver mas</button> ";
                card_desc_2.innerHTML = data.resultados[1].descripcion.substring(0,55) +'... <button class="read-more" id="SM-2">Ver mas</button> ';
                card_desc_3.innerHTML = data.resultados[2].descripcion.substring(0,55) +'... <button class="read-more" id="SM-3">Ver mas</button> ';

                var button = document.getElementById('SM-1');
                var button2 = document.getElementById('SM-2');
                var button3 = document.getElementById('SM-3');
                var close_card = document.getElementById('close')


                button.addEventListener('click', async (e)=>{ 
                    get_info_lgCard(1);
                    setTimeout(() => {
                        show_card();
                    }, 450);
                    close_card.addEventListener('click',(e) =>{
                      e.preventDefault();
                      hide_card();
                    });
                    overlay.addEventListener('click',(e) =>{
                        e.preventDefault();
                        hide_card();
                      });
                 });
                 button2.addEventListener('click', async (e)=>{
                   
                    get_info_lgCard(2);
                    setTimeout(() => {
                        show_card();
                    }, 450);
                    close_card.addEventListener('click',(e) =>{
                      e.preventDefault();
                      hide_card();
                    });
                    overlay.addEventListener('click',(e) =>{
                        e.preventDefault();
                        hide_card();
                      });
                });
                button3.addEventListener('click', async (e)=>{
                    
                    get_info_lgCard(3);
                    setTimeout(() => {
                        show_card();
                    }, 450);
                    close_card.addEventListener('click',(e) =>{
                      e.preventDefault();
                      hide_card();
                    });
                    overlay.addEventListener('click',(e) =>{
                        e.preventDefault();
                        hide_card();
                      });
                });
            }

        } //5 else continue to keep not data yet
    })
    
}

 function show_card () {
    var card = document.getElementById('lg-card');
 
    overlay.style.zIndex =99;
    overlay.style.opacity =1;
    card.style.display = 'block';
    card.scrollTo(0,0);

}

 function hide_card(){
    var card = document.getElementById('lg-card');
 
    overlay.style.zIndex =-1;
    overlay.style.opacity =0;
    card.style.display = 'none';
}

function get_info_lgCard (clicked_card){
    /*Changes the data within the large card*/
    
   //I need to get the key
   var key = keyCard.innerHTML;
   var profile_key;
   //then I need to check which see more was clicked
   switch (clicked_card) {
    case 1:
        //then colect just the letter correspondent to that card
        profile_key = key.substring(0,1)
        console.log(profile_key);
        //make query
        get(profile_key,profileDB).then((perfil_info)=>{
            //change texts from the lg card
            circleKey.innerHTML = profile_key;
            title_profile.innerHTML = perfil_info.nombre_perfil;
            definicion.innerHTML = perfil_info.descripcion;
            let career = perfil_info.carreras.join(', ');
            carreras.innerHTML = career;
            intereses.innerHTML = perfil_info.intereses;
            motivaciones.innerHTML = perfil_info.motivaciones;
            evitan.innerHTML = perfil_info.evitan;

        }).catch(console.error);
        break;
    case 2:
        profile_key = key.substring(1,2)
        console.log(profile_key);
        get(profile_key,profileDB).then((perfil_info)=>{
            //change texts from the lg card
            circleKey.innerHTML = profile_key;
            title_profile.innerHTML = perfil_info.nombre_perfil;
            definicion.innerHTML = perfil_info.descripcion;
            let career = perfil_info.carreras.join(', ');
            carreras.innerHTML = career;
            intereses.innerHTML = perfil_info.intereses;
            motivaciones.innerHTML = perfil_info.motivaciones;
            evitan.innerHTML = perfil_info.evitan;

        }).catch(console.error);
        break;
    case 3:
        profile_key = key.substring(2,3)
        console.log(profile_key);
        get(profile_key,profileDB).then((perfil_info)=>{
            //change texts from the lg card
            circleKey.innerHTML = profile_key;
            title_profile.innerHTML = perfil_info.nombre_perfil;
            definicion.innerHTML = perfil_info.descripcion;
            let career = perfil_info.carreras.join(', ');
            carreras.innerHTML = career;
            intereses.innerHTML = perfil_info.intereses;
            motivaciones.innerHTML = perfil_info.motivaciones;
            evitan.innerHTML = perfil_info.evitan;

        }).catch(console.error);
        break;
   }
}

export function edit_username (actionType){
    /* Change username and gender*/
   
    //consult the db for the current username
    const usernam_place = document.getElementById('user_info_container');
    const btn = document.getElementById('edit');

    var username = usernam_place.children;

    const sex_buttons = (selected)=>{
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

         if(selected == 'maleUser'){
            malebutton.setAttribute('class', malebutton.className+' selected');
         }else if(selected == 'femUser'){
            femalebutton.setAttribute('class', femalebutton.className+' selected');
         }
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
        return optionsContainer;
    }
    if(actionType == 'Editar'){
    get('user_info',userDB).then((data)=>{
        // Change div for an input with the curretn username
        var new_input = document.createElement('input');
        new_input.value = data.name;
        new_input.setAttribute('class','input-control');
        var sex_opt = sex_buttons(data.sexo);
        console.log(sex_opt);

        usernam_place.removeChild(username[0]);
        usernam_place.appendChild(new_input);
        usernam_place.appendChild(sex_opt);

        //listening buttons
        var children = sex_opt.children;
        console.log(children);
        sex_opt.addEventListener('click',(e)=>{
            const isbutton = e.target.nodeName === 'SPAN';
            const button = e.target;
            if(!isbutton){
                return;
            }
            console.log(button);
            var leng = 0;
            switch(button.className){
                case 'eicon-fem-user'://If Female button is clicked
                    
                    leng = children[1].className.length;
                    console.log(leng);
                    if(leng == 11){
                        children[1].className = children[1].className +' selected';
                        children[0].className = children[0].className.replace(children[0].className,'button-icon');
                        data.sexo = 'femUser';
                        set('user_info', data,userDB).then(console.log('se changed'));
                    }
                    break;
                case 'eicon-male-user'://If Male button is clicked
                    leng = children[0].className.length;
                    console.log(leng);
                    if(leng == 11){
                        children[0].className = children[0].className +' selected';
                        children[1].className = children[1].className.replace(children[1].className,'button-icon');
                        data.sexo = 'maleUser';
                        set('user_info', data,userDB).then(console.log('se changed'));
                    }
                    break;
            }
        })

        btn.textContent ='Guardar';
    })
    }
    else if(actionType== 'Guardar'){

        username = usernam_place.children;
        console.log(username);
        get('user_info',userDB).then((data)=>{
            data.name = username[0].value;//new username

            var new_name = document.createElement('h4');
            new_name.innerHTML = username[0].value;
            new_name.setAttribute('class','sub-title');


            set('user_info',data,userDB).then(console.log('done!'))
            .catch(console.error);
            console.log(username);
            usernam_place.removeChild(username[0]);
            console.log(username);
            usernam_place.removeChild(username[0]);
            usernam_place.appendChild(new_name);
            btn.textContent ='Editar';

            update_user_profile();
        });
    }
}
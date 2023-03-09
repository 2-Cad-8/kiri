class Bd {
    constructor(referencia){
        this.tablaRef = firebase.firestore().collection(referencia);
    }

    update_answer(i_preguntas, answer){
        var i = i_preguntas.toString();
        var tabla_ref = self.tablaRef;
        tabla_ref.doc(i)
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
                });	
    }
}

export {Bd};
//Backup original functions

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
    var container;
    var section;
    /* section check*/
    if(i_preguntas >= 1 || i_preguntas <= 6){
        section = 0;
    }else if(i_preguntas >= 7 || i_preguntas <= 12){
        section = 1;
    }else if(i_preguntas >= 7 || i_preguntas <= 12){
        section = 2;
    }

    //recover of the question
    preguntasRef.doc(id).get().then((doc) => {
        if (!doc.exists) return;
        questionData = doc.data();
        alert('Estoy dentro '+questionData.preguntas);
        print_question(section,questionData.preguntas,id);
    });
}

function update_answer(i_preguntas, answer){
    var i = i_preguntas.toString();
    preguntasRef.doc(i)
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
            });	
}
//*******************************************************DOM FUNCTIONS


function print_question (seccion,pregunta,n_pregunta){
    /* Creates a new element that contains the question and add it to the main
        part with a container for the options */
    const secciones_test = [
        'Tengo interes por realizar actividades',
        'Estoy seguro(a) de poder',
        'Me caracterizo por ser'
    ];

    var new_message = document.createElement('div');
    var message_text = document.createTextNode(
        secciones_test[seccion] + ': ' + pregunta 
    );
    var optionsContainer = document.createElement('div');
    optionsContainer.setAttribute('class','optionsContainer');
    optionsContainer.setAttribute('id','optionsContainer'+n_pregunta);

    new_message.appendChild(message_text);
    new_message.appendChild(optionsContainer);
    new_message.setAttribute('class','message-format');
    new_message.setAttribute('id','pregunta'+n_pregunta);

    main.appendChild(new_message);
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
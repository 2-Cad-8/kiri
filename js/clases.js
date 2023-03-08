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
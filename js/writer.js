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

//table dudas
//table user
//table perfiles
function writer(){
const data = JSON.stringify(preguntas);
const finished = (error) =>{
    if (error){
        console.error(error);
        return;
    }
}
window.localStorage.setItem("preguntas.json", data, finished);

console.log(preguntas);}
export{writer}
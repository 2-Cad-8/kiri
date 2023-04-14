import { 
    update_user_profile,
   } from "./functions.js";
   
window.addEventListener('load', async () =>{
    await update_user_profile();
   //setInterval(() => {
    console.log('I selected this>'+document.getElementById('circle-key'));
   }, 2000); 
      
  //})
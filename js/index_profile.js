import { 
    update_user_profile,
    
    show_card
   } from "./functions.js";
   
window.addEventListener('load', async () =>{
    await update_user_profile();
   
    show_card();
      
  })
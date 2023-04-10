import { 
    update_user_profile,
    see_more_c1,
    see_more_c2,
    see_more_c3,
    show_card
   } from "./functions.js";
window.addEventListener('load', async () =>{
    await update_user_profile();
    /*see_more_c1.addEventListener('click', (e) =>{
        e.preventDefault();
        show_card();
      });
    */
  })
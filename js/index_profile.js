import { 
    edit_username,
    update_user_profile,
   } from "./functions.js";
   
window.addEventListener('load', async () =>{
    await update_user_profile();
    const editBTN = document.getElementById('edit');
    editBTN.addEventListener('click',  ()=>{
        
        edit_username(editBTN.textContent);
    })
    
      
  })
import { 
    edit_username,
    update_user_profile,
   } from "./functions.js";
const loader = document.querySelector('.center'); 
window.addEventListener('load', async () =>{
    await update_user_profile();
    setTimeout(() => {
        loader.style.opacity = 0;
        loader.style.zIndex = -1
        const editBTN = document.getElementById('edit');
        editBTN.addEventListener('click',  ()=>{
            edit_username(editBTN.textContent);
        })
    }, 2350);
    
      
  })
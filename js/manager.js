const fs  = require('fs');
const main = document.getElementById('main');
let main_content = main.innerHTML;
      let data  = JSON.stringify(main_content);
      fs.writeFile('./assets/img/messages.json',data);
      console.log('here we are');
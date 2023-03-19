const APP = {
    SW: null,
    DB: null, //TODO:
    init() {
      //called after DOMContentLoaded
      //register our service worker
      APP.registerSW();
      document
        .getElementById('answer_box')
        .addEventListener('submit', APP.saveUserName);
      //TODO:
      APP.openDB();
    },
    registerSW() {
      if ('serviceWorker' in navigator) {
        // Register a service worker hosted at the root of the site
        navigator.serviceWorker.register('/sw.js').then(
          (registration) => {
            APP.SW =
              registration.installing ||
              registration.waiting ||
              registration.active;
          },
          (error) => {
            console.log('Service worker registration failed:', error);
          }
        );
        //listen for the latest sw
        navigator.serviceWorker.addEventListener('controllerchange', async () => {
          APP.SW = navigator.serviceWorker.controller;
        });
        //listen for messages from the service worker
        navigator.serviceWorker.addEventListener('message', APP.onMessage);
      } else {
        console.log('Service workers are not supported.');
      }
    },
    saveUserName(ev) {
      ev.preventDefault();
      let name = document.getElementById('type_box');
      let strName = name.value.trim();
      if (strName ) {
        let person = {
          id: Date.now(),
          username: strName,
        };
        console.log('Save', person);
        //send the data to the service worker
        //, otherAction: 'hello'
        APP.sendMessage({ addPerson: person });
      }
    },
    sendMessage(msg) {
      //send some structured-cloneable data from the webpage to the sw
      if (navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage(msg);
      }
    },
    onMessage({ data }) {
      //got a message from the service worker
      console.log('Web page receiving', data);
      //TODO: check for savedPerson and build the list and clear the form
      if ('savedPerson' in data) {
        APP.showPeople();
        document.getElementById('name').value = '';
      }
    },
    showPeople() {
      //TODO: check for DB
      if (!APP.DB) {
        APP.openDB();
      }
      //TODO: start transaction to read names and build the list
      let tx = APP.DB.transaction('Preguntas', 'readonly');
      let store = tx.objectStore('Preguntas');
      let req = store.getAll();
      req.onsuccess = (ev) => {
        let list = document.getElementById('people');
        let ppl = ev.target.result;
        list.innerHTML = ppl
          .map((person) => {
            console.log('show', person);
            return `<li data-id="${person.id}">
            ${person.name}
            <input type="color" value="${person.color}" disabled />
          </li>`;
          })
          .join('\n');
      };
    },
    openDB() {
      let req = indexedDB.open('kiri');
      req.onsuccess = (ev) => {
        APP.DB = ev.target.result;
        APP.showPeople();
      };
      req.onerror = (err) => {
        console.warn(err);
        //NOT calling showPeople()
      };
    },
  };
  
  document.addEventListener('DOMContentLoaded', APP.init);
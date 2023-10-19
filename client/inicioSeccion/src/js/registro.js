import validate from "./registroValidaciones.js"
import {
    app
  } from '/firebase/firebase.config.client.js';
  console.log(app);

  const registerNewUser = async (userData) => {
    const aNewUserData = await fetch('https://med-consult-app.onrender.com/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });
    const user = await aNewUserData.json();
    return user;
  }
  
  const registroFormulario = document.getElementById('registroFormulario');
  const main = document.querySelector(".main-container");

registroFormulario.addEventListener('submit', (event) => {
  event.preventDefault();
  validate.validateInputs();

  let isValid = true; // variable para verificar si todas las entradas son válidas

  // Verificar si hay algún error en las entradas
  const errorDisplays = document.querySelectorAll(".error");
  errorDisplays.forEach(display => {
    if (display.innerText !== '') {
      isValid = false;
    }
  });

  if (isValid) {
    const displayName = event.target.children[0].children[1].value;
    const email = event.target.children[2].children[1].value;
    const password = event.target.children[3].children[1].value;
    const roleDoctor = document.getElementById('doctor');
    const roleSecretario = document.getElementById('secretario');

    const registroUsuario = {
      displayName,
      email,
      password
    }
    
    if (roleDoctor.checked) {
      roleDoctor.checked = false;
      registroUsuario.role = roleDoctor.value;
    } else {
      roleSecretario.checked = false;
      registroUsuario.role = roleSecretario.value;
    }

    registerNewUser(registroUsuario).then((response) => {
      console.log(response);
      main.classList.remove("active");
    }).catch((error) => console.log(error))
  } else {
    // Mostrar mensaje de error o hacer cualquier otra acción apropiada
    console.log("Por favor, corrija los errores en las entradas");
  }
})



    
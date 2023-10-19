import validate from "./inicioValidaciones.js"
import {
  getAuth,
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
  } from 'https://www.gstatic.com/firebasejs/10.3.0/firebase-auth.js'
  import {
    app
  } from '/firebase/firebase.config.client.js';
  console.log(app);
  
  const loginForm = document.getElementById('loginForm');

  const emailLogin = document.getElementById("emailLogin");
  const passwordLogin = document.getElementById("passwordLogin");
  
  const auth = getAuth(app);
  
  const loginUser = async (token) => {
    const userLoggedSuccess = await fetch('https://med-consult-app.onrender.com/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
  
    const user = await userLoggedSuccess.json();
    return user;
  }

  TODO: // 👇🏼 validate token in routers

loginForm.addEventListener('submit', (event) => {
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
    const email = event.target.children[0].children[1].value
    const password = event.target.children[1].children[1].value;

    setPersistence(auth, browserSessionPersistence)
    .then(()=> {
      return signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const tokenGeneratedForFirebase = userCredentials._tokenResponse.idToken
        console.log(userCredentials._tokenResponse.idToken);
        loginUser(tokenGeneratedForFirebase)
        .then((test) => {
          console.log(test)
        })
        .catch((error) => console.log(error))
        const user = userCredentials.user;
        console.log(user);
        
        // Obtén el token del usuario actual
        const objectRole = JSON.parse(user.reloadUserInfo.customAttributes)
        console.log(user.reloadUserInfo.customAttributes);
        console.log(objectRole.role);
    
        if (objectRole.role === 'Doctor'){
          console.log('funciona Doctor')
         window.location.pathname = `/doctor/${user.uid}`;
        } else if (objectRole.role === 'Secretario') {
          console.log('funciona Secretario')
         window.location.pathname = `/secretario/${user.uid}`;
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
  
        if (errorCode === 'auth/invalid-email') {
          validate.setError(emailLogin, 'El email es incorrecto');
          validate.setSuccess(passwordLogin);
        } else if (errorCode === 'auth/user-not-found') {
          validate.setError(emailLogin, 'El email no está registrado');
          validate.setSuccess(passwordLogin);
        } else if (errorCode === 'auth/wrong-password') {
          validate.setError(passwordLogin, 'La contraseña es incorrecta');
          validate.setSuccess(emailLogin);
        } else {
          console.log(errorCode);
          console.log(errorMessage);
        }
      });
    })
  } else {
    // Mostrar mensaje de error o hacer cualquier otra acción apropiada
    console.log("Por favor, corrija los errores en las entradas");
  }
});

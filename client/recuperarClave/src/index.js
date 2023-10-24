import validate from "./validacionRecuperarClave.js"
import {
  getAuth,
  sendPasswordResetEmail,
  } from 'https://www.gstatic.com/firebasejs/10.3.0/firebase-auth.js'
  import {
    app
  } from '/firebase/firebase.config.client.js';
  
  const auth = getAuth(app);

  const email = document.getElementById('email')
  
  const btnCambiar = document.getElementById('btnCambiar');
  const btnCancelar = document.getElementById('btnCancelar')
  
  btnCambiar.addEventListener('click', (e) => {
    e.preventDefault();
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
      sendPasswordResetEmail(auth, email.value).then(() => {
        Swal.fire('Se envió el correo para reestablecer la contraseña');
      }).catch((error) => {
        console.log(error);
      })
    } else {
      // Mostrar mensaje de error o hacer cualquier otra acción apropiada
      console.log("Por favor, corrija los errores en las entradas");
    }
  })

  btnCancelar.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.pathname = '/';
  })

//Scroll//

ScrollReveal({ 
    // reset: true,
    distance: "80px",
    duration: 2000,
    delay: 200
});

ScrollReveal().reveal('.header', { origin: 'top' });
ScrollReveal().reveal('.main-container', { origin: 'bottom' });
ScrollReveal().reveal('.login-h2, .input-box, .remember-forgot, .btn, .login-register, .input-parrafo', { origin: 'left' });

//CLIK//

function direccionRegistro(){
    location.href="../pantalla-registro/index.html"
  }
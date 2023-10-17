// import validate from "./inicioValidaciones.js"
import {
  getAuth,
  sendPasswordResetEmail,
  } from 'https://www.gstatic.com/firebasejs/10.3.0/firebase-auth.js'
  // import {
  //   app,
  //   auth
  // } from '/firebase/firebase.config.client.js';
  

  const email = document.getElementById('email')

  const btnCambiar = document.getElementById('btnCambiar');

  btnCambiar.addEventListener('click', (e) => {
    e.preventDefault ();
    
    sendPasswordResetEmail(auth, email.value).then(() => {
      alert('se envio el correo para reestablecer la contraseña')
    }).catch((error) => {
      console.log(error);
    })
    
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
  
  function direccionBusqueda(){
    location.href="../pantalla-busqueda/index.html"
  }
  
  function direccionPagos(){
    location.href="../pantalla-pagos/index.html"
  }
  
  function direccionCerrar(){
    location.href="../pantalla-inicio/index.html"
  }

  function direccionSecretario(){
    location.href="../pantalla-secretario/index.html"
  }

  function direccionMedico(){
    location.href="../pantalla-medico/index.html"
  }

  function direccionRecuperar(){
    location.href="../pantalla-recuperar/index.html"
  }
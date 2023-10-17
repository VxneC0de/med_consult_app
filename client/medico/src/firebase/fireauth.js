import {
  getAuth,
  signOut
} from 'https://www.gstatic.com/firebasejs/10.3.0/firebase-auth.js'
import {
  app
} from '/firebase/firebase.config.client.js';
  
  const auth = getAuth(app);
  
  //VARIABLE BOTON DE CERRAR SECCION//
  const btnClose = document.getElementById("closeSection");
  
  // Función para cerrar sesión
  function cerrarSesion() {
    signOut(auth).then(() => {
      window.location.pathname = '/'
    }).catch((error) => {
      console.error("Error al cerrar sesión:", error);
    });
  }
  

  btnClose.addEventListener("click", cerrarSesion);

import {
    getAuth,
    signOut,
    onAuthStateChanged
  } from 'https://www.gstatic.com/firebasejs/10.3.0/firebase-auth.js'
  import {
    app
  } from '/firebase/firebase.config.client.js';
    
    const auth = getAuth(app);

    onAuthStateChanged(auth, (user)=>{
      if(!user){
        //Si el usuario está desconectado
        window.location.reload();
        window.location.pathname = "/"
      }
    })
    
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
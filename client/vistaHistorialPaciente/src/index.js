
import { 
    getAuth, 
    signOut,
    setPersistence, 
    browserSessionPersistence
  } from 'https://www.gstatic.com/firebasejs/10.3.0/firebase-auth.js';
  
  import { app } from '/firebase/firebase.config.client.js';
  
  const auth = getAuth(app);
  
        //VARIABLE BOTON DE CERRAR SECCION//
        const btnClose = document.getElementById("btnClose");
      
        // Función para cerrar sesión
        function cerrarSesion() {
          signOut(auth).then(() => {
            window.location.pathname = '/'
          }).catch((error) => {
            console.error("Error al cerrar sesión:", error);
          });
        }
        
      
        btnClose.addEventListener("click", cerrarSesion);
  
  //NAVAR ACTIVE O NO ACTIVE RESPONSIVE//
  
  let menuIcon = document.querySelector("#menu-icon");
  let navbar = document.querySelector(".navigation");
  
  menuIcon.onclick = () => {
    menuIcon.classList.toggle("bx-close");
    if (menuIcon.classList.contains("bx-close")) {
      menuIcon.innerHTML = '<ion-icon name="close"></ion-icon>';
      navbar.classList.add("active");
    } else {
      menuIcon.innerHTML = '<ion-icon name="menu"></ion-icon>';
      navbar.classList.remove("active");
    }
  };
  
  function closeMenu() {
    menuIcon.classList.remove("bx-close");
    menuIcon.innerHTML = '<ion-icon name="menu"></ion-icon>';
    navbar.classList.remove("active");
  }
  
  let navLinks2 = document.querySelectorAll(".navigation a");
  navLinks2.forEach(link => {
    link.addEventListener("click", closeMenu);
  });
  
  const btnBusqueda = document.getElementById('btnBusqueda');
  const btnPagos = document.getElementById('btnPagos');
  const btnPerfil = document.getElementById('btnPerfil')
  
  const getTokenOnSessionStorage = window.sessionStorage.getItem('firebase:authUser:AIzaSyDPgalqYfnXzAW6kQNyW4Kp9MRLxif39W4:[DEFAULT]')
  
  
  const getToken = JSON.parse(getTokenOnSessionStorage);
  
  const token2 = getToken.uid;
  
  
  console.log(token2);
  
  btnPerfil.addEventListener('click', () => {
    window.location.pathname = `/doctor/${token2}`;
  })
  
  btnPagos.addEventListener('click', () => {
    window.location.pathname = '/pagos';
  })
  
  btnBusqueda.addEventListener('click', () => {
    window.location.pathname = '/busqueda';
  })
  
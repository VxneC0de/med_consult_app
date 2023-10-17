import { 
  getAuth, 
  signOut,
  setPersistence, 
  browserSessionPersistence
} from 'https://www.gstatic.com/firebasejs/10.3.0/firebase-auth.js';

import { app } from '/firebase/firebase.config.client.js';

const auth = getAuth(app);


setPersistence(auth, browserSessionPersistence)
  .then(() => {
    console.log("Persistence set to browserSessionPersistence");
    const user = auth.currentUser;
    if (user) {
      // El usuario está autenticado
      user.getIdToken().then(async (idToken) => {
        token = idToken;
      }).catch((error) => {
        console.error('Error al obtener el token:', error);
      });
    } else {
      // El usuario no está autenticado
      window.location.pathname = '/';
      console.error('El usuario no está autenticado');
    }
  })
  .catch((error) => {
    console.error("Error setting persistence:", error);
  });

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

  const getTokenOnSessionStorage = window.sessionStorage.getItem('firebase:authUser:AIzaSyDPgalqYfnXzAW6kQNyW4Kp9MRLxif39W4:[DEFAULT]')


const getToken = JSON.parse(getTokenOnSessionStorage);

const token = getToken.uid;


console.log(token);

const btnPerfil = document.getElementById('btnPerfil')

btnPerfil.addEventListener('click', () => {
  window.location.pathname = `/doctor/${token}`;
})


const crearPDF = document.getElementById('crearPDF');

crearPDF.addEventListener('click', () => {
  // Obtener los valores de los elementos
  const nombreCompleto = document.getElementById('nombreCompleto').value;
  const nacionalidad = document.getElementById('nacionalidad').value;
  const cedula = document.getElementById('cedula').value;
  const fecha = document.getElementById('fecha').value;
  const motivo = document.getElementById('motivo').value;

  // Crear un nuevo elemento HTML que contenga los valores
  const contenido = document.createElement('div');

  // Agregar el nuevo elemento al contenido que se convertirá en PDF
  const justificante = document.querySelector('.justificante');
  justificante.appendChild(contenido);

  // Convertir el contenido en PDF y descargarlo
  html2pdf().from(justificante).save();
  
  //NOTA: Redireccionar para que lleve a otra pantalla
});




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

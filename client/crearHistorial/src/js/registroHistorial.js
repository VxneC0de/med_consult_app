import validate from './validacionesHistorial.js'
import { 
  getAuth, 
  signOut,
  setPersistence, 
  browserSessionPersistence
} from 'https://www.gstatic.com/firebasejs/10.3.0/firebase-auth.js';

import { app } from '/firebase/firebase.config.client.js';

const auth = getAuth(app);

let token;

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

const btnBusqueda = document.getElementById('btnBusqueda');
const btnPagos = document.getElementById('btnPagos');
const btnPerfil = document.getElementById('btnPerfil')
const btnAtras = document.getElementById('btnAtras')

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

btnAtras.addEventListener('click', () => {
  window.location.pathname = `/vistaHistorial/${cedulaView}`;
})


//////////////////////////VARIABLES HISTORIAL//
const notasObservaciones = document.getElementById("notasObservaciones");

const fechaCita = document.getElementById("fechaCita");
const horaCita = document.getElementById("horaCita");

const btnGuardar = document.getElementById("btnGuardar");

const cedulaUrl = `https://med-consult-app.onrender.com/api/crearHistorial/${window.location.pathname.split('/')[2]}`;
const cedulaView = cedulaUrl.split('/')[5];

console.log(cedulaView);

const getHistorial = async (cedula) => {
  const dataList = await fetch(`https://med-consult-app.onrender.com/api/crearHistorial/${cedula}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
  }
});
  const cedulaDelPaciente = await dataList.json();
  console.log(cedulaDelPaciente);
  return cedulaDelPaciente;
}

const updateHistorial = async (cedula, datosHistorial) => {
  console.log(cedula, datosHistorial);
  const sendData = await fetch(`https://med-consult-app.onrender.com/api/crearHistorial/${cedula}`, {
      method: 'PATCH',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(datosHistorial),
  });
  const updateHistory = await sendData.json();
  return updateHistory;
}


let userObject = {};

btnGuardar.addEventListener("click", () => {
    try {
      let isValid = true; // variable para verificar si todas las entradas son válidas
      validate.validateInputs();
  
      // Verificar si hay algún error en las entradas
      const errorDisplays = document.querySelectorAll(".error");
      errorDisplays.forEach(display => {
        if (display.innerText !== '') {
          isValid = false;
        }
      });
  
      if (isValid) {
        userObject = {
          notasObservaciones: notasObservaciones.value,
          fechaCita: fechaCita.value,
          horaCita: horaCita.value
        };

        getHistorial(cedulaView)
        .then((cedulaHistorial) => {
          const datosObtenidosDesdeElHistorial = cedulaHistorial.message
          updateHistorial(datosObtenidosDesdeElHistorial[0].cedula, userObject)
            .then((respuestaHistorial) => {
            console.log(respuestaHistorial);
            window.location.pathname = `/vistaHistorial/${cedulaView}`
          }) .catch((error) => {
            console.error(error)
          });
        }).catch((error) => {
          console.log(error)
        });
  
        console.log(userObject)
      

      } else {
        
        // Mostrar mensaje de error o hacer cualquier otra acción apropiada
        console.log("Por favor, corrija los errores en las entradas");
      }
    } catch (error) {
      console.error(error);
    }
});
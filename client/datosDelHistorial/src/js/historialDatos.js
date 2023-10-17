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

export const getOnlyHistorialByID = async (cedula) => {
  try {
      const dataList = await fetch(`http://localhost:3100/api/vistaHistorial/${cedula}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
        }
      });
      const dataResult = await dataList.json();
      return {
          cedula,
          todosLosHistoriales: dataResult.message[0].historial.datosHistorial,
      };
  } catch(error){
      console.log('no llega la solicitud')
  }
}

//VARIABLES
const notasObservaciones = document.getElementById("notasObservaciones");
const fechaCita = document.getElementById("fechaCita");
const horaCita = document.getElementById("horaCita");

//MOSTRAR LOS DATOS

const cedulaView = window.location.pathname.split('/')[2];
const fechaHistorial = window.location.pathname.split('/')[3];

document.addEventListener('DOMContentLoaded', () => {
  console.log(window.location.pathname.split('/'));
  getOnlyHistorialByID(cedulaView)
    .then((historiales) => {
      console.log(historiales);
      const historialSeleccionado = historiales.todosLosHistoriales.find(historial => historial.fechaCita === fechaHistorial)
      console.log(historialSeleccionado);

      notasObservaciones.value = historialSeleccionado.notasObservaciones;
      fechaCita.value = historialSeleccionado.fechaCita;
      horaCita.value = historialSeleccionado.horaCita;

    })
    .catch((error) => console.error(error));
})





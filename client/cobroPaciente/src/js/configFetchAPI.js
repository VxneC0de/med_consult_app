import { 
    getAuth, 
    signOut,
    setPersistence, 
    browserSessionPersistence,
    onAuthStateChanged
  } from 'https://www.gstatic.com/firebasejs/10.3.0/firebase-auth.js';
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
  

export const getPagos = async () => {
    const dataList = await fetch(`https://med-consult-app.onrender.com/api/cobroPaciente/${window.location.pathname.split('/')[2]}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    const idPaciente = dataList.url.split('/')[5];
    const dataResult = await dataList.json();
    return {
        idPaciente,
        datosDelPaciente: dataResult.message,
    };
  }
  
export const updatePagos = async (pagosId, pagosData) => {
    console.log(pagosId, pagosData);
    const sendData = await fetch(`https://med-consult-app.onrender.com/api/cobroPaciente/${pagosId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(pagosData),
    });
    const updatedPaciente = await sendData.json();
    return updatedPaciente;
}

      const btnBusqueda = document.getElementById('btnBusqueda');
      const btnPagos = document.getElementById('btnPagos');
const btnPerfil = document.getElementById('btnPerfil')
const btnFinalizar = document.getElementById('btnFinalizar')

const getTokenOnSessionStorage = window.sessionStorage.getItem('firebase:authUser:AIzaSyDPgalqYfnXzAW6kQNyW4Kp9MRLxif39W4:[DEFAULT]')


const getToken = JSON.parse(getTokenOnSessionStorage);

const token2 = getToken.uid;


console.log(token2);

btnPerfil.addEventListener('click', () => {
  window.location.pathname = `/secretario/${token2}`;
})

btnPagos.addEventListener('click', () => {
  window.location.pathname = '/pagosSecretario';
})

btnBusqueda.addEventListener('click', () => {
  window.location.pathname = '/busquedaSecretario';
})

btnFinalizar.addEventListener('click', () => {
    window.location.pathname = '/busquedaSecretario';
})
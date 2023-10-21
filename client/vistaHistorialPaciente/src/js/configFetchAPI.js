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
  

export const getOnlyHistorialByID = async (cedula) => {
    try {
        const dataList = await fetch(`http://localhost:3200/api/vistaHistorial/${cedula}`, {
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

export const getHistorial= async () => {
    try {
        const dataList = await fetch(`http://localhost:3200/api/datosDelHistorial/`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const dataResult = await dataList.json();
        return dataResult.message;
    } catch(error){
        console.log('no llega la solicitud')
    }
}
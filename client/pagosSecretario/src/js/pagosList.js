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
        await printPagosList(token);
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


const listPagosContenido = document.getElementById('listPagos');
const numeroConsulta = document.getElementById('numeroConsulta');
const totalDivisa = document.getElementById('totalDivisa');
const totalBoliva = document.getElementById('totalBolivares');
const loader = document.getElementById('loader');

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


const printPagosList = async () => {
    const dataList = await fetch(`http://localhost:3100/api/pagosSecretario`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    const dataResult = await dataList.json();
    // Ordenar los datos por fecha y hora de cita
    dataResult.message.sort((a, b) => {
        const dateA = Date.parse(a.paciente.fechaCita + 'T' + a.paciente.horaCita);
        const dateB = Date.parse(b.paciente.fechaCita + 'T' + b.paciente.horaCita);
        return dateA - dateB;
    });
    console.log(dataResult);
    return dataResult;
}

document.addEventListener('DOMContentLoaded', () => {
    printPagosList()
      .then((pago) => {
        loader.classList.add('close');
        const currentDate = new Date(); // Obtener la fecha actual
        currentDate.setHours(0, 0, 0, 0); // Establecer la hora en 00:00:00
        let totalConsultas = 0;
        let totalDolares = 0;
        let totalBolivares = 0; 

        const listPagos = pago.message
        .filter(paciente => {
            // Convertir la fecha y hora de la cita a un objeto Date
            const fechaCita = new Date(paciente.paciente.fechaCita + 'T' + paciente.paciente.horaCita);
            const pacientesNoCancelados = paciente.paciente.cancelado;
            // Comparar solo las fechas
            return fechaCita >= currentDate && pacientesNoCancelados === false;
        })
        .map((pago, index) => {
            totalConsultas += 1;
            totalDolares += Number(pago.paciente.pagosDataEfectivo);
            totalBolivares += Number(pago.paciente.pagosDataPM2); 

            const printPagos = `
            <tbody class="tbody" id="listPagos">
                <tr>
                    <td class="td" data-label="N° de Consulta">${index + 1}</td>
                    <td class="td" data-label="Nombre del Paciente"><span>${pago.paciente.nombre}</span> <span>${pago.paciente.apellidos}</span></td>
                    <td class="td" data-label="Monto $">${pago.paciente.pagosDataEfectivo}</td>
                    <td class="td" data-label="Monto Bs">${pago.paciente.pagosDataPM2}</td>
                    <td class="td" data-label="Referencia">${pago.paciente.pagosDataPM1}</td>
                </tr>
            </tbody>
            `
            return printPagos;
        });        
        listPagosContenido.innerHTML = listPagos.join("");

        numeroConsulta.textContent = totalConsultas;
        totalDivisa.textContent = totalDolares;
        totalBoliva.textContent = totalBolivares;
        console.log(numeroConsulta, totalDivisa, totalBoliva) 
  
      })
      .catch((error) => {
        console.error(error);
    });
  
})


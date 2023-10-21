import {getOnlyHistorialByID, getHistorial} from './configFetchAPI.js';
const boxHistoriales = document.getElementById('boxHistoriales')

const cedulaUrl = `http://localhost:3200/api/crearHistorial/${window.location.pathname.split('/')[2]}`;
const cedulaView = cedulaUrl.split('/')[5];

const loader = document.getElementById('loader');

let historialPaciente = {};

document.addEventListener('DOMContentLoaded', () => {
  getOnlyHistorialByID(cedulaView)
    .then((historiales) => {
      loader.classList.add('close');
      console.log(historiales);
      historialPaciente = historiales

      // Ordenar el array por la propiedad 'fechaCita'
      historiales.todosLosHistoriales.sort((a, b) => {
        const dateA = new Date(a.fechaCita);
        const dateB = new Date(b.fechaCita);
        
        return dateA - dateB;
      });

      const listHistoriales = historiales.todosLosHistoriales.map((historiales, index) => {

        const printHistoriales = `
        <button id="${index}" class="historial">
          <span class="icono"><ion-icon name="folder-open"></ion-icon></span>
          <h3 class="title2">Historial: ${index + 1}</h3>
          <p class="title3">${historiales.fechaCita}</p>
        </button>`;
        return printHistoriales;
      });

      boxHistoriales.innerHTML = listHistoriales.join("");

    })
    .catch((error) => console.error(error));
})

boxHistoriales.addEventListener("click", e => {

  if (e.target.closest('.historial')) {
    console.log(historialPaciente);
    console.log(e.target.children[2].innerHTML);

    const fechaHistorial = e.target.children[2].innerHTML;
    
    const seleccionado = historialPaciente.todosLosHistoriales.find(historial => historial.fechaCita === fechaHistorial)
    console.log(seleccionado)
    console.log(historialPaciente.cedula);

    window.location.pathname = `/datosDelHistorial/${historialPaciente.cedula}/${fechaHistorial}`;
  }
})
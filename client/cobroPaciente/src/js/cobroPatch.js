import {getPagos, updatePagos} from './configFetchAPI.js';
import validate from './validacionesPatch.js'

const pagosDataEfectivo = document.getElementById('pagosDataEfectivo');
const pagosDataPM1 = document.getElementById('pagosDataPM1');
const pagosDataPM2 = document.getElementById('pagosDataPM2');

const btnGuardar = document.getElementById('btnGuardar');

  let isValid = true; // variable para verificar si todas las entradas son válidas

/////////////////////////////ELIMINAR ERRORES//////////

const clearErrors = () => {
  // Lista de IDs de campos de entrada
  const fieldIds = ['pagosDataEfectivo', 'pagosDataPM1', 'pagosDataPM2'];

  fieldIds.forEach(id => {
      const field = document.getElementById(id);
      const errorDisplay = field.parentElement.querySelector(".error");

      if (errorDisplay) {
          errorDisplay.innerText = '';
          field.parentElement.classList.remove('error');
      }
  });
}


/////////////////////////////ICONO DE BASURA//////////

// Obtener los elementos span y ion-icon
const deleteUno = document.getElementById('deleteUno');
const deleteDos = document.getElementById('deleteDos');

// Agregar un evento de clic a cada elemento
deleteUno.addEventListener('click', () => {
  // Obtener el contenedor y agregar la clase close
  const mainEfectivo = document.getElementById('mainEfectivo');
  mainEfectivo.classList.add('close');

  // Limpiar los campos del formulario dentro del main correspondiente
  mainEfectivo.querySelector('#pagosDataEfectivo').value = '';

  // Limpiar todos los errores
  clearErrors();
});

deleteDos.addEventListener('click', () => {
  // Obtener el contenedor y agregar la clase close
  const mainBolivares = document.getElementById('mainBolivares');
  mainBolivares.classList.add('close');

  // Limpiar los campos del formulario dentro del main correspondiente
  mainBolivares.querySelector('#pagosDataPM1').value = '';
  mainBolivares.querySelector('#pagosDataPM2').value = '';

  // Limpiar todos los errores
  clearErrors();
});



/////////PARA SABER EN DONDE TIENE QUE HACER EL CAMBIO////
let idResult;
const dataResult = await getPagos();
idResult = dataResult.idPaciente;
console.log(idResult)


/////////PARA mandar el patch////
let pacienteObject = {};

btnGuardar.addEventListener("click", async () => {
  try {
    validate.validateInputs();

    // Verificar si hay algún error en las entradas
    const errorDisplays = document.querySelectorAll(".error");
    let isValid = true;
    errorDisplays.forEach(display => {
      if (display.innerText !== '') {
        isValid = false;
      }
    });

    // Verificar si todos los inputs están vacíos
    if (pagosDataEfectivo.value.trim() === "" && pagosDataPM1.value.trim() === "" && pagosDataPM2.value.trim() === "") {
      isValid = false;
    }

    if (isValid) {
      pacienteObject = {
        pagosDataEfectivo: pagosDataEfectivo.value,
        pagosDataPM1: pagosDataPM1.value,
        pagosDataPM2: pagosDataPM2.value,
  
        pagoNoRealizado: true,
      };
  
      // Enviar una solicitud PATCH para actualizar la información del paciente
      updatePagos(idResult, pacienteObject)
        .then((respuestaPaciente) => {
          console.log(respuestaPaciente);
          window.location.pathname = '/pagosSecretario'
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      console.log("Por favor, corrija los errores en las entradas");
      Swal.fire({
        title: 'Formato incompleto',
        icon: 'error',
      })
    }
  } catch (error) {
    console.log(error)
  }
});





//No se puede enviar nada vacio, falta esa funcion

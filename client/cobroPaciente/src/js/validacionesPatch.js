//VARIABLES//

const pagosDataEfectivo = document.getElementById('pagosDataEfectivo');
const pagosDataPM1 = document.getElementById('pagosDataPM1');
const pagosDataPM2 = document.getElementById('pagosDataPM2');

////////////////////////////MENSAJE ERROR//


const setError = (element, message) => {
    const errorDisplay = element.parentElement.querySelector(".error");
  
    if (errorDisplay) {
      errorDisplay.innerText = message;
      errorDisplay.style.display = 'block';
    }
};
  
const setSuccess = element => {
    const inputBox = element.parentElement;
    const errorDisplay = inputBox.querySelector(".error");
  
    errorDisplay.innerText = '';
    inputBox.classList.remove('error');
};


///////////////////////VALIDACIONES DE INPUTS//

const isValidPagosData = pagosData => {
    const reNumber = /^[0-9]+$/;
    return reNumber.test(pagosData);
}
  
const validateInputs = () => {
    if (!mainEfectivo.classList.contains('close')) {
        const pagosDataEfectivoValue = pagosDataEfectivo.value.trim();

        if(pagosDataEfectivoValue === '') {
            setError(pagosDataEfectivo, 'Campo requerido');
        } else {
            setError(pagosDataEfectivo, '');
        }
    }

    if (!mainBolivares.classList.contains('close')) {
        const pagosDataPM1Value = pagosDataPM1.value.trim();
        const pagosDataPM2Value = pagosDataPM2.value.trim();

        if(pagosDataPM1Value === '') {
            setError(pagosDataPM1, 'Campo requerido');
        } else {
            setError(pagosDataPM1, '');
        }

        if(pagosDataPM2Value === '') {
            setError(pagosDataPM2, 'Campo requerido');
        } else {
            setError(pagosDataPM2, '');
        }
    }
}

// let pacienteObject = {};

// btnGuardar.addEventListener("click", () => {
//     let isValid = true; // variable para verificar si todas las entradas son válidas
//     try {
//       validateInputs();
  
//       // Verificar si hay algún error en las entradas
//       const errorDisplays = document.querySelectorAll(".error");
//       errorDisplays.forEach(display => {
//         if (display.innerText !== '') {
//           isValid = false;
//         }
//       });
//     } catch(error){
//       console.log(error)
//     }
  
//     if (isValid) {
//       pacienteObject = {
  
//         pagosDataEfectivo: pagosDataEfectivo.value,
//         pagosDataPM1: pagosDataPM1.value,
//         pagosDataPM2: pagosDataPM2.value,
//       }

//     } else {
//       // Mostrar mensaje de error o hacer cualquier otra acción apropiada
//       console.log("Por favor, corrija los errores en las entradas");
//     //   // Mostrar mensaje de error o hacer cualquier otra acción apropiada
//     //   Swal.fire({
//     //     title: 'Error en el formato',
//     //     icon: 'error',
//     //     text: 'Por favor, corrija los errores en las entradas',
//     // });
//     }
//   });
  

export default {
    setError,
    setSuccess,
    isValidPagosData,
    validateInputs
  }
//////////////////////////VARIABLES HISTORIAL//
const notasObservaciones = document.getElementById("notasObservaciones");

const fechaCita = document.getElementById("fechaCita");
const horaCita = document.getElementById("horaCita");

////////////////////////////MENSAJE ERROR//
const setError = (element, message) => {
    const errorDisplay = element.parentElement.querySelector(".error");
  
    if (errorDisplay) {
      errorDisplay.innerText = message;
      errorDisplay.style.display = 'block';
    }
}
  
const setSuccess = element => {
    const inputBox = element.parentElement;
    const errorDisplay = inputBox.querySelector(".error");
  
    errorDisplay.innerText = '';
    inputBox.classList.remove('error');
}

///////////////////////VALIDACIONES DE INPUTS//

const isValidDate = (selectedDate) => {
    let currentDate = new Date();
    currentDate = currentDate.toISOString().split('T')[0]; // 'YYYY-MM-DD'

    const selectedDateObject = new Date(selectedDate);
    selectedDate = selectedDateObject.toISOString().split('T')[0]; // 'YYYY-MM-DD'
    console.log(selectedDate)

    return selectedDate >= currentDate;
}

  const isValidHora = horaCitaValue => {
    const horaCitaObject = new Date(`2000-01-01T${horaCitaValue}`);
    const horaMinima = new Date(`2000-01-01T06:00:00`);
    const horaMaxima = new Date(`2000-01-01T18:00:00`);
    return !isNaN(horaCitaObject) && horaCitaObject >= horaMinima && horaCitaObject <= horaMaxima;
  }

///////////////////////////VALIDACIONES CONFIRMADAS//

const validateInputs = () => {
    const notasObservacionesValue = notasObservaciones.value.trim();
    const fechaCitaValue = fechaCita.value.trim();
    const horaCitaValue = horaCita.value.trim();
   
    if(notasObservacionesValue === '') {
        setError(notasObservaciones, 'Campo requerido');
    } else {
        setSuccess(notasObservaciones);
    }

    if(fechaCitaValue === '') {
        setError(fechaCita, 'Campo requerido');
      } else if (!isValidDate(fechaCitaValue)) {
        setError(fechaCita, 'Seleccionar una fecha válida');
      } else {
        setSuccess(fechaCita);
      }
    
      if(horaCitaValue === '') {
        setError(horaCita, 'Campo requerido');
      } else if (!isValidHora(horaCitaValue)) {
        setError(horaCita, 'Hora inválida, el lapso de tiempo tiene que ser desde las 6:00 am hasta las 18:00pm')
      } else {
        setSuccess(horaCita);
      }

}



export default {
    setError,
    setSuccess,
    isValidDate,
    isValidHora,
    validateInputs
  }
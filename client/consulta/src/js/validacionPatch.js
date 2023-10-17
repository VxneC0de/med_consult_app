//////////////////////////VARIABLES REGISTRO//

//genero
const femenino = document.getElementById("femenino");
const masculino = document.getElementById("masculino");

//grupo de edad
const adulto = document.getElementById("adulto");
const adolescente = document.getElementById("adolescente");
const nino = document.getElementById("niño");

//nombre y apellidos del paciente
const nombre = document.getElementById("nombre");
const nombre2 = document.getElementById("nombre2");
const apellidos = document.getElementById("apellidos");

//nombre y apellido del acompañante
const nombreAcompañante = document.getElementById("nombreAcompañante");
const apellidoAcompañante = document.getElementById("apellidoAcompañante");
const parentezco = document.getElementById("parentezco");

//cedula
const nacionalidad = document.getElementById("nacionalidad");
const cedula = document.getElementById("cedula");

//otros datos
const email = document.getElementById("email");
const areaPhone = document.getElementById("areaPhone");
const numberPhone = document.getElementById("numberPhone");

//direccion
const direccion1 = document.getElementById("direccion1");
const direccion2 = document.getElementById("direccion2");
const ciudad = document.getElementById("ciudad");
const estado = document.getElementById("estado");
const postal = document.getElementById("postal");

//selectores
const primeraConsulta = document.getElementById("primeraConsulta");
const tipoConsulta = document.getElementById("tipoConsulta");
const textArea = document.getElementById("textArea");

//fecha y hora
const fechaCita = document.getElementById("fechaCita");
const horaCita = document.getElementById("horaCita");

//PAGOS//

const pagosDataEfectivo = document.getElementById('pagosDataEfectivo');

// const pagosDataPM1 = document.getElementById('pagosDataPM1');
// const pagosDataPM2 = document.getElementById('pagosDataPM2');




//CODIGO DEL SHOW Y CLOSE//

const inputBox = document.querySelector(".input-box.input-oculto");

// const inputBox2 = document.querySelector(".main-box-2.main-oculto2")
// const inputBox3 = document.querySelector(".main-box-2.main-oculto1")

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
  
  const isValidName = nombre => {
    const names = nombre.trim().split(' ');
  
    if (names.length !== 1) {
      return false;
    }
  
    const name = names[0];
  
    if (!/^[a-zA-ZáéíóúñÁÉÍÓÚÑ]+$/.test(name)) { // Modificar la expresión regular
      return false;
    }
  
    return true;
  }
  
  const isValidName2 = nombre2 => {
    const names = nombre2.trim().split(' ');
  
    if (names.length !== 1) {
      return false;
    }
  
    const name = names[0];
  
    if (!/^[a-zA-ZáéíóúñÁÉÍÓÚÑ]+$/.test(name)) { // Modificar la expresión regular
      return false;
    }
  
    return true;
  }
  
  const isValidApellidos = apellidos => {
    const names = apellidos.trim().split(' ');
  
    if (names.length < 1) {
      return false; // no hay suficientes nombres
    }
  
    for (const name of names) {
      if (!/^[a-zA-ZáéíóúñÁÉÍÓÚÑ]+$/.test(name)) {
        return false; // uno de los nombres no está en el formato correcto
      }
    }
  
    return true;
  }
  
  const isValidCedula = (nacionalidadValue, cedulaValue) => {
    if (nacionalidadValue === 'venezolano') {
      if (!/^[0-9]{7,8}$/.test(cedulaValue)) {
        return false; // el valor del campo de cédula no tiene 8 dígitos
      }
    } else if (nacionalidadValue === 'extranjero') {
      if (!/^[0-9]{9}$/.test(cedulaValue)) {
        return false; // el valor del campo de cédula no tiene 9 dígitos
      }
    } else if (nacionalidadValue === 'pasaporte') {
      if (!/^[a-zA-Z0-9]{6,15}$/.test(cedulaValue)) {
        return false; // el valor del campo de pasaporte no tiene entre 6 y 15 caracteres alfanuméricos
      }
    }
  
    return true;
  }
  
  const isValidEmail = emailRegister => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(gmail|hotmail|yahoo|outlook)\.(com|info|es|io)$/;
      return re.test(String(emailRegister).toLowerCase());
  }
  
  const isValidPhone = (areaPhoneValue, numberPhoneValue) => {
    if (areaPhoneValue === '0416' || areaPhoneValue === '0426' || areaPhoneValue === '0414' || areaPhoneValue === '0424' || areaPhoneValue === '0412') {
      if (!/^[0-9]{7}$/.test(numberPhoneValue)) {
        return false; // el valor del campo de cédula no tiene 7 dígitos
      }
    }
    return true;
  }
  
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
  
  const isValidPagosData = pagosData => {
    const reNumber = /^[0-9]+$/;
    return reNumber.test(pagosData);
  }


  
  ///////////////////////////VALIDACIONES CONFIRMADAS//
  const validateInputs = () => {
    const nombreValue = nombre.value.trim();
    const nombre2Value = nombre2.value.trim();
    const apellidosValue = apellidos.value.trim();    
    const cedulaValue = cedula.value.trim();
    const emailValue = email.value.trim();
    const numberPhoneValue = numberPhone.value.trim();
    const direccion1Value = direccion1.value.trim();
    const ciudadValue = ciudad.value.trim();
  
    const fechaCitaValue = fechaCita.value.trim();
    const horaCitaValue = horaCita.value.trim();
  
    if(nombreValue === '') {
      setError(nombre, 'Campo requerido');
    } else if (!isValidName(nombreValue)) {
      setError(nombre, 'Error en el formato');
    } else {
      setSuccess(nombre);
    }
  
    if (nombre2Value !== '') {
      if (!isValidName2(nombre2Value)) {
        setError(nombre2, 'Error en el formato');
      } else {
        setSuccess(nombre2);
      }
    } else {
      setSuccess(nombre2);
    }    
  
    if(apellidosValue === '') {
      setError(apellidos, 'Campo requerido');
    } else if (!isValidApellidos(apellidosValue)) {
      setError(apellidos, 'Error en el formato');
    } else {
      setSuccess(apellidos);
    }
  
    if (cedulaValue === '') {
      setError(cedula, 'Campo requerido');
    } else if (!isValidCedula(nacionalidad.value, cedulaValue)) {
      setError(cedula, 'Proporcionar una cédula válida');
    } else {
      setSuccess(cedula);
    }



    let nombreAcompañanteValue = '';
    let apellidoAcompañanteValue = '';
    if (inputBox.classList.contains('show')) {
      nombreAcompañanteValue = nombreAcompañante.value.trim();
      apellidoAcompañanteValue = apellidoAcompañante.value.trim();
    }
  
    if (inputBox.classList.contains('show')) {
      if(nombreAcompañanteValue === '') {
        setError(nombreAcompañante, 'Campo requerido');
      } else if (!isValidName(nombreAcompañanteValue)) {
        setError(nombreAcompañante, 'Error en el formato');
      } else {
        setSuccess(nombreAcompañante);
      }
  
      if(apellidoAcompañanteValue === '') {
        setError(apellidoAcompañante, 'Campo requerido');
      } else if (!isValidApellidos(apellidoAcompañanteValue)) {
        setError(apellidoAcompañante, 'Error en el formato');
      } else {
        setSuccess(apellidoAcompañante);
      }
    }
  

    
    if(emailValue === '') {
      setError(email, 'Campo requerido');
    } else if (!isValidEmail(emailValue)) {
      setError(email, 'Proporcionar un email válido');
    } else {
      setSuccess(email);
    }
  
    if (numberPhoneValue === '') {
      setError(numberPhone, 'Campo requerido');
    } else if (!isValidPhone(areaPhone.value, numberPhoneValue)) {
      setError(numberPhone, 'Proporcionar un número válido');
    } else {
      setSuccess(numberPhone);
    }
  
    if(direccion1Value === '') {
      setError(direccion1, 'Campo requerido');
    } else {
      setSuccess(direccion1);
    }
  
    if(ciudadValue === '') {
      setError(ciudad, 'Campo requerido');
    } else {
      setSuccess(ciudad);
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



  //   let pagosDataPM1Value = '';
  //   let pagosDataPM2Value = '';
  //   if (!inputBox2.classList.contains('close')) {
  // pagosDataPM1Value = pagosDataPM1.value.trim();
  // pagosDataPM2Value = pagosDataPM2.value.trim();
  //   }

  //   if (!inputBox2.classList.contains('close')) {
  // if(pagosDataPM1Value === '') {
  //   setError(pagosDataPM1, 'Campo requerido');
  // } else if (pagosDataPM1Value.length < 4) {
  //   setError(pagosDataPM1, 'Debe ingresar 4 dígitos');
  // } else if (!isValidPagosData(pagosDataPM1Value)) {
  //   setError(pagosDataPM1, 'Error en el formato');
  // } else {
  //   setSuccess(pagosDataPM1);
  // }

  // if(pagosDataPM2Value === '') {
  //   setError(pagosDataPM2, 'Campo requerido');
  // } else if (!isValidPagosData(pagosDataPM2Value)) {
  //   setError(pagosDataPM2, 'Error en el formato');
  // } else {
  //   setSuccess(pagosDataPM2);
  // }
  //   }




  // let pagosDataEfectivoValue = '';
  // if (!inputBox3.classList.contains('close')) {
  //   pagosDataEfectivoValue = pagosDataEfectivo.value.trim();
  // }

  // if (!inputBox3.classList.contains('close')) {
  // if(pagosDataEfectivoValue === '') {
  //   setError(pagosDataEfectivo, 'Campo requerido');
  // } else if (!isValidPagosData(pagosDataEfectivoValue)) {
  //   setError(pagosDataEfectivo, 'Error en el formato');
  // } else {
  //   setSuccess(pagosDataEfectivo);
  // }
  // }

  
  }
  
  
  function validateGenero() {
      if (femenino.checked) {
        return "femenino";
      } else if (masculino.checked) {
        return "masculino";
      } else {
        return null;
      }
  }
  
  function validateEdad() {
      if (adulto.checked) {
        return "adulto";
      } else if (adolescente.checked) {
        return "adolescente";
      } else if (nino.checked) {
        return "niño";
      } else {
        return null;
      }
    }

  export default {
    inputBox,
    setError,
    setSuccess,
    isValidName,
    isValidName2,
    isValidApellidos,
    isValidCedula,
    isValidEmail,
    isValidPhone,
    isValidDate,
    isValidHora,
    isValidPagosData,
    validateInputs,
    validateGenero,
    validateEdad
  }
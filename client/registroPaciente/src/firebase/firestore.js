//CODIGO DEL SHOW Y CLOSE//

const inputBox = document.querySelector(".input-box.input-oculto");

const inputBox2 = document.querySelector('.main-box-2.main1')
const inputBox3 = document.querySelector('.main-box-2.main2')

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

const pagosDataPM1 = document.getElementById('pagosDataPM1');
const pagosDataPM2 = document.getElementById('pagosDataPM2');

const btnGuardar = document.getElementById("btnGuardar");

let userObject = {};

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
    if (!/^[0-9]{6,8}$/.test(cedulaValue)) {
      return false; // el valor del campo de cédula no tiene de 6 a 8 dígitos
    }
  } else if (nacionalidadValue === 'extranjero') {
    if (!/^[0-9]{8,9}$/.test(cedulaValue)) {
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
  const currentDate = new Date();
  const selectedDateObject = new Date(selectedDate);
  return selectedDateObject >= currentDate;
}

const isValidHora = horaCitaValue => {
  const horaCitaObject = new Date(`2000-01-01T${horaCitaValue}`);
  const horaMinima = new Date(`2000-01-01T06:00:00`);
  const horaMaxima = new Date(`2000-01-01T18:00:00`);
  return !isNaN(horaCitaObject) && horaCitaObject >= horaMinima && horaCitaObject <= horaMaxima;
}

const isValidPagosNumber = pagosData => {
  const reNumber = /^[0-9]+$/;
  return reNumber.test(pagosData);
}

const isValidPagosDigitos = pagosData => {
  const reNumber = /^[0-9]+$/;
  return pagosData.length >= 4 && reNumber.test(pagosData);
}

///////////////////////////VALIDACIONES CONFIRMADAS//
const validateInputs = () => {
  const nombreValue = nombre.value.trim();
  const nombre2Value = nombre2.value.trim();
  const apellidosValue = apellidos.value.trim();

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
    } else if (!isValidName(apellidoAcompañanteValue)) {
      setError(apellidoAcompañante, 'Error en el formato');
    } else {
      setSuccess(apellidoAcompañante);
    }
  }

  let pagosDataEfectivoValue = '';
  if (inputBox2.classList.contains('show')){
    pagosDataEfectivoValue = pagosDataEfectivo.value.trim();
  }

  if (inputBox2.classList.contains('show')) {
    if(pagosDataEfectivoValue === '') {
      setError(pagosDataEfectivo, 'Campo requerido');
    } else if (!isValidPagosNumber(pagosDataEfectivoValue)) {
      setError(pagosDataEfectivo, 'Error en el formato');
    } else {
      setSuccess(pagosDataEfectivo);
    }
  }

  let pagosDataPM1Value = '';
  let pagosDataPM2Value = '';
  if (inputBox3.classList.contains('show')) {
    pagosDataPM1Value = pagosDataPM1.value.trim();
    pagosDataPM2Value = pagosDataPM2.value.trim();
  }

  if (inputBox3.classList.contains('show')) {
    if(pagosDataPM1Value === '') {
      setError(pagosDataPM1, 'Campo requerido');
    } else if (!isValidPagosDigitos(pagosDataPM1Value)) {
      setError(pagosDataPM1, 'Error en el formato');
    } else {
      setSuccess(pagosDataPM1);
    }

    if(pagosDataPM2Value === '') {
      setError(pagosDataPM2, 'Campo requerido');
    } else if (!isValidPagosNumber(pagosDataPM2Value)) {
      setError(pagosDataPM2, 'Error en el formato');
    } else {
      setSuccess(pagosDataPM2);
    }
  }



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

  if(nombre2Value === '') {
    setError(nombre2, 'Campo requerido');
  } else if (!isValidName2(nombre2Value)) {
    setError(nombre2, 'Error en el formato');
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
  
  if(pagosDataEfectivoValue === '') {
    setError(pagosDataEfectivo, 'Campo requerido');
  } else if (!isValidPagosNumber(pagosDataEfectivoValue)) {
    setError(pagosDataEfectivo, 'Error en el formato');
  } else {
    setSuccess(pagosDataEfectivo);
  }

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

parentezco.addEventListener("change", () => {
    const selectedParentezco = parentezco.value;
    userObject.parentezco = selectedParentezco;
});

nacionalidad.addEventListener("change", () => {
    const selectedValue = nacionalidad.value;
    userObject.nacionalidad = selectedValue;
});

areaPhone.addEventListener("change", () => {
    const selectedPhone = areaPhone.value;
    userObject.areaPhone = selectedPhone;
});

primeraConsulta.addEventListener("change", () => {
    const selectedConsulta = primeraConsulta.value;
    userObject.primeraConsulta = selectedConsulta;
});

tipoConsulta.addEventListener("change", () => {
    const selectedTipo = tipoConsulta.value;
    userObject.tipoConsulta = selectedTipo;
});


async function getUsuarios(database) {
    const usuariosCollection = collection(database, 'PacienteRegistro');
    const result = await getDocs(usuariosCollection);
    const usuariosList = result.docs.map(doc => doc.data());
    return usuariosList;
};

try {
    getUsuarios(db).then(response => console.log(response));
} catch (err) {
    console.log(err);
}

/////////////////////CREATE NEW REGISTER//

async function createNewUser(database, userDB){
    const newRegister = await addDoc(collection(database, 'PacienteRegistro'), userDB);
    return newRegister;
}

btnGuardar.addEventListener("click", () => {
    try {
      const generoValid = validateGenero();
      const edadValid = validateEdad();
      let isValid = true; // variable para verificar si todas las entradas son válidas
      validateInputs();
  
      // Verificar si hay algún error en las entradas
      const errorDisplays = document.querySelectorAll(".error");
      errorDisplays.forEach(display => {
        if (display.innerText !== '') {
          isValid = false;
        }
      });
  
      if (isValid) {
        userObject = {
          generoValid: generoValid,
          edadValid: edadValid,
          nombre: nombre.value,
          nombre2: nombre2.value,
          apellidos: apellidos.value,
          nombreAcompañante: nombreAcompañante.value,
          apellidoAcompañante: apellidoAcompañante.value,
          parentezco: parentezco.value,
          nacionalidad: nacionalidad.value,
          cedula: cedula.value,
          email: email.value,
          areaPhone: areaPhone.value,
          numberPhone: numberPhone.value,
          direccion1: direccion1.value,
          direccion2: direccion2.value,
          ciudad: ciudad.value,
          estado: estado.value,
          postal: postal.value,
          primeraConsulta: primeraConsulta.value,
          tipoConsulta: tipoConsulta.value,
          textArea: textArea.value,
          fechaCita: fechaCita.value,
          horaCita: horaCita.value,

          pagosDataEfectivo: pagosDataEfectivo.value,
          pagosDataPM1: pagosDataPM1.value,
          pagosDataPM2: pagosDataPM2.value,
        }
        createNewUser(db, userObject).then(response => {
          console.log(response.id);
          // Limpiar los inputs
          femenino.checked = false;
          masculino.checked = false;
          adulto.checked = false;
          adolescente.checked = false;
          nino.checked = false;

          nombre.value = '';
          nombre2.value = '';
          apellidos.value = '';
          nombreAcompañante.value = '';
          apellidoAcompañante.value = '';
          parentezco.value = '';
          nacionalidad.value = '';
          cedula.value = '';
          email.value = '';
          areaPhone.value = '';
          numberPhone.value = '';
          direccion1.value = '';
          direccion2.value = '';
          ciudad.value = '';
          estado.value = '';
          postal.value = '';
          primeraConsulta.value = '';
          tipoConsulta.value = '';
          textArea.value = '';
          fechaCita.value = '';
          horaCita.value = '';
          pagosDataEfectivo.value = '';
          pagosDataPM1.value = '';
          pagosDataPM2.value = '';
        });
      } else {
        // Mostrar mensaje de error o hacer cualquier otra acción apropiada
        console.log("Por favor, corrija los errores en las entradas");
      }
    } catch (error) {
      console.error(error);
    }
  })
  


import validate from './validacionRegistro.js'
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

    const btnPerfil = document.getElementById('btnPerfil');
const btnBusquedaSecreatario = document.getElementById('btnBusqueda');
const btnPagos = document.getElementById('btnPagos');
const btnFinalizar = document.getElementById('btnFinalizar');


btnBusquedaSecreatario.addEventListener('click', () => {
  window.location.pathname = '/busquedaSecretario';
})

btnPagos.addEventListener('click', () => {
  window.location.pathname = '/pagosSecretario';
})


btnFinalizar.addEventListener('click', () => {
  window.location.pathname = `/secretario/${token2}`;
})

const getTokenOnSessionStorage = window.sessionStorage.getItem('firebase:authUser:AIzaSyDPgalqYfnXzAW6kQNyW4Kp9MRLxif39W4:[DEFAULT]')


const getToken = JSON.parse(getTokenOnSessionStorage);

const token2 = getToken.uid;


console.log(token2);

btnPerfil.addEventListener('click', () => {
  window.location.pathname = `/secretario/${token2}`;
})



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

// const pagosDataEfectivo = document.getElementById('pagosDataEfectivo');

// const pagosDataPM1 = document.getElementById('pagosDataPM1');
// const pagosDataPM2 = document.getElementById('pagosDataPM2');

const btnGuardar = document.getElementById('btnGuardar');


const savePaciente = async (paciente) => {
  console.log(paciente);
  const sendData = await fetch('http://localhost:3100/api/registro', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(paciente),
  });
  const newPaciente = await sendData.json();
  console.log(newPaciente);
  return newPaciente;
}

const saveHistoriales = async (cedula, datosHistorial) => {
  console.log(cedula, datosHistorial);
  const sendData = await fetch('http://localhost:3100/api/vistaHistorial', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        cedula,
        datosHistorial
      }),
  });
  const newHistorial = await sendData.json();
  console.log(newHistorial);
  return newHistorial;
}

const validatePaciente = async () => {
  const queryCedula = cedula.value;
  const dataList = await fetch(`http://localhost:3100/api/registro?cedula=${queryCedula}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
    }
  });
  const dataResult = await dataList.json();
  console.log(dataResult);
  return dataResult;
}

const updatePaciente = async (pacienteId, pacienteData) => {
  console.log(pacienteId, pacienteData);
  const sendData = await fetch(`http://localhost:3100/api/registro/${pacienteId}`, {
      method: 'PATCH',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(pacienteData),
  });
  const updatedPaciente = await sendData.json();
  console.log(updatedPaciente);
  return updatedPaciente;
}

let pacienteObject = {};

btnGuardar.addEventListener("click", () => {
  let isValid = true; // variable para verificar si todas las entradas son válidas
  const generoValid = validate.validateGenero();
  const edadValid = validate.validateEdad();
  try {
    validate.validateInputs();

    // Verificar si hay algún error en las entradas
    const errorDisplays = document.querySelectorAll(".error");
    errorDisplays.forEach(display => {
      if (display.innerText !== '') {
        isValid = false;
      }
    });
  } catch(error){
    console.log(error)
  }

  if (isValid) {
    pacienteObject = {
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

      'pagosDataEfectivo': '',
      'pagosDataPM1': '',
      'pagosDataPM2': '',

      "cancelado": false,
      "pagoNoRealizado": false,
      "checkbox": "disabled"

    }
    if (isPacienteRegistered) {
      // Enviar una solicitud PATCH para actualizar la información del paciente
      validatePaciente()
        .then((pacienteObjectGlobal) => {
          console.log(pacienteObjectGlobal.message[0].paciente)
          const prueba = JSON.stringify(pacienteObjectGlobal.message[0].paciente);
          console.log(prueba)
          updatePaciente(pacienteObjectGlobal.message[0].id, pacienteObject)
            .then((respuestaPaciente) => {
              console.log(respuestaPaciente);
              window.location.pathname = '/busquedaSecretario'
            }) 
            .catch((error) => {
              console.error(error)
            })
        })
      
    } else {
      // Enviar una solicitud POST para crear un nuevo paciente
      const arregloConDatosDelHistorial = [];
      savePaciente(pacienteObject)
        .then((respuestaPaciente) => {
            console.log(respuestaPaciente);
            saveHistoriales(respuestaPaciente.message.cedula, arregloConDatosDelHistorial)
            .then((historialCreado) =>{
              console.log(historialCreado)
              window.location.pathname = '/busquedaSecretario'
            })
            .catch((error) => console.log(error))
        }) 
        .catch((error) => {
          console.error(error)
        });
    }
  } else {
    // Mostrar mensaje de error o hacer cualquier otra acción apropiada
    console.log("Por favor, corrija los errores en las entradas");
    // Mostrar mensaje de error o hacer cualquier otra acción apropiada
    Swal.fire({
      title: 'Error en el formato',
      icon: 'error',
      text: 'Por favor, corrija los errores en las entradas',
  });
  }
});


parentezco.addEventListener("change", () => {
    const selectedParentezco = parentezco.value;
    pacienteObject.parentezco = selectedParentezco;
});

nacionalidad.addEventListener("change", () => {
    const selectedValue = nacionalidad.value;
    pacienteObject.nacionalidad = selectedValue;
});

areaPhone.addEventListener("change", () => {
    const selectedPhone = areaPhone.value;
    pacienteObject.areaPhone = selectedPhone;
});

primeraConsulta.addEventListener("change", () => {
    const selectedConsulta = primeraConsulta.value;
    pacienteObject.primeraConsulta = selectedConsulta;
});

tipoConsulta.addEventListener("change", () => {
    const selectedTipo = tipoConsulta.value;
    pacienteObject.tipoConsulta = selectedTipo;
});


const btnSearch = document.getElementById('btnSearch');

let isPacienteRegistered = false;

btnSearch.addEventListener('click', () => {
  validatePaciente()
  .then((paciente) => {
    console.log(paciente);
    if (paciente.message.length === 1){
      isPacienteRegistered = true;

      const pacienteData = paciente.message[0].paciente;
      nombre.value = pacienteData.nombre;
      nombre2.value = pacienteData.nombre2;
      apellidos.value = pacienteData.apellidos;
      nombreAcompañante.value = pacienteData.nombreAcompañante;
      apellidoAcompañante.value = pacienteData.apellidoAcompañante;
      email.value = pacienteData.email;
      numberPhone.value = pacienteData.numberPhone;
      direccion1.value = pacienteData.direccion1;
      direccion2.value = pacienteData.direccion2;
      ciudad.value = pacienteData.ciudad;
      estado.value = pacienteData.estado;
      postal.value = pacienteData.postal;

      nacionalidad.value = pacienteData.nacionalidad;
      parentezco.value = pacienteData.parentezco;
      areaPhone.value = pacienteData.areaPhone;
      primeraConsulta.value = 'sucesiva';
      pacienteData.cancelado = 'false';

      // Marcar el input tipo radio correspondiente según el valor de 'generoValid'
      if (pacienteData.generoValid === 'masculino') {
        document.getElementById('masculino').checked = true;
      } else if (pacienteData.generoValid === 'femenino') {
        document.getElementById('femenino').checked = true;
      }

      // Marcar el input tipo radio correspondiente según el valor de 'edadValid'
      if (pacienteData.edadValid === 'adulto') {
        document.getElementById('adulto').checked = true;
      } else if (pacienteData.edadValid === 'adolescente') {
        document.getElementById('adolescente').checked = true;
        mostrarInputBox(); // Llamada a la función mostrarInputBox
      } else if (pacienteData.edadValid === 'niño') {
        document.getElementById('niño').checked = true;
        mostrarInputBox(); // Llamada a la función mostrarInputBox
      }  
    } else {
      isPacienteRegistered = false;
      // Mostrar el mensaje de error con SweetAlert2
      Swal.fire({
        title: 'Usuario no existe',
        icon: 'error',
      })
    }})
    .catch(error => console.log(error) )
})


const adolescenteInput = document.getElementById("adolescente");
const ninoInput = document.getElementById("niño");
const adultoInput = document.getElementById("adulto");
const inputBox = document.querySelector(".input-box.input-oculto");

adolescenteInput.addEventListener("change", mostrarInputBox);
ninoInput.addEventListener("change", mostrarInputBox);
adultoInput.addEventListener("change", mostrarInputBox);

function mostrarInputBox() {
  if (adolescenteInput.checked || ninoInput.checked) {
    inputBox.classList.remove("close");
    inputBox.classList.add("show");
  } else if (adultoInput.checked) {
    inputBox.classList.add("close");
    inputBox.classList.remove("show");
  } else {
    inputBox.classList.add("close");
    inputBox.classList.remove("show");
  }
}
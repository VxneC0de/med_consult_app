import {getPaciente, updatePaciente} from './configFetchAPI.js';
import validate from './validacionPatch.js'

//ACOMPAÑANTE//
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

//////////////////////////VARIABLES REGISTRO//

let idResult;

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

let paciente;

window.onload = async function() {
  const dataResult = await getPaciente();
  idResult = dataResult.idPaciente;
  paciente = dataResult.datosDelPaciente;

  

// Comprobamos si encontramos un 'paciente'
if (!paciente) {
  console.error('No se encontró un paciente en los datos devueltos');
  return;
}

console.log(paciente);

  // Extraemos las propiedades 'nombre', 'nombre2', 'apellidos' y 'generoValid' de 'registroPaciente'
  const nombrePaciente = paciente.nombre;
  const nombre2Paciente = paciente.nombre2;
  const apellidosPaciente = paciente.apellidos;
  const generoValidPaciente = paciente.generoValid;
  const edadValidPaciente = paciente.edadValid;
  const nombreAcompañante = paciente.nombreAcompañante;
  const apellidoAcompañante = paciente.apellidoAcompañante;
  const cedula = paciente.cedula;
  const email = paciente.email;
  const numberPhone = paciente.numberPhone;
  const direccion1 = paciente.direccion1;
  const direccion2 = paciente.direccion2;
  const ciudad = paciente.ciudad;
  const estado = paciente.estado;
  const postal = paciente.postal;


  // Plasmar esos valores en los inputs del HTML
  document.getElementById('nombre').value = nombrePaciente;
  document.getElementById('nombre2').value = nombre2Paciente;
  document.getElementById('apellidos').value = apellidosPaciente;
  document.getElementById('nombreAcompañante').value = nombreAcompañante;
  document.getElementById('apellidoAcompañante').value = apellidoAcompañante;
  document.getElementById('cedula').value = cedula;
  document.getElementById('email').value = email;
  document.getElementById('numberPhone').value = numberPhone;
  document.getElementById('direccion1').value = direccion1;
  document.getElementById('direccion2').value = direccion2;
  document.getElementById('ciudad').value = ciudad;
  document.getElementById('estado').value = estado;
  document.getElementById('postal').value = postal;

  // Marcar el input tipo radio correspondiente según el valor de 'generoValid'
  if (generoValidPaciente === 'masculino') {
    document.getElementById('masculino').checked = true;
  } else if (generoValidPaciente === 'femenino') {
    document.getElementById('femenino').checked = true;
  }
  
  // Marcar el input tipo radio correspondiente según el valor de 'edadValid'
  if (edadValidPaciente === 'adulto') {
    document.getElementById('adulto').checked = true;
  } else if (edadValidPaciente === 'adolescente') {
    document.getElementById('adolescente').checked = true;
    mostrarInputBox(); // Llamada a la función mostrarInputBox
  } else if (edadValidPaciente === 'niño') {
    document.getElementById('niño').checked = true;
    mostrarInputBox(); // Llamada a la función mostrarInputBox
  }  

  // Establecer el valor seleccionado en el selector
  parentezco.value = paciente.parentezco;
  nacionalidad.value = paciente.nacionalidad;
  areaPhone.value = paciente.areaPhone;
  textArea.value = paciente.textArea;
  primeraConsulta.value = paciente.primeraConsulta;
  tipoConsulta.value = paciente.tipoConsulta;
  fechaCita.value = paciente.fechaCita;
  horaCita.value = paciente.horaCita;
};

const btnGuardar = document.getElementById('btnGuardar');
let pacienteObject = {};


btnGuardar.addEventListener("click", async () => {
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
  } catch (error) {
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
    };

    // Enviar una solicitud PATCH para actualizar la información del paciente
    updatePaciente(idResult, pacienteObject)
      .then((respuestaPaciente) => {
        console.log(respuestaPaciente);
         window.location.pathname = `/busqueda`
      })
      .catch((error) => {
        console.error(error);
      });
  } else {
    console.log("Por favor, corrija los errores en las entradas");
  }
});




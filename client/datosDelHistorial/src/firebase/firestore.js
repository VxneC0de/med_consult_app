import {
    initializeApp
} from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js'

import {getFirestore, 
        collection, 
        getDocs,
        setDoc,
        updateDoc,
        doc,
        addDoc} from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js'

const firebaseConfig = {
    apiKey: "AIzaSyA5lwBblxp3kpWNfz8IaKf6_dJRcUifucA",
    authDomain: "medconsult-10e43.firebaseapp.com",
    projectId: "medconsult-10e43",
    storageBucket: "medconsult-10e43.appspot.com",
    messagingSenderId: "983534041425",
    appId: "1:983534041425:web:52a1482316a9233d35fb70"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

//////////////////////////VARIABLES REGISTRO//

const antecedentesPrenatales = document.getElementById("antecedentesPrenatales");
const antecedentesNatales = document.getElementById("antecedentesNatales");
const antecedentesPersonales = document.getElementById("antecedentesPersonales");
const antecedentesFamiliares = document.getElementById("antecedentesFamiliares");
const complicaciones = document.getElementById("complicaciones");

const sanguineoA = document.getElementById("sanguineoA");
const sanguineoB = document.getElementById("sanguineoB");
const sanguineoO = document.getElementById("sanguineoO");
const sanguineoAB = document.getElementById("sanguineoAB");

const factorRhMas = document.getElementById("factorRh+");
const factorRhMenos = document.getElementById("factorRh-");

const historialAlimenticio = document.getElementById("historialAlimenticio");
const desarrolloPsicomotor = document.getElementById("desarrolloPsicomotor");
const alergias = document.getElementById("alergias");
const notasObservaciones = document.getElementById("notasObservaciones");


const checkboxes = document.querySelectorAll('input[type="checkbox"]');
checkboxes.forEach((checkbox) => {
  if (checkbox.checked) {
    objectInmunizacion[checkbox.value] = true;
  }
});
const objectInmunizacion = {};

const otrosInmunizacion = document.getElementById("otrosInmunizacion");

let userObject = {};

const horaCita = document.getElementById("horaCita");

const btnGuardar = document.getElementById("btnGuardar");

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

const isValidHora = horaCitaValue => {
    const horaCitaObject = new Date(`2000-01-01T${horaCitaValue}`);
    const horaMinima = new Date(`2000-01-01T06:00:00`);
    const horaMaxima = new Date(`2000-01-01T18:00:00`);
    return !isNaN(horaCitaObject) && horaCitaObject >= horaMinima && horaCitaObject <= horaMaxima;
}

///////////////////////////VALIDACIONES CONFIRMADAS//

const validateInputs = () => {
    const antecedentesPrenatalesValue = antecedentesPrenatales.value.trim();
    const antecedentesNatalesValue = antecedentesNatales.value.trim();
    const antecedentesPersonalesValue = antecedentesPersonales.value.trim();
    const antecedentesFamiliaresValue = antecedentesFamiliares.value.trim();
    const complicacionesValue = complicaciones.value.trim();

    const historialAlimenticioValue = historialAlimenticio.value.trim();
    const desarrolloPsicomotorValue = desarrolloPsicomotor.value.trim();
    const alergiasValue = alergias.value.trim();
    const notasObservacionesValue = notasObservaciones.value.trim();

    const horaCitaValue = horaCita.value.trim();
  
    if(antecedentesPrenatalesValue === '') {
      setError(antecedentesPrenatales, 'Campo requerido');
    } else {
      setSuccess(antecedentesPrenatales);
    }

    if(antecedentesNatalesValue === '') {
        setError(antecedentesNatales, 'Campo requerido');
    } else {
        setSuccess(antecedentesNatales);
    }

    if(antecedentesPersonalesValue === '') {
        setError(antecedentesPersonales, 'Campo requerido');
    } else {
        setSuccess(antecedentesPersonales);
    }

    if(antecedentesFamiliaresValue === '') {
        setError(antecedentesFamiliares, 'Campo requerido');
    } else {
        setSuccess(antecedentesFamiliares);
    }

    if(complicacionesValue === '') {
        setError(complicaciones, 'Campo requerido');
    } else {
        setSuccess(complicaciones);
    }

    if(historialAlimenticioValue === '') {
        setError(historialAlimenticio, 'Campo requerido');
    } else {
        setSuccess(historialAlimenticio);
    }

    if(desarrolloPsicomotorValue === '') {
        setError(desarrolloPsicomotor, 'Campo requerido');
    } else {
        setSuccess(desarrolloPsicomotor);
    }

    if(alergiasValue === '') {
        setError(alergias, 'Campo requerido');
    } else {
        setSuccess(alergias);
    }

    if(notasObservacionesValue === '') {
        setError(notasObservaciones, 'Campo requerido');
    } else {
        setSuccess(notasObservaciones);
    }

    if(horaCitaValue === '') {
      setError(horaCita, 'Campo requerido');
    } else if (!isValidHora(horaCitaValue)) {
      setError(horaCita, 'Hora inválida, el lapso de tiempo tiene que ser desde las 6:00 am hasta las 18:00pm')
    } else {
      setSuccess(horaCita);
    }

    const checkboxes = document.querySelectorAll('input[type="checkbox"]');

    // Objeto para almacenar los valores de los checkboxes seleccionados
    const objectInmunizacion = {};

    // Itera sobre los checkboxes seleccionados y agrega sus valores al objeto objectInmunizacion
    checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            objectInmunizacion[checkbox.value] = true;
        }
    });

    // Agrega objectInmunizacion al objeto userObject
    userObject.objectInmunizacion = objectInmunizacion;
  
}

function validateSanguineo() {
    if (sanguineoA.checked) {
        return "sanguineoA";
    } else if (sanguineoB.checked) {
        return "sanguineoB";
    } else if (sanguineoO.checked) {
        return "sanguineoO";
    } else if (sanguineoAB.checked) {
        return "sanguineoAB";
    } else {
        return null;
    }
}

function validateFactor() {
    if (factorRhMas.checked) {
      return "factorRh+";
    } else if (factorRhMenos.checked) {
      return "factorRh-";
    } else {
      return null;
    }
}



async function getUsuarios(database) {
    const usuariosCollection = collection(database, 'historialMedico');
    const result = await getDocs(usuariosCollection);
    const usuariosList = result.docs.map(doc => doc.data());
    return usuariosList;
};

try {
    getUsuarios(db).then(response => console.log(response));
} catch (err) {
    console.log(err);
}

/////////////////////CREATE NEW Historial//

async function createNewUser(database, userDB){
    const newRegister = await addDoc(collection(database, 'historialMedico'), userDB);
    return newRegister;
}

btnGuardar.addEventListener("click", () => {
    try {
      const sanguineoValid = validateSanguineo();
      const factorValid = validateFactor();
      let isValid = true; // variable para verificar si todas las entradas son válidas
      validateInputs();
  
      // Obtener los valores de los checkboxes seleccionados
      const checkboxes = document.querySelectorAll('input[type="checkbox"]');
      const objectInmunizacion = {};
      checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
          objectInmunizacion[checkbox.value] = true;
        }
      });
  
      // Verificar si hay algún error en las entradas
      const errorDisplays = document.querySelectorAll(".error");
      errorDisplays.forEach(display => {
        if (display.innerText !== '') {
          isValid = false;
        }
      });
  
      if (isValid) {
        userObject = {
          sanguineoValid: sanguineoValid,
          factorValid: factorValid,
  
          antecedentesPrenatales: antecedentesPrenatales.value,
          antecedentesNatales: antecedentesNatales.value,
          antecedentesPersonales: antecedentesPersonales.value,
          antecedentesFamiliares: antecedentesFamiliares.value,
          complicaciones: complicaciones.value,
  
          historialAlimenticio: historialAlimenticio.value,
          desarrolloPsicomotor: desarrolloPsicomotor.value,
          alergias: alergias.value,
          notasObservaciones: notasObservaciones.value,
  
          objectInmunizacion: objectInmunizacion,

          otrosInmunizacion: otrosInmunizacion.value,
          horaCita: horaCita.value
        };
  
        createNewUser(db, userObject).then(response => {
          console.log(response.id);
          // Limpiar los inputs
          antecedentesPrenatales.value = '';
          antecedentesNatales.value = '';
          antecedentesPersonales.value = '';
          antecedentesFamiliares.value = '';
          complicaciones.value = '';

          historialAlimenticio.value = '';
          desarrolloPsicomotor.value = '';
          alergias.value = '';
          notasObservaciones.value = '';

          objectInmunizacion.value = false;

          location.reload();
        });
      } else {
        // Mostrar mensaje de error o hacer cualquier otra acción apropiada
        console.log("Por favor, corrija los errores en las entradas");
      }
    } catch (error) {
      console.error(error);
    }
  })
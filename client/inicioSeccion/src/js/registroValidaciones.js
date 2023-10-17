const nameComplete = document.getElementById("nameComplete");
const identiNational = document.getElementById("identiNational");
const identiCedula = document.getElementById("identiCedula");
const emailRegister = document.getElementById("emailRegister");
const passwordRegister = document.getElementById("passwordRegister");
const passwordConfirmedRegister = document.getElementById("passwordConfirmedRegister");



////////////////////////////MENSAJE ERROR//
const setError = (element, message) => {
  const errorDisplay = element.parentElement.querySelector(".error");

  errorDisplay.innerText = message;
  errorDisplay.style.display = 'block';
}

const setSuccess = element => {
  const inputBox = element.parentElement;
  const errorDisplay = inputBox.querySelector(".error");

  errorDisplay.innerText = '';
  inputBox.classList.remove('error');
}

///////////////////////VALIDACIONES DE INPUTS//

const isValidFullName = nameComplete => {
  const names = nameComplete.trim().split(' ');

  if (names.length < 2) {
    return false; // no hay suficientes nombres
  }

  for (const name of names) {
    if (!/^[a-zA-ZáéíóúñÁÉÍÓÚÑ]{2,}$/.test(name)) {
      return false; // uno de los nombres no está en el formato correcto
    }
  }

  return true;
}

const isValidCedula = (identiNationalValue, identiCedulaValue) => {
  if (identiNationalValue === 'venezolano') {
    if (!/^[0-9]{6,8}$/.test(identiCedulaValue)) {
      return false; // el valor del campo de cédula no tiene 8 dígitos
    }
  } else if (identiNationalValue === 'extranjero') {
    if (!/^[0-9]{9}$/.test(identiCedulaValue)) {
      return false; // el valor del campo de cédula no tiene 9 dígitos
    }
  } else if (identiNationalValue === 'pasaporte') {
    if (!/^[a-zA-Z0-9]{6,15}$/.test(identiCedulaValue)) {
      return false; // el valor del campo de pasaporte no tiene entre 6 y 15 caracteres alfanuméricos
    }
  }

  return true;
}

const isValidEmail = emailRegister => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(gmail|hotmail|yahoo|outlook)\.(com|info|es|io)$/;
    return re.test(String(emailRegister).toLowerCase());
}

const isValidPassword = password => {
  const specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
  return specialCharacters.test(password);
}

const isValidPassword2 = password2 => {
  const numberCharacters = /\d/;
  return numberCharacters.test(password2);
}

const isValidPassword3 = password3 => {
  const letraCharacters = /[a-zA-ZáéíóúñÁÉÍÓÚÑ]{4,}/;
  return letraCharacters.test(password3);
}

///////////////////////////VALIDACIONES CONFIRMADAS//
const validateInputs = () => {
  const nameCompleteValue = nameComplete.value.trim();
  const identiCedulaValue = identiCedula.value.trim();
  const emailRegisterValue = emailRegister.value.trim();
  const passwordRegisterValue = passwordRegister.value.trim();
  const passwordConfirmedRegisterValue = passwordConfirmedRegister.value.trim();

  if(nameCompleteValue === '') {
    setError(nameComplete, 'El nombre y apellido es requerido');
  } else if (!isValidFullName(nameCompleteValue)) {
    setError(nameComplete, 'Error en el formato');
  } else {
    setSuccess(nameComplete);
  }

  if (identiCedulaValue === '') {
    setError(identiCedula, 'La cédula es requerida');
  } else if (!isValidCedula(identiNational.value, identiCedulaValue)) {
    setError(identiCedula, 'Proporcionar una cédula válida');
  } else {
    setSuccess(identiCedula);
  }

  if(emailRegisterValue === '') {
    setError(emailRegister, 'El email es requerido');
  } else if (!isValidEmail(emailRegisterValue)) {
    setError(emailRegister, 'Proporcionar un email válido');
  } else {
    setSuccess(emailRegister);
  }

  if(passwordRegisterValue === '') {
    setError(passwordRegister, 'La contraseña es requerida');
  } else if (passwordRegisterValue.length < 8 ) {
    setError(passwordRegister, 'Debe tener al menos 8 caracteres');
  } else if (!isValidPassword(passwordRegisterValue)) {
    setError(passwordRegister, 'Debe tener al menos un caracter especial');
  } else if (!isValidPassword2(passwordRegisterValue)) {
    setError(passwordRegister, 'Debe tener al menos un número');
  } else if (!isValidPassword3(passwordRegisterValue)) {
    setError(passwordRegister, 'Debe tener al menos 4 letras');
  } else {
    setSuccess(passwordRegister);
  }

  if(passwordConfirmedRegisterValue === '') {
    setError(passwordConfirmedRegister, 'Por favor, confirme su contraseña');
  } else if (passwordConfirmedRegisterValue !== passwordRegisterValue) {
    setError(passwordConfirmedRegister, "Las contraseñas no coinciden");
  } else {
    setSuccess(passwordConfirmedRegister);
}

}

// function validate() {
//     if (doctor.checked) {
//       return "doctor";
//     } else if (secretario.checked) {
//       return "secretario";
//     } else {
//       return null;
//     }
// }

// identiNational.addEventListener("change", () => {
//     const selectedValue = identiNational.value;
//     userObject.identiNational = selectedValue;
// });



////////////////////////////QUITAR EL ICONO DEL CANDADO//

const passwordIcon1 = document.getElementById("lock1");
const passwordIcon2 = document.getElementById("lock2");
const passwordIcon3 = document.getElementById("lockLogin");
const passwordLogin = document.getElementById("passwordLogin");

passwordRegister.addEventListener("focus", () => {
  passwordIcon1.classList.add("close");
});

passwordConfirmedRegister.addEventListener("focus", () => {
  passwordIcon2.classList.add("close");
});

passwordLogin.addEventListener("focus", () => {
  passwordIcon3.classList.add("close");
});

document.addEventListener("click", (event) => {
  const clickedElement = event.target;
  if (clickedElement !== passwordRegister) {
    passwordIcon1.classList.remove("close");
  }
  if (clickedElement !== passwordConfirmedRegister) {
    passwordIcon2.classList.remove("close");
  }
  if (clickedElement !== passwordLogin) {
    passwordIcon3.classList.remove("close");
  }
});

[passwordRegister, passwordConfirmedRegister, passwordLogin].forEach((input) => {
  input.addEventListener("blur", () => {
    if (input.value === "") {
      if (input === passwordRegister) {
        passwordIcon1.classList.remove("close");
      }
      else if (input === passwordConfirmedRegister) {
        passwordIcon2.classList.remove("close");
      }
      else {
        passwordIcon3.classList.remove("close");
      }
    }
  });
});

export default {
  setError,
  setSuccess,
  isValidFullName,
  isValidCedula,
  isValidEmail,
  isValidPassword,
  isValidPassword2,
  isValidPassword3,
  validateInputs
}
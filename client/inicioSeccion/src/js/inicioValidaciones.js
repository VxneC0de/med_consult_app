const emailLogin = document.getElementById("emailLogin");
const passwordLogin = document.getElementById("passwordLogin");


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
  
const validateInputs = () => {
const emailLoginValue = emailLogin.value.trim();
const passwordLoginValue = passwordLogin.value.trim();
  
if(emailLoginValue === '') {
    setError(emailLogin, 'Debe ingresar un Email');
} else {
    setSuccess(emailLogin);
}

if(passwordLoginValue === '') {
    setError(passwordLogin, 'Debe ingresar la contraseña');
} else {
    setSuccess(passwordLogin);
}
  
}

////////////////////////////QUITAR EL ICONO DEL CANDADO//

const passwordIcon1 = document.getElementById("lock1");
const passwordIcon2 = document.getElementById("lock2");
const passwordIcon3 = document.getElementById("lockLogin");

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
  validateInputs
}
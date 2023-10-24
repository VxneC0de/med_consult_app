//////////////////////////VARIABLES REGISTRO//

const email = document.getElementById('email')

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


const isValidEmail = emailRegister => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(gmail|hotmail|yahoo|outlook)\.(com|info|es|io)$/;
      return re.test(String(emailRegister).toLowerCase());
  }

   ///////////////////////////VALIDACIONES CONFIRMADAS//

  const validateInputs = () => {
    const emailValue = email.value.trim();

    if(emailValue === '') {
        setError(email, 'Campo requerido');
      } else if (!isValidEmail(emailValue)) {
        setError(email, 'Proporcionar un email válido');
      } else {
        setSuccess(email);
      }
  }

  export default {
    setError,
    setSuccess,
    isValidEmail,
    validateInputs,
  }
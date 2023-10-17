const selectConsulta = document.getElementById('selectConsulta');
const actuales = document.getElementById('actuales');
const anteriores = document.getElementById('anteriores');

const paciente = document.getElementById('paciente');
const pacienteAnteriores = document.getElementById('pacienteAnteriores');

selectConsulta.addEventListener('change', function() {
    if (this.value === 'actuales') {
      paciente.classList.remove('close');
      pacienteAnteriores.classList.add('close');
    } else if (this.value === 'anteriores') {
      paciente.classList.add('close');
      pacienteAnteriores.classList.remove('close');
    }
});

function validarNumeros(event) {
  const key = event.key;
  const inputValue = event.target.value + key;

  if (
    key === 'Backspace' ||
    key === 'Delete' ||
    key === 'ArrowLeft' ||
    key === 'ArrowRight'
  ) {
    // Permitir retroceso, eliminar y navegación
    return true;
  } else if (inputValue.length > 15 || /[^0-9]/.test(key)) {
    // Validar que no se exceda de 15 dígitos y solo sean números
    event.preventDefault();
    return false;
  } else {
    return true;
  }
}


const ciInput = document.getElementById('ciInput');
ciInput.addEventListener('keypress', validarNumeros);
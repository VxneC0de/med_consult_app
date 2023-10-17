// import {
//   getDollarPrices
// } from '/server/utils/tasaDolar/dolarPrecio.js';

// console.log(getDollarPrices);

//NAVAR ACTIVE O NO ACTIVE RESPONSIVE//

let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navigation");

menuIcon.onclick = () => {
  menuIcon.classList.toggle("bx-close");
  if (menuIcon.classList.contains("bx-close")) {
    menuIcon.innerHTML = '<ion-icon name="close"></ion-icon>';
    navbar.classList.add("active");
  } else {
    menuIcon.innerHTML = '<ion-icon name="menu"></ion-icon>';
    navbar.classList.remove("active");
  }
};

function closeMenu() {
  menuIcon.classList.remove("bx-close");
  menuIcon.innerHTML = '<ion-icon name="menu"></ion-icon>';
  navbar.classList.remove("active");
}

let navLinks2 = document.querySelectorAll(".navigation a");
navLinks2.forEach(link => {
  link.addEventListener("click", closeMenu);
});

//Navar seccion active//

// let sections = document.querySelectorAll("section");
// let navLinks = document.querySelectorAll("header nav a");

// window.onscroll = () => {
//     sections.forEach(sec => {
//         let top = window.scrollY;
//         let offset = sec.offsetTop - 150;
//         let height = sec.offsetHeight;
//         let id = sec.getAttribute("id");

//         if(top >= offset && top < offset + height) {
//             navLinks.forEach(links => {
//                 links.classList.remove("active");
//                 document.querySelector("header nav a[href*=" + id + "]").classList.add("active");
//             });
//         };
//     });
// }


//FECHA EN LA PANTALLA//

const fechaP = document.getElementById('fechaActual');
const now = new Date();

let dia = now.getDate();
let mes = now.getMonth() + 1; // Los meses en JavaScript comienzan desde 0
let año = now.getFullYear();

// Formatear la fecha en el formato dia-mes-año
let fechaActual = dia + "-" + mes + "-" + año;


document.getElementById('fechaActual').innerHTML = fechaActual;





  //ELECCION DE PAGO//

const selectPago = document.querySelector('.selectPago');
const mainEfectivo = document.querySelector('#mainEfectivo');
const mainBolivares = document.querySelector('#mainBolivares');

selectPago.addEventListener('change', function() {
  const valorSeleccionado = this.value;
  if (valorSeleccionado === 'efectivo') {
    mainEfectivo.classList.remove('close');
    this.value = 'ninguno'; // Establecer el valor del select en "Seleccionar"
  } else if (valorSeleccionado === 'pagoMovil') {
    mainBolivares.classList.remove('close');
    this.value = 'ninguno'; // Establecer el valor del select en "Seleccionar"
  }
});


// Obtener los elementos span y ion-icon
const deleteUno = document.getElementById('deleteUno');
const deleteDos = document.getElementById('deleteDos');

// Agregar un evento de clic a cada elemento
deleteUno.addEventListener('click', () => {
  // Obtener el contenedor y agregar la clase close
  const mainEfectivo = document.getElementById('mainEfectivo');
  mainEfectivo.classList.add('close');

  // Limpiar los campos del formulario dentro del main correspondiente
  mainEfectivo.querySelector('#pagosDataEfectivo').value = '';
});

deleteDos.addEventListener('click', () => {
  // Obtener el contenedor y agregar la clase close
  const mainBolivares = document.getElementById('mainBolivares');
  mainBolivares.classList.add('close');

  // Limpiar los campos del formulario dentro del main correspondiente
  mainBolivares.querySelector('#pagosDataPM1').value = '';
  mainBolivares.querySelector('#pagosDataPM2').value = '';
});


//PAGO VALIDACION IMPORTANTE
function validarNumeros(event) {
  const key = event.key;
  const inputValue = event.target.value;

  if (
    // Permitir números solo para pagosDataPM1 y pagosDataEfectivo
    (this.id === 'pagosDataPM1' || this.id === 'pagosDataEfectivo') && isFinite(key) ||
    // Permitir un punto decimal solo si no hay otro punto y ya hay al menos un número antes del punto para pagosDataPM2
    (this.id === 'pagosDataPM2' && /^-?\d*\.?\d{0,3}$/.test(inputValue + key))
  ) {
    return true;
  }

  // Negar todas las demás entradas
  event.preventDefault();
  return false;
}

// Selección de elementos a través de sus ID
const pagosDataPM1 = document.getElementById('pagosDataPM1');
const pagosDataPM2 = document.getElementById('pagosDataPM2');
const pagosDataEfectivo = document.getElementById('pagosDataEfectivo');

// Agrega el eventListener para el evento 'keypress'
pagosDataPM1.addEventListener('keypress', validarNumeros);
pagosDataPM2.addEventListener('keypress', validarNumeros);
pagosDataEfectivo.addEventListener('keypress', validarNumeros);


const params = new URLSearchParams(window.location.search);
const productID = window.location.pathname.split('/')[2];
console.log(window.location.pathname.split('/')[2]);
console.log(productID);

const getPacienteByID = async (id) => {
  const pacienteData = await fetch(`http://localhost:3100/consultaSecretario?id=${id}`, {
    method: 'GET',
  });
  const resultData = await pacienteData.json();

  return resultData;
}

const btnPerfil = document.getElementById('btnPerfil');
const btnBusqueda = document.getElementById('btnBusqueda');
const btnPagos = document.getElementById('btnPagos')

const getTokenOnSessionStorage = window.sessionStorage.getItem('firebase:authUser:AIzaSyDPgalqYfnXzAW6kQNyW4Kp9MRLxif39W4:[DEFAULT]')


const getToken = JSON.parse(getTokenOnSessionStorage);

const token = getToken.uid;


console.log(token);

btnPerfil.addEventListener('click', () => {
  window.location.pathname = `/secretario/${token}`;
})

btnPagos.addEventListener('click', () => {
  window.location.pathname = '/pagosSecretario';
})

btnBusqueda.addEventListener('click', () => {
  window.location.pathname = '/busquedaSecretario';
})

//NAVAR ACTIVE O NO ACTIVE RESPONSIVE//

let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navigation");

// menuIcon.onclick = () => {
//   menuIcon.classList.toggle("bx-close");
//   if (menuIcon.classList.contains("bx-close")) {
//     menuIcon.innerHTML = '<ion-icon name="close"></ion-icon>';
//     navbar.classList.add("active");
//   } else {
//     menuIcon.innerHTML = '<ion-icon name="menu"></ion-icon>';
//     navbar.classList.remove("active");
//   }
// };

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

let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav a");



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




//SCROLL//

ScrollReveal({ 
    // reset: true,
    distance: "80px",
    duration: 2000,
    delay: 200
});

ScrollReveal().reveal('.header, .main-container', { origin: 'top' });
ScrollReveal().reveal('.form-box, .main-pagos', { origin: 'left' });
ScrollReveal().reveal('.btn', { origin: 'bottom' });
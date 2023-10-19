import {getOnlyUser} from './config/configFetchAPI.js'
// import {
//   getAuth,
//   onAuthStateChanged
// } from 'https://www.gstatic.com/firebasejs/10.3.0/firebase-auth.js'
// import {
//   app
// } from '/firebase/firebase.config.client.js';
// console.log(onAuthStateChanged);

//BOTONES

const btnPagos = document.getElementById('btnPagos');
const btnBusqueda = document.getElementById('btnBusqueda');
const btnJustificante = document.getElementById('btnJustificante');

btnPagos.addEventListener('click', () => {
  window.location.pathname = '/pagos';
})

btnBusqueda.addEventListener('click', () => {
  window.location.pathname = '/busqueda';
})

btnJustificante.addEventListener('click', () => {
  window.location.pathname = '/justificante';
})

//NAVAR ACTIVE O NO ACTIVE RESPONSIVE//

let fullname = document.querySelector('.nombreCompleto');
let rolDoctor = document.querySelector('.Rol');
let email = document.querySelector('.email-p');
let displayInfo = document.querySelector('.none');
let loader = document.querySelector('.loader');




let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navigation");

const userURL = `https://med-consult-app.onrender.com/api/users/${window.location.pathname.split('/')[2]}`;
const userID = userURL.split('/')[5];


document.addEventListener('DOMContentLoaded', () => {
  getOnlyUser(userID)
    .then(userLogged => {
      loader.classList.add('none');
      displayInfo.classList.remove('none');
      let user = userLogged.message;
      fullname.textContent = user.userInfo.displayName;
      rolDoctor.textContent = `${user.role}/@`;
      email.textContent = user.userInfo.email;
    })
    .catch(error => console.log(error))
})

let navLinks2 = document.querySelectorAll(".navigation a");
navLinks2.forEach(link => {
  link.addEventListener("click", closeMenu);
});








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

//Navar seccion active//

let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav a");

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute("id");

        if(top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove("active");
                document.querySelector("header nav a[href*=" + id + "]").classList.add("active");
            })
        }
    })
}


//HORA Y FECHA EN LA PANTALLA//

const horaP = document.getElementById('horaP');
const fechaP = document.getElementById('fechaP');
const now = new Date();

let dia = now.getDate();
let mes = now.getMonth() + 1; // Los meses en JavaScript comienzan desde 0
let año = now.getFullYear();

// Formatear la fecha en el formato dia-mes-año
let fechaActual = dia + "-" + mes + "-" + año;

let hora = now.getHours();
let minutos = now.getMinutes();
let segundos = now.getSeconds();

// Formatear la hora en el formato hora:minutos:segundos
let horaActual = hora + ":" + minutos + ":" + segundos;

document.getElementById('fechaP').innerHTML = fechaActual;
document.getElementById('horaP').innerHTML = horaActual;


//scroll de la pagina//

ScrollReveal({ 
    // reset: true,
    distance: "80px",
    duration: 2000,
    delay: 200
});

ScrollReveal().reveal('.main-container, .header, .operaciones-titulo', { origin: 'top' });
ScrollReveal().reveal('.perfil-data, .operaciones-box', { origin: 'bottom' });
ScrollReveal().reveal('.perfil-foto', { origin: 'left' });
// ScrollReveal().reveal('.perfil-data h2', { origin: 'right' });


const btnPerfil = document.getElementById('btnPerfil');
const btnJustificante = document.getElementById('btnJustificante');
const btnBusquedaDoctor = document.getElementById('btnBusquedaDoctor');

const getTokenOnSessionStorage = window.sessionStorage.getItem('firebase:authUser:AIzaSyDPgalqYfnXzAW6kQNyW4Kp9MRLxif39W4:[DEFAULT]')


const getToken = JSON.parse(getTokenOnSessionStorage);

const token = getToken.uid;


console.log(token);

btnPerfil.addEventListener('click', () => {
  window.location.pathname = `/doctor/${token}`;
})

btnBusquedaDoctor.addEventListener('click', () => {
  window.location.pathname = '/busqueda';
})

btnJustificante.addEventListener('click', () => {
  window.location.pathname = '/justificante';
})

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

let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav a");

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


ScrollReveal({ 
  // reset: true,
  distance: "80px",
  duration: 2000,
  delay: 200
});

ScrollReveal().reveal('.header', { origin: 'top' });
ScrollReveal().reveal('.box-1, .box-2', { origin: 'left' });

//CLICK//

function direccionRegistro(){
  location.href="../pantalla-registro/index.html"
}

function direccionBusqueda(){
  location.href="../pantalla-busqueda/index.html"
}

function direccionPagos(){
  location.href="../pantalla-pagos/index.html"
}

function direccionCerrar(){
  location.href="../pantalla-inicio/index.html"
}

function direccionSecretario(){
  location.href="../pantalla-secretario/index.html"
}

function direccionMedico(){
  location.href="../pantalla-medico/index.html"
}

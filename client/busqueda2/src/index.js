const btnRegistro = document.getElementById('btnRegistro');
const btnPagos = document.getElementById('btnPagos');
const btnPerfil = document.getElementById('btnPerfil')

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

btnRegistro.addEventListener('click', () => {
  window.location.pathname = '/registro';
})

//NAVAR ACTIVE O NO ACTIVE RESPONSIVE//

let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navigation");

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


//Scroll//

ScrollReveal({ 
  // reset: true,
  distance: "80px",
  duration: 2000,
  delay: 200
});

ScrollReveal().reveal('.header', { origin: 'top' });
ScrollReveal().reveal('.main-title, .form-busqueda, .paciente', { origin: 'bottom' });


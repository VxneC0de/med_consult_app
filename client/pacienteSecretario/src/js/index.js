const params = new URLSearchParams(window.location.search);
const productID = window.location.pathname.split('/')[2];
console.log(window.location.pathname.split('/')[2]);
console.log(productID);

const getPacienteByID = async (id) => {
  const pacienteData = await fetch(`https://med-consult-app.onrender.com/pacienteSecretario?id=${id}`, {
    method: 'GET',
  });
  const resultData = await pacienteData.json();

  return resultData;
}

const btnPerfil = document.getElementById('btnPerfil');
const btnBusqueda = document.getElementById('btnBusqueda');
const btnPagos = document.getElementById('btnPagos');

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


//PDF


const crearPDF = document.getElementById('crearPDF');

crearPDF.addEventListener('click', () => {
  // Obtener los valores de los elementos
  
  const nacionalidad = document.getElementById('nacionalidad').value;
  const cedula = document.getElementById('cedula').value;

  const femenino = document.getElementById('femenino').value;
  const masculino = document.getElementById('masculino').value;
  const adulto = document.getElementById('adulto').value;
  const adolescente = document.getElementById('adolescente').value;
  const niño = document.getElementById('niño').value;

  const nombre = document.getElementById('nombre').value;
  const nombre2 = document.getElementById('nombre2').value;
  const apellidos = document.getElementById('apellidos').value;
  const nombreAcompañante = document.getElementById('nombreAcompañante').value;
  const apellidoAcompañante = document.getElementById('apellidoAcompañante').value;
  const parentezco = document.getElementById('parentezco').value;
  const email = document.getElementById('email').value;
  const areaPhone = document.getElementById('areaPhone').value;
  const numberPhone = document.getElementById('numberPhone').value;
  const direccion1 = document.getElementById('direccion1').value;
  const direccion2 = document.getElementById('direccion2').value;
  const ciudad = document.getElementById('ciudad').value;
  const estado = document.getElementById('estado').value;
  const postal = document.getElementById('postal').value;

  // Crear un nuevo elemento HTML que contenga los valores
  const contenido = document.createElement('div');

  // Agregar el nuevo elemento al contenido que se convertirá en PDF
  const justificante = document.querySelector('.form');
  justificante.appendChild(contenido);

  // Convertir el contenido en PDF y descargarlo
  html2pdf().from(justificante).save();
  
  //NOTA: Redireccionar para que lleve a otra pantalla
});

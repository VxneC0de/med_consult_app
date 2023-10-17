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



//Scroll//

ScrollReveal({ 
  // reset: true,
  distance: "80px",
  duration: 2000,
  delay: 200
});

ScrollReveal().reveal('.header', { origin: 'top' });


//CLICK//

const crearPDF = document.getElementById('crearPDF');

crearPDF.addEventListener('click', () => {
  // Obtener los valores de los elementos
  const notasObservaciones = document.getElementById('notasObservaciones').value;
  const fechaCita = document.getElementById('fechaCita').value;
  const horaCita = document.getElementById('horaCita').value;

  // Crear un nuevo elemento HTML que contenga los valores
  const contenido = document.createElement('div');

  // Agregar el nuevo elemento al contenido que se convertirá en PDF
  const justificante = document.querySelector('.form');
  justificante.appendChild(contenido);

  // Convertir el contenido en PDF y descargarlo
  html2pdf().from(justificante).save();
  
  //NOTA: Redireccionar para que lleve a otra pantalla
});
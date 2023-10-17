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


//FECHA DIA//
const fechaActualP = document.getElementById("fechaCita");

// Actualiza la fecha actual cada segundo
setInterval(() => {
  // Crea un objeto de fecha con la fecha actual
  const fechaActual = new Date();

  // Obtiene la fecha actual como una cadena legible
  const fechaActualString = fechaActual.toLocaleDateString();

  // Actualiza el contenido del párrafo con la fecha actual
  fechaActualP.textContent = fechaActualString;
}, 1000);



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




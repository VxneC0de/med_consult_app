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


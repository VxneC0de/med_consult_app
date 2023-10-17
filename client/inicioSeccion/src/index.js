const main = document.querySelector(".main-container");
const loginLink = document.querySelector(".login-link");
const registerLink = document.querySelector(".register-link");
const btnRecuperar = document.querySelector('#btnRecuperar')

registerLink.addEventListener("click", () => {
    main.classList.add("active");
});

loginLink.addEventListener("click", () => {
    main.classList.remove("active");
});

btnRecuperar.addEventListener('click', () => {
  window.location.pathname = '/recuperarClave';
})


ScrollReveal({ 
    // reset: true,
    distance: "80px",
    duration: 2000,
    delay: 200
});

ScrollReveal().reveal('.header', { origin: 'top' });
ScrollReveal().reveal('.main-container', { origin: 'bottom' });
ScrollReveal().reveal('.login-h2, .input-box, .remember-forgot, .btn, .login-register', { origin: 'left' });





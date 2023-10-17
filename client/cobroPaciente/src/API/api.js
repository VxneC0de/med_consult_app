// const axios = require('axios');
// const cheerio = require('cheerio');

// // Hace la solicitud HTTP a la página web del BCV
// const url = 'https://www.bcv.org.ve/estadisticas/tipo-de-cambio-dia/';
// axios.get(url)
//   .then(response => {
//     // Utiliza Cheerio para extraer la tasa del HTML devuelto
//     const $ = cheerio.load(response.data);
//     const tasaElement = $('.views-field-field-tc-compra');
//     const tasa = parseFloat(tasaElement.text().replace(',', '.'));

//     // Imprime la tasa del día
//     console.log(`Tasa del día: ${tasa}`);
//   })
//   .catch(error => {
//     console.log(error);
//   });

// $.ajax({
//     url: 'https://www.bcv.org.ve/estadisticas/tipo-de-cambio-dia/',
//     method: 'GET',
//     success: function(response) {
//         // Utiliza jQuery para extraer la tasa del HTML devuelto
//         const tasaElement = $('.views-field-field-tc-compra', response);
//         const tasa = parseFloat(tasaElement.text().replace(',', '.'));

//         // Imprime la tasa del día
//         console.log(`Tasa del día: ${tasa}`);
//     },
//     error: function(error) {
//         console.log(error);
//     }
// });

// npm install cheerio
const store = require('./store');

function getPagos() {
  return new Promise((resolve, reject) => {
    resolve(store.list());
  });
};

function getOnlyPagos(cedula) {
  return new Promise((resolve, reject) => {
    if (!cedula) {
      console.log("[ProductsController]: Product doesn't have title for search, the title product is empty");
      reject('There is no title product');
    }

    resolve(store.only(cedula));
  })
}

module.exports = {
  getPagos,
  getOnlyPagos
}
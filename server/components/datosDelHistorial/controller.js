const store = require('./store');

function getOnlyHistorial() {
    return new Promise((resolve, reject) => {
      // if (!cedula) {
      //   console.log("[ProductsController]: Product doesn't have title for search, the title product is empty");
      //   reject('There is no title product');
      // }
  
      resolve(store.only());
    })
}

function getOnlyHistorialByID(cedula) {
  return new Promise((resolve, reject) => {
    if (!cedula) {
      console.log("[PacientesController]: Product doesn't have cedula for search, the cedula paciente is empty");
      reject('There is no cedula product');
    }

    resolve(store.getID(cedula))

  })
}

module.exports = {
    getOnlyHistorial,
    getOnlyHistorialByID,
}
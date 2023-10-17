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

function updatePagos(id, changePaciente) {
    return new Promise(async (resolve, reject) => {
      if (!id || !changePaciente) {
        console.log('[updatePaciente] Error Data');
        reject('Data invalid in method patch');
      };
  
      const result = await store.update(id, changePaciente);
      resolve(result);
    });
  }
  
  function deletePagos(id) {
    return new Promise(async (resolve, reject) => {
      if (!id) {
        console.log('[deletePaciente] Error Data');
        reject('Data invalid in method delete');
      };
  
      const result = await store.delete(id);
      resolve(result);
    });
  }
  
  function getOnlyPagosByID(id) {
    return new Promise((resolve, reject) => {
      if (!id) {
        console.log("[PacientesController]: Product doesn't have id for search, the id paciente is empty");
        reject('There is no id product');
      }
  
      resolve(store.getID(id));
    })
  }
  
  module.exports = {
    getPagos,
    getOnlyPagos,
    updatePagos,
    deletePagos,
    getOnlyPagosByID
  }
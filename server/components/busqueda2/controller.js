const store = require('./store');

function getPaciente() {
  return new Promise((resolve, reject) => {
    resolve(store.list());
  });
};

function getOnlyPaciente(cedula) {
  return new Promise((resolve, reject) => {
    if (!cedula) {
      console.log("[ProductsController]: Product doesn't have title for search, the title product is empty");
      reject('There is no title product');
    }

    resolve(store.only(cedula));
  })
}

function updatePaciente(id, changePaciente) {
  return new Promise(async (resolve, reject) => {
    if (!id || !changePaciente) {
      console.log('[updatePaciente] Error Data');
      reject('Data invalid in method patch');
    };

    const result = await store.update(id, changePaciente);
    resolve(result);
  });
}

function deletePaciente(id) {
  return new Promise(async (resolve, reject) => {
    if (!id) {
      console.log('[deletePaciente] Error Data');
      reject('Data invalid in method delete');
    };

    const result = await store.delete(id);
    resolve(result);
  });
}


module.exports = {
  getPaciente,
  getOnlyPaciente,
  updatePaciente,
  deletePaciente,
}
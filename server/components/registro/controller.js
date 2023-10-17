const store = require('./store');

// function addPaciente(paciente, consulta, pagos, registro) {
//   return new Promise((resolve, reject) => {
//     if (Object.entries(paciente).length === 0 && Object.entries(consulta).length === 0 && Object.entries(pagos).length === 0 && Object.entries(registro).length === 0) {
//       console.log("[ProductsController]: Product doesn't have content, the product is empty");
//       reject('There is no product');
//     }

//     store.add(paciente, consulta, pagos, registro);
//     resolve(paciente, consulta, pagos, registro);
//   });
// };

function addPaciente(paciente) {
  return new Promise((resolve, reject) => {
    if (Object.entries(paciente).length === 0) {
      console.log("[pacientesController]: paciente doesn't have content, the paciente is empty");
      reject('There is no paciente');
    }

    store.add(paciente);
    resolve(paciente);
  });
};

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

function updatePaciente(id, changeProduct) {
  return new Promise(async (resolve, reject) => {
    if (!id || !changeProduct) {
      console.log('[updateProduct] Error Data');
      reject('Data invalid in method patch');
    };

    const result = await store.update(id, changeProduct);
    resolve(result);
  });
}


module.exports = {
  addPaciente,
  getPaciente,
  getOnlyPaciente,
  updatePaciente,
}
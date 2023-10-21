const store = require('./store');

function addHistorial(cedula, datosHistorial) {
  return new Promise((resolve, reject) => {
    if (cedula.length === 0) {
      console.log("[pacientesController]: paciente doesn't have content, the paciente is empty");
      reject('Cedula no valida');
    }

    store.add(cedula, datosHistorial);
    resolve(cedula, datosHistorial);
  });
};

function getHistorial() {
  return new Promise((resolve, reject) => {
    resolve(store.list());
  });
};

function getOnlyHistorial(cedula) {
  return new Promise((resolve, reject) => {
    if (!cedula) {
      console.log("[ProductsController]: Product doesn't have title for search, the title product is empty");
      reject('There is no title product');
    }

    resolve(store.only(cedula));
  })
}

function updateHistorial(cedula, changeHistorial) {
  return new Promise(async (resolve, reject) => {
    if (!cedula || !changeHistorial) {
      console.log('[updateHistorial] Error Data');
      reject('Data invalcedula in method patch');
    };

    const result = await store.update(cedula, changeHistorial);
    resolve(result);
  });
}

function deleteHistorial(cedula) {
  return new Promise(async (resolve, reject) => {
    if (!cedula) {
      console.log('[deleteHistorial] Error Data');
      reject('Data invalcedula in method delete');
    };

    const result = await store.delete(cedula);
    resolve(result);
  });
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
  addHistorial,
  getHistorial,
  getOnlyHistorial,
  updateHistorial,
  deleteHistorial,
  getOnlyHistorialByID
}
const db = require('./model');

async function getAllPagos() {
  const snapshot = await db.collection('registroPaciente').get();
  snapshot.forEach((doc) => {
    console.log(doc.id);
  });
  // snapshot.docs.map((product) => console.log(product.data().category.path));
  return snapshot.docs.map((paciente) => {
    return {
      id: paciente.id,
      paciente: paciente.data()
    }
  });
}

async function getOnlyPagos(cedula) {
  const pacienteReference = db.collection('registroPaciente');
  const snapshot = await pacienteReference.where('cedula', '==', cedula).get();

  if (snapshot.empty) {
    console.error('No matching!!');
    return;
  }

  return snapshot.docs.map((paciente) => {
    return {
      id: paciente.id,
      paciente: paciente.data()
    }
  })
}

async function updatePagos(id, change) {
  const paciente = db.collection('registroPaciente').doc(id);

  const updateChange = await paciente.update(change);

  return updateChange;
}

async function deletePagos(id) {
  const pacienteDelete = await db.collection('registroPaciente').doc(id).delete();

  return pacienteDelete;
}

async function getOnlyPagosByID(id) {
  const pacienteReference = db.collection('registroPaciente').doc(`${id}`);
  const snapshot = await pacienteReference.get();

  if (!snapshot.exists) {
    console.error('No matching!!');
    return;
  }

  return snapshot.data();
}

module.exports = {
  list: getAllPagos,
  only: getOnlyPagos,
  update: updatePagos,
  delete: deletePagos,
  getID: getOnlyPagosByID
}
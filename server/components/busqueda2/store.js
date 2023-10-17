const db = require('./model');

async function getAllPaciente() {
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

async function getOnlyPaciente(cedula) {
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

async function updatePaciente(id, change) {
  const paciente = db.collection('registroPaciente').doc(id);

  const updateChange = await paciente.update(change);

  return updateChange;
}

async function deletePaciente(id) {
  const pacienteDelete = await db.collection('registroPaciente').doc(id).delete();

  return pacienteDelete;
}

module.exports = {
  list: getAllPaciente,
  only: getOnlyPaciente,
  update: updatePaciente,
  delete: deletePaciente,
}



const db = require('./model');

// async function addPaciente(paciente, consulta, pagos, registro) {
//   const registroPaciente = db.collection('registroPaciente');
//   const registroConsulta = db.collection('registroConsulta');
//   const pagosConsulta = db.collection('pagosConsulta');
//   const registroTempo = db.collection('docRegistro')
//   const docPaciente = await registroPaciente.add(paciente);
//   const docConsulta = await registroConsulta.add(consulta);
//   const docPagos = await pagosConsulta.add(pagos);
//   const docRegistro = await registroTempo.add(registro)
//   return {
//     docPaciente, docConsulta, docPagos, docRegistro
//   }
// }

async function addPaciente(paciente) {
  const docRef = db.collection('registroPaciente');
  return await docRef.add(paciente);
}

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
  const product = db.collection('registroPaciente').doc(id);

  const updateChange = await product.update(change);

  return updateChange;
}

module.exports = {
  add: addPaciente,
  list: getAllPaciente,
  only: getOnlyPaciente,
  update: updatePaciente,
}


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
  const pagosReference = db.collection('registroPaciente');
  const snapshot = await pagosReference.where('cedula', '==', cedula).get();

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


module.exports = {
  list: getAllPagos,
  only: getOnlyPagos
}
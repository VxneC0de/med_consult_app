const { FieldValue } = require('firebase-admin/firestore');
const db = require('./model');

async function addHistorial(cedula, datosHistorial) {
  const docHistorial = db.collection('registroHistorial').doc(cedula);
  return await docHistorial.set(datosHistorial, { merge: true });
}


async function getOnlyHistorial(cedula) {
  const historialReference = db.collection('registroHistorial');
  const snapshot = await historialReference.where('cedula', '==', cedula).get();

  if (snapshot.empty) {
    console.error('No matching!!');
    return;
  }

  return snapshot.docs.map((historial) => {
    return {
      cedula: historial.id,
      historial: historial.data()
    }
  })
}

async function updateHistorial(cedula, change) {
  const registroHistorialPaciente = db.collection('registroHistorial').doc(cedula);

  // const updateChange = await registroHistorialPaciente.update(change);
  const updateChange = await registroHistorialPaciente.update({
    datosHistorial: FieldValue.arrayUnion(change)
  });

  return updateChange;
}



async function deleteHistorial(cedula) {
  const historialDeleted = await db.collection('registroHistorial').doc(cedula).delete();

  return historialDeleted;
}


module.exports = {
    add: addHistorial,
    update: updateHistorial,
    only: getOnlyHistorial,
    delete: deleteHistorial
}
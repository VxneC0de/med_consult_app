const db = require('./model');

async function addHistorial(cedula, datosHistorial) {
  const docHistorial = db.collection('registroHistorial').doc(cedula);
  return await docHistorial.set(datosHistorial);
}

async function getAllHistoriales() {
  const snapshot = await db.collection('registroHistorial').get();
  snapshot.forEach((doc) => {
    console.log(doc.id);
  });
  // snapshot.docs.map((product) => console.log(product.data().category.path));
  return snapshot.docs.map((historial) => {
    return {
      id: historial.id,
      historial: historial.data()
    }
  });
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
  const historial = db.collection('registroHistorial').doc(cedula);

  const updateChange = await historial.update(change);

  return updateChange;
}

async function deleteHistorial(cedula) {
  const historialDelete = await db.collection('registroHistorial').doc(cedula).delete();

  return historialDelete;
}

async function getOnlyHistorialByID(cedula) {
  const historialReference = db.collection('registroHistorial').doc(`${cedula}`);
  const snapshot = await historialReference.get();

  if (!snapshot.exists) {
    console.error('No matching!!');
    return;
  }

  return snapshot.data();
}

module.exports = {
  add: addHistorial,
  list: getAllHistoriales,
  only: getOnlyHistorial,
  update: updateHistorial,
  delete: deleteHistorial,
  getID: getOnlyHistorialByID
}
  
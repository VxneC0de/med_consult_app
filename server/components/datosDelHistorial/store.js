const db = require('./model');

async function getOnlyHistorial() {
    const historialReference = db.collection('registroHistorial');
    const snapshot = await historialReference.get();
  
    if (snapshot.empty) {
      console.error('No matching!!');
      return;
    }
  
    return snapshot.docs.map((historial) => {
      return historial.data()
    })
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
    only: getOnlyHistorial,
    getID: getOnlyHistorialByID
}
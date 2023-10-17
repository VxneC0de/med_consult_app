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

module.exports = {
    list: getAllPaciente
  }
    
const store = require('./store');

function getPaciente() {
  return new Promise((resolve, reject) => {
    resolve(store.list());
  });
};

module.exports = {
    getPaciente
  }
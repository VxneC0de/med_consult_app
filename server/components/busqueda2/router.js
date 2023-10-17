const express = require('express');
const router = express.Router();
const controller = require('./controller');
const response = require('../../response/index');

router.get('/', (req, res) => {
  if (req.query.cedula) {
    controller.getOnlyPaciente(req.query.cedula)
      .then((pacienteList) => response.success(req, res, pacienteList, 200))
      .catch((error) => response.error(req, res, 'Internal Error', 500, error));
  } else {
    controller.getPaciente()
      .then((pacienteList) => response.success(req, res, pacienteList, 200))
      .catch((error) => response.error(req, res, 'Internal Error', 500, error));
  }
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  controller.deletePaciente(id)
    .then((deleted) => response.success(req, res, deleted, 200))
    .catch((error) => response.error(req, res, 'Internal error', 500, error));
});

router.patch('/:id', (req, res) => {
  const id = req.params.id;
  const change = req.body;
  console.log(change)
  controller.updatePaciente(id, change)
    .then((changePaciente) => response.success(req, res, changePaciente, 200))
    .catch((error) => response.error(req, res, 'Internal Error', 500, error));
});

module.exports = router;
const express = require('express');
const router = express.Router();
const controller = require('./controller');
const response = require('../../response/index');

router.post('/', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Credentials", true);
  controller.addHistorial(req.body.cedula, req.body)
    .then((product) => response.success(req, res, product, 201))
    .catch((error) => response.error(req, res, 'Internal Error', 500, error));
});


router.delete('/:cedula', (req, res) => {
  const cedula = req.params.cedula;
  controller.deleteHistorial(cedula)
    .then((deleted) => response.success(req, res, deleted, 200))
    .catch((error) => response.error(req, res, 'Internal error', 500, error));
});

router.get('/:cedula', (req, res) => {
  controller.getOnlyHistorial(req.params.cedula)
      .then((pacienteList) => response.success(req, res, pacienteList, 200))
      .catch((error) => response.error(req, res, 'Internal Error', 500, error));
});

router.patch('/:cedula', (req, res) => {
  const cedula = req.params.cedula;
  const change = req.body;
  console.log(change)
  controller.updateHistorial(cedula, change)
    .then((changePaciente) => response.success(req, res, changePaciente, 200))
    .catch((error) => response.error(req, res, 'Internal Error', 500, error));
});
  
module.exports = router;
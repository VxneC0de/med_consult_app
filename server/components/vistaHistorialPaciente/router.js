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

router.get('/', (req, res) => {
    controller.getHistorial()
      .then((historialList) => response.success(req, res, historialList, 200))
      .catch((error) => response.error(req, res, 'Internal Error', 500, error));
});

router.get('/:cedula', (req, res) => {
  controller.getOnlyHistorial(req.params.cedula)
      .then((pacienteList) => response.success(req, res, pacienteList, 200))
      .catch((error) => response.error(req, res, 'Internal Error', 500, error));
});


router.patch('/:id', (req, res) => {
  const id = req.params.id;
  const change = req.body;
  console.log(change)
  controller.updateHistorial(id, change)
    .then((changeHistorial) => response.success(req, res, changeHistorial, 200))
    .catch((error) => response.error(req, res, 'Internal Error', 500, error));
});

module.exports = router;

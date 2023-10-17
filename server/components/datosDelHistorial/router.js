const express = require('express');
const router = express.Router();
const controller = require('./controller');
const response = require('../../response/index');

router.get('/', (req, res) => {
    controller.getOnlyHistorial()
        .then((pacienteList) => response.success(req, res, pacienteList, 200))
        .catch((error) => response.error(req, res, 'Internal Error', 500, error));
});

router.get('/:cedula', (req, res) => {
    controller.getOnlyHistorial(req.params.cedula)
        .then((pacienteList) => response.success(req, res, pacienteList, 200))
        .catch((error) => response.error(req, res, 'Internal Error', 500, error));
  });

module.exports = router;
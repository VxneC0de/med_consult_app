const express = require('express');
const router = express.Router();
const controller = require('./controller');
const response = require('../../response/index');

// router.post('/', (req, res) => {
//   const pacienteObj = req.body.paciente;
//   const consultaObj = req.body.consulta;
//   const pagosObj = req.body.pagos;
//   const registroObj = req.body.registro;
//   controller.addPaciente(pacienteObj, consultaObj, pagosObj, registroObj)
//     .then((registro) => response.success(req, res, registro, 201))
//     .catch((error) => response.error(req, res, 'Internal Error', 500, error));
// });

router.post('/', (req, res) => {
  controller.addPaciente(req.body)
    .then((product) => response.success(req, res, product, 201))
    .catch((error) => response.error(req, res, 'Internal Error', 500, error));
});

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

router.patch('/:id', (req, res) => {
  const id = req.params.id;
  const change = req.body;
  console.log(change)
  controller.updatePaciente(id, change)
    .then((changePaciente) => response.success(req, res, changePaciente, 200))
    .catch((error) => response.error(req, res, 'Internal Error', 500, error));
});

module.exports = router;
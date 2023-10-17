const express = require('express');
const router = express.Router();
const controller = require('./controller');
const response = require('../../response/index');

router.get('/', (req, res) => {
  if (req.body.title) {
    controller.getOnlyPaciente(req.body.title)
      .then((pacienteList) => response.success(req, res, pacienteList, 200))
      .catch((error) => response.error(req, res, 'Internal Error', 500, error));
  } else if (req.params.id) {
    controller.getOnlyPacienteByID(req.params.id)
      .then((pacienteList) => response.success(req, res, pacienteList, 200))
      .catch((error) => response.error(req, res, 'Internal Error', 500, error));
  } else {
    controller.getPaciente()
      .then((pacienteList) => response.success(req, res, pacienteList, 200))
      .catch((error) => response.error(req, res, 'Internal Error', 500, error));
  } 
});

router.get('/:id', (req, res) => {
  controller.getOnlyPacienteByID(req.params.id)
      .then((pacienteList) => response.success(req, res, pacienteList, 200))
      .catch((error) => response.error(req, res, 'Internal Error', 500, error));
});

router.patch('/:id', (req, res) => {
  const id = req.params.id;
  const change = req.body;
  controller.updatePaciente(id, change)
    .then((changedPaciente) => response.success(req, res, changedPaciente, 200))
    .catch((error) => response.error(req, res, 'Internal Error', 500, error));
});

module.exports = router;



// router.get('/data', (req, res) => {
//     console.log(req)
//     controller.getOnlyData(req.body.nombreColeccion, req.body.campoFilter, req.body.data)
//       .then((productsList) => response.success(req, res, productsList, 200))
//       .catch((error) => response.error(req, res, 'Internal Error', 500, error));
// });

const express = require('express');
const router = express.Router();
const registro = require('../components/registro/router');

const busqueda = require('../components/busqueda/router');
const busqueda2 = require('../components/busqueda2/router');

const consulta = require('../components/consulta/router');
const consultaSecretario = require('../components/consultaSecretario/router');

const paciente = require('../components/paciente/router');
const pacienteSecretario = require('../components/pacienteSecretario/router');

const datosDelHistorial = require('../components/datosDelHistorial/router')
const vistaHistorial = require('../components/vistaHistorial/router');
const vistaHistorialPaciente = require('../components/vistaHistorialPaciente/router');
const crearHistorial = require('../components/crearHistorial/router');
const cobroPaciente = require('../components/cobroPaciente/router')

const pagos = require('../components/pagos/router');
const pagosSecretario = require('../components/pagosSecretario/router');

const justificante = require('../components/justificante/router');
const users = require('../components/users/router');
const login = require('../components/login-register/router');
const register = require('../components/register/router');
const loginToken = require('../components/login/router')

const middleware = require('../middlewares/sessions');

function routerApp(app) {
  app.use('/api', router);
  app.use('/api/', login);
  app.use('/api/users', middleware.auth, users);
  app.use('/api/login', loginToken);
  app.use('/api/register', register);
  app.use('/api/registro', middleware.auth, registro);
  app.use('/api/busqueda', middleware.auth, busqueda);
  app.use('/api/busqueda2', middleware.auth, busqueda2);
  app.use('/api/consulta', middleware.auth, consulta);
  app.use('/api/consultaSecretario', middleware.auth, consultaSecretario);
  app.use('/api/paciente', middleware.auth, paciente);
  app.use('/api/pacienteSecretario', middleware.auth, pacienteSecretario);
  app.use('/api/vistaHistorial', middleware.auth, vistaHistorial);
  app.use('/api/crearHistorial', middleware.auth, crearHistorial);
  app.use('/api/datosDelHistorial', middleware.auth, datosDelHistorial);
  app.use('/api/cobroPaciente', middleware.auth, cobroPaciente);
  app.use('/api/pagos', middleware.auth, pagos);
  app.use('/api/pagosSecretario', middleware.auth, pagosSecretario);
  app.use('/api/justificante', middleware.auth, justificante);
}


module.exports = routerApp;


//Hacer el llamado de id en el registroConsulta
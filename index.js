const express = require('express');
const path = require('path');
const cors = require('cors');
const routerApp = require('./server/router/index');

const app = express();

app.use(express.urlencoded({
  extended: true
}))
app.use(express.json());

app.use(cors());

routerApp(app);

console.log((path.resolve(__dirname)));

// app.use(express.static(path.join(__dirname, 'client')));
app.use('/', express.static(path.resolve(__dirname, 'client','inicioSeccion')));
app.use('/firebase', express.static(path.resolve(__dirname, 'client','firebase')));
// app.use('/users', express.static(path.resolve(__dirname, 'client','inicioSeccion')));
app.use('/registro', express.static(path.resolve(__dirname, 'client','registroPaciente')));
app.use('/busqueda', express.static(path.resolve(__dirname, 'client','busqueda')));
app.use('/busquedaSecretario', express.static(path.resolve(__dirname, 'client','busqueda2')));
app.use('/consulta/:id', express.static(path.resolve(__dirname, 'client','consulta')));
app.use('/paciente/:id', express.static(path.resolve(__dirname, 'client','paciente')));
app.use('/consultaSecretario/:id', express.static(path.resolve(__dirname, 'client','consultaSecretario')));
app.use('/pacienteSecretario/:id', express.static(path.resolve(__dirname, 'client','pacienteSecretario')));
app.use('/vistaHistorial/:cedula', express.static(path.resolve(__dirname, 'client', 'vistaHistorial')));
app.use('/vistaHistorialPaciente/:cedula', express.static(path.resolve(__dirname, 'client', 'vistaHistorialPaciente')));
app.use('/crearHistorial/:cedula', express.static(path.resolve(__dirname, 'client', 'crearHistorial')));
app.use('/datosDelHistorial/:cedula/:fecha', express.static(path.resolve(__dirname, 'client', 'datosDelHistorial')));

app.use('/pagos', express.static(path.resolve(__dirname, 'client','pagos')));
app.use('/pagosSecretario', express.static(path.resolve(__dirname, 'client','pagosSecretario')));

app.use('/cobroPaciente/:id', express.static(path.resolve(__dirname, 'client','cobroPaciente')));
app.use('/justificante', express.static(path.resolve(__dirname, 'client','justificante')));

app.use('/doctor/:uid', express.static(path.resolve(__dirname, 'client','medico')));
app.use('/secretario/:uid', express.static(path.resolve(__dirname, 'client','secretario')));
app.use('/recuperarClave', express.static(path.resolve(__dirname, 'client','recuperarClave')));

app.listen(3200, () => {
  console.log('Server running!');
})
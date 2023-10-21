import { 
  getAuth, 
  signOut,
  setPersistence, 
  browserSessionPersistence
} from 'https://www.gstatic.com/firebasejs/10.3.0/firebase-auth.js';

import { app } from '/firebase/firebase.config.client.js';

const auth = getAuth(app);

let token;

setPersistence(auth, browserSessionPersistence)
  .then(() => {
    console.log("Persistence set to browserSessionPersistence");
    const user = auth.currentUser;
    if (user) {
      // El usuario está autenticado
      user.getIdToken().then(async (idToken) => {
        token = idToken;
      }).catch((error) => {
        console.error('Error al obtener el token:', error);
      });
    } else {
      // El usuario no está autenticado
      window.location.pathname = '/';
      console.error('El usuario no está autenticado');
    }
  })
  .catch((error) => {
    console.error("Error setting persistence:", error);
  });

const contenidoPaciente = document.querySelector('.paciente-content2');
const contenidoPacienteAnteriores = document.querySelector('.pacienteAnteriores-content2');

const arregloParaObtenerIDParaOcultar = [];

const loader = document.getElementById('loader');
const loader2 = document.getElementById('loader2');

console.log(loader);

//LISTA ACTUALES
const printPacienteList = async () => {
    const dataList = await fetch(`https://med-consult-app.onrender.com/api/busqueda`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
      }
    });
    const dataResult = await dataList.json();
    // Ordenar los datos por fecha y hora de cita
    dataResult.message.sort((a, b) => {
        const dateA = Date.parse(a.paciente.fechaCita + 'T' + a.paciente.horaCita);
        const dateB = Date.parse(b.paciente.fechaCita + 'T' + b.paciente.horaCita);
        return dateA - dateB;
    });
    console.log(dataResult);
    return dataResult;
};

contenidoPaciente.addEventListener("click", e => {

  let idProduct;


  if (e.target.closest('.historial')) {
    idProduct = e.target.parentElement.parentElement.parentElement.children[2].children[0].id;
    window.location.pathname = `/vistaHistorial/${idProduct}`;
  }

  if (e.target.closest('.editar')) {
    idProduct = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.id;
    // console.log(e.target.parentElement.id);
    // e.target.parentElement.remove();
    window.location.pathname = `/consulta/${idProduct}`;
  }

  if (e.target.closest('.remove')) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esto",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, remover',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        idProduct = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.id;
        arregloParaObtenerIDParaOcultar.push(idProduct)
        console.log(arregloParaObtenerIDParaOcultar);

// código para encontrar usuarios que queremos ocultar

        printPacienteList()
        .then((pacientes) => {
          if(arregloParaObtenerIDParaOcultar.length === 1) {
            pacientes.message.find((idFound) => {
              if (idFound.id === arregloParaObtenerIDParaOcultar[0]){
                updatePaciente(arregloParaObtenerIDParaOcultar[0], {
                  "cancelado": true
                })
                Swal.fire(
                  'Removido',
                  'El paciente ha sido removido.',
                  'success'
                  ).then((result) => {
                    window.location.reload();
                  });
            } else {
              console.log('No coincide');
            }
          })
          } else {
            console.log('Selecciona el ojito')
          }
        })
        .catch((error) => console.error(error))
      }
    })
  }  

})

document.addEventListener('DOMContentLoaded', (e) => {
  printPacienteList()
  .then((pacientes) => {
    loader.classList.add('close');
    const currentDate = new Date(); // Obtener la fecha actual
    currentDate.setHours(0, 0, 0, 0); // Establecer la hora en 00:00:00

    const listPaciente = pacientes.message
      .filter(paciente => {
        // Convertir la fecha y hora de la cita a un objeto Date
        const fechaCita = new Date(paciente.paciente.fechaCita + 'T' + paciente.paciente.horaCita);
        const pacientesNoCancelados = paciente.paciente.cancelado;
        // Comparar solo las fechas
        return fechaCita >= currentDate && pacientesNoCancelados === false;
        })
        .map(pacientes => {

            const iconos = () => `
            <span id="historial" class="icon icon-paper historial"><ion-icon name="document"></ion-icon></span>
            <span id="editar" class="icon icon-edit editar"><ion-icon name="create"></ion-icon></span>
            <span id="remove" class="icon icon-delete remove"><ion-icon name="eye-off"></ion-icon></span>
          `

            const printPaciente = `
            <div id="${pacientes.id}" class="paciente-content">
                <ul class="createName" id="createName">
                    <li class="listPaciente">
                        <label>
                        <input disabled ${pacientes.paciente.checkbox} class="input" type="checkbox" style="flex-grow: 1;">
                        </label>
                        <p id="namePaciente" class="namePaciente false"><span>${pacientes.paciente.nombre}</span> <span>${pacientes.paciente.apellidos}</span></p>
                        <p class="ciPaciente false">
                            <span id="${pacientes.paciente.cedula}">${pacientes.paciente.cedula}</span>
                        </p>
                        <p class="ciPaciente false">
                            <span id="horaConsulta">${pacientes.paciente.horaCita}</span>
                        </p>
                        <p class="ciPaciente false">
                            <span id="fechaConsulta">${pacientes.paciente.fechaCita}</span>
                        </p>
                        <div class="icon-box">
                            ${iconos()}
                        </div>
                    </li>
                </ul>
            </div>
            `

          return printPaciente;

          
          
        });
        contenidoPaciente.innerHTML = listPaciente.join("");
  
  
      })
      .catch((error) => console.error(error));
  
});

//LISTA ANTERIORES
const printPacienteAnterioresList = async () => {
    const dataList = await fetch(`https://med-consult-app.onrender.com/api/busqueda`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
      }
    });
    const dataResult = await dataList.json();
  
    dataResult.message.sort((a, b) => {
        const nameA = a.paciente.nombre.toLowerCase();
        const nameB = b.paciente.nombre.toLowerCase();
        const apellidoA = a.paciente.apellidos.toLowerCase();
        const apellidoB = b.paciente.apellidos.toLowerCase();
        if (nameA < nameB) {
            return -1;
        } else if (nameA > nameB) {
            return 1;
        } else {
            if (apellidoA < apellidoB) {
                return -1;
            } else if (apellidoA > apellidoB) {
                return 1;
            } else {
                return 0;
            }
        }
    });
  
    console.log(dataResult);
    return dataResult;
};

contenidoPacienteAnteriores.addEventListener("click", e => {

  let idProduct;
  let idHistorial;

  if (e.target.closest('.historial')) {
    idProduct = e.target.parentElement.parentElement.parentElement.children[1].children[0].id;
    window.location.pathname = `/vistaHistorialPaciente/${idProduct}`;
  }

  if (e.target.closest('.editar')) {
    idProduct = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.id;
    // console.log(e.target.parentElement.id);
    // e.target.parentElement.remove();
    window.location.pathname = `/paciente/${idProduct}`;
  }

  if (e.target.closest('.delete')) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esto",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        idProduct = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.id;
        idHistorial = e.target.parentElement.parentElement.parentElement.children[1].children[0].id;
        console.log(idHistorial);
        deletePaciente(idProduct)
        .then(() => {
          e.target.parentElement.parentElement.parentElement.parentElement.parentElement.remove();
          Swal.fire(
            'Eliminado',
            'El paciente ha sido eliminado.',
            'success'
            ).then((result) => {
              deleteHistorial(idHistorial)
              .then(() => window.location.reload())
            });
          })
          .catch((error) => console.error(error));
        }
      })
    }  
})

document.addEventListener('DOMContentLoaded', () => {
    printPacienteAnterioresList()
      .then((pacientes) => {
        loader2.classList.add('close');
        const listPacienteAnteriores = pacientes.message.map(pacientes => {
  
            const iconos2 = () => `
            <span id="historial" class="icon icon-paper historial"><ion-icon name="document"></ion-icon></span>
            <span id="editar" class="icon icon-edit editar"><ion-icon name="create"></ion-icon></span>
            <span id="delete" class="icon icon-delete delete"><ion-icon name="trash"></ion-icon></span>
          `

            const printPacienteAnteriores = `
            <div id="${pacientes.id}" class="pacienteAnteriores-content">
              <ul class="createName" id="createName">
                <li class="listPaciente">
                  <p id="namePaciente" class="namePaciente false"><span>${pacientes.paciente.nombre}</span> <span>${pacientes.paciente.apellidos}</span></p>
                  <p class="ciPaciente false">
                    <span id="${pacientes.paciente.cedula}">${pacientes.paciente.cedula}</span>
                  </p>
                  <div class="icon-box">
                    ${iconos2()}
                  </div>
                </li>
              </ul>
            </div>
            `
            return printPacienteAnteriores;
        });
  
        contenidoPacienteAnteriores.innerHTML = listPacienteAnteriores.join("");
  
      })
      .catch((error) => console.error(error));
  
});

//BOTON DE BUSQUEDA

const form = document.querySelector('form');
form.addEventListener('submit', (event) => {
  event.preventDefault();
});

const btnSearch = document.getElementById('btnSearch');

btnSearch.addEventListener('click', () => {
  const ciInput = document.getElementById('ciInput').value;

  printPacienteList()
    .then((pacientes) => {
      let filteredPacientes = pacientes.message;
      let filteredOnlyPacientes;

      if (ciInput.trim() !== '') {
        filteredOnlyPacientes = filteredPacientes.filter(paciente => paciente.paciente.cedula === ciInput);
      }

      // if (ciInput.trim() !== '') {
      //   filteredOnlyPacientes = filteredPacientes.filter(paciente => {
      //     const pacientesNoCancelados = paciente.paciente.cancelado;
      //     return paciente.paciente.cedula === ciInput && pacientesNoCancelados === false;
      //   });
      // }

      if (filteredPacientes.length === 0) {
        Swal.fire('Paciente no registrado');
        return;
      }

      const listPaciente = filteredOnlyPacientes.map(paciente => {
        // Código para generar el HTML de cada paciente
        const iconos = () => `
          <span id="historial" class="icon icon-paper historial"><ion-icon name="document"></ion-icon></span>
          <span id="editar" class="icon icon-edit editar"><ion-icon name="create"></ion-icon></span>
          <span id="remove" class="icon icon-delete"><ion-icon name="eye-off"></ion-icon></span>
        `;

        const printPaciente = `
          <div id="${paciente.id}" class="paciente-content">
            <ul class="createName" id="createName">
              <li class="listPaciente">
                <label>
                  <input class="input" type="checkbox" style="flex-grow: 1;">
                </label>
                <p id="namePaciente" class="namePaciente false"><span>${paciente.paciente.nombre}</span> <span>${paciente.paciente.apellidos}</span></p>
                <p class="ciPaciente false">
                  <span id="${paciente.paciente.cedula}">${paciente.paciente.cedula}</span>
                </p>
                <p class="ciPaciente false">
                  <span id="horaConsulta">${paciente.paciente.horaCita}</span>
                </p>
                <p class="ciPaciente false">
                  <span id="fechaConsulta">${paciente.paciente.fechaCita}</span>
                </p>
                <div class="icon-box">
                  ${iconos()}
                </div>
              </li>
            </ul>
          </div>
        `;

        return printPaciente;
      });

      const contenidoPaciente = document.querySelector('.paciente-content2');
      contenidoPaciente.innerHTML = listPaciente.join("");
    })
    .catch((error) => console.error(error));

    printPacienteAnterioresList()
    .then((pacientes) => {
      let filteredPacientesAnteriores = pacientes.message;

      if (ciInput.trim() !== '') {
        filteredPacientesAnteriores = filteredPacientesAnteriores.filter(paciente => paciente.paciente.cedula === ciInput);
      }

      if (filteredPacientesAnteriores.length === 0) {
        Swal.fire('Paciente no registrado');
        return;
      }

      const listPacienteAnteriores = filteredPacientesAnteriores.map(paciente => {
        // Código para generar el HTML de cada paciente anterior
        const iconos2 = () => `
          <span id="historial" class="icon icon-paper"><ion-icon name="document"></ion-icon></span>
          <span id="editar" class="icon icon-edit editar"><ion-icon name="create"></ion-icon></span>
          <span id="delete" class="icon icon-delete delete"><ion-icon name="trash"></ion-icon></span>
        `;

        const printPacienteAnteriores = `
          <div id="${paciente.id}" class="paciente-content">
            <ul class="createName" id="createName">
              <li class="listPaciente">
                <p id="namePaciente" class="namePaciente false"><span>${paciente.paciente.nombre}</span> <span>${paciente.paciente.apellidos}</span></p>
                <p class="ciPaciente false">
                  C.I
                  <span id="cedulaPaciente">${paciente.paciente.cedula}</span>
                </p>
                <div class="icon-box">
                  ${iconos2()}
                </div>
              </li>
            </ul>
          </div>
        `;

        return printPacienteAnteriores;
      });

      const contenidoPacienteAnteriores = document.querySelector('.pacienteAnteriores-content2');
      contenidoPacienteAnteriores.innerHTML = listPacienteAnteriores.join("");
    })
    .catch((error) => console.error(error));
});

//BOTONES O ICONOS

const deletePaciente = async (id) => {
  const deletedProduct = await fetch(`https://med-consult-app.onrender.com/api/busqueda/${id}`, {
    method: 'DELETE',
    headers: {
          'Authorization': `Bearer ${token}`
      }
  })
  const deleteSuccess = await deletedProduct.json();

  return deleteSuccess;
}

const updatePaciente = async (pacienteId, pacienteData) => {
  console.log(pacienteId, pacienteData);
  const sendData = await fetch(`https://med-consult-app.onrender.com/api/registro/${pacienteId}`, {
      method: 'PATCH',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(pacienteData),
  });
  const updatedPaciente = await sendData.json();
  return updatedPaciente;
}

//OJITO
const deleteHistorial = async (cedula) => {
  const deletedProduct = await fetch(`https://med-consult-app.onrender.com/api/crearHistorial/${cedula}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
  }
  })
  const deleteSuccess = await deletedProduct.json();

  return deleteSuccess;
}
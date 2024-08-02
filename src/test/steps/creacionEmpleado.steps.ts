import { Given, When, Then, DataTable } from "@cucumber/cucumber"
import {CreacionEmpleado} from "../page/creacionEmpleadoPage";
import {CommonPage} from "../page/CommonPage";
import { pageFixture } from "../../hooks/pageFixture";


let creacionEmpleado = new CreacionEmpleado()
let commonPage = new CommonPage()

let globalNombreCompleto = ""
let globalFirstName = ""
let globalMiddleName = ""
let globalLastName = ""
let globalUsername = ""
let globalPassword = ""
let globalConfirmarPassword = ""


let globalIdentificador = ""

When('El admin crea un nuevo empleado llamado {string}', async function (nombreCompleto) {
    globalNombreCompleto = nombreCompleto
    // await creacionEmpleado.ingresarDatosDelEmpleado(nombreCompleto)

});

When('El admin ingresa el nombre completo del empleado:', async function (datatable:DataTable) {
    
    datatable.hashes().map(row => (
        globalFirstName = row['firstName'],
        globalMiddleName=row['middleName'],
        globalLastName=row['lastName']
      ));
    await creacionEmpleado.ingresarDatosDelEmpleado(globalFirstName,globalMiddleName,globalLastName)
    globalNombreCompleto = `${globalFirstName} ${globalMiddleName} ${globalLastName}`
    
});

When('El admin ingresa datos extra del usuario:', async function (datatable:DataTable) {
    
    datatable.hashes().map(row => (
        globalUsername = row['username'],
        globalPassword=row['password'],
        globalConfirmarPassword=row['confirmarPassword']
      ));
    
      await creacionEmpleado.ingresarUsernamePassword( globalUsername, globalPassword, globalConfirmarPassword)
    
});


Then('El admin visualiza un pop up con un mensaje de creación exitosa', async function () {
    await creacionEmpleado.clickCrearEmpleado()
    await creacionEmpleado.mensajeDeCreacionExitosa()
});


Then('El nuevo usuario se encuentra en la lista de empleados', async function () {
    await creacionEmpleado.buscarAlEmpleado(globalNombreCompleto)
    await commonPage.swipeHaciaAbajo()
    await creacionEmpleado.validarExistenciaDeEmpleado(globalNombreCompleto)
});



When('El admin busca al empleado con su {string}', async function (identificador) {
    globalIdentificador = identificador
    await creacionEmpleado.buscarAlEmpleado(identificador)

});

When('El admin modifica el {string}', async function (idEmpleado) {
    
    await creacionEmpleado.modificarIdEmpleado(idEmpleado)
    await creacionEmpleado.clickCrearEmpleado()
});

Then('El usuario se encuentra en la lista de empleados', async function () {
    await commonPage.swipeHaciaAbajo()
    await creacionEmpleado.validarExistenciaDeEmpleado(globalIdentificador)

});


Then('El admin visualiza un mensaje que el empleado no fue encontrado', async function () {
    await creacionEmpleado.validarEmpleadoNoEncontrado()
});
Then('El admin visualiza el mensaje de advertencia {string}', async function (mensaje) {
    await creacionEmpleado.validarMensajeDeAdvertencia(mensaje)
});

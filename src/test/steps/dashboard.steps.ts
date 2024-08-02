import {Given,When,Then} from "@cucumber/cucumber"
import {DashboardPage} from "../page/DashboardPage";




let dashboard = new DashboardPage()


Given('El admin se dirige a la seccion para crear un nuevo empleado', async function () {
    await dashboard.irASeccionCrearEmpleado()

});


Then('El admin ingresa al Dashboard de Orange', async ()=> {
    await dashboard.validarVista()
});
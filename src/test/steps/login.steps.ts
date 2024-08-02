import {Given,When,Then, setDefaultTimeout} from "@cucumber/cucumber"
import { pageFixture } from "../../hooks/pageFixture";
import {LoginPage}  from "../page/LoginPage";

let loginPage = new LoginPage()

Given('El admin ingresa a la web de Orange', async ()=> {
    await pageFixture.page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")

});


When('El admin ingresa sus credenciales {string} y {string}', async (username,password)=>  {
    await loginPage.iniciarSesion(username,password)
});

Then('El admin visualiza un mensaje de credenciales invalidas', async ()=>  {
    await loginPage.mnesajeCredencialesInvalidas()
});


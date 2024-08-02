import { expect, Page } from "@playwright/test";
import { pageFixture } from "../../hooks/pageFixture";


export class CreacionEmpleado {
    
    bottonAgregarEmpleado = '//button[contains(.,"Add")]'
    inputFirstName = 'input[name="firstName"]'
    inputMiddletName = 'input[name="middleName"]'
    inputLastName = 'input[name="lastName"]'
    buttonCrearEmpleado = '//button[contains(.,"Save")]'
    messajeCreacionExitosaEmpleado = '//p[contains(.,"Successfully Saved")]'
    mensajeEmpleadoNoEncontrado = '//p[contains(.,"No Records Found")]'
    botonBuscarEmpleado = '//button[contains(.,"Search")]'
    linkBuscadorEmpleados = '//a[contains(.,"Employee List")]'
    inputBuscadorNombreEmpleado ='Type for hints...'
    inputUsernamePassword = 'input[autocomplete="off"]'
    checkAgregarUsernamePassword = 'form span'
   
    // Función de validación
    private isNumeric(text: string): boolean {
        return /^\d+$/.test(text);
    }

    async ingresarDatosDelEmpleado(firstname:string,middleName:string,lastName:string) {
        await pageFixture.page.locator(this.bottonAgregarEmpleado).click()

        await pageFixture.page.locator(this.inputFirstName).fill(firstname)
        await pageFixture.page.locator(this.inputMiddletName).fill(middleName)
        await pageFixture.page.locator(this.inputLastName).fill(lastName)


        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    async clickCrearEmpleado(){
        await pageFixture.page.locator(this.buttonCrearEmpleado).click()
    }

    async mensajeDeCreacionExitosa() {
        const mensajeExitoso = await pageFixture.page.locator(this.messajeCreacionExitosaEmpleado)
        await expect(mensajeExitoso).toBeVisible()
    }

    async validarExistenciaDeEmpleado(identificador:string){
        if (this.isNumeric(identificador)) {
            const validarEmpleadoId = await pageFixture.page.getByText(`${identificador}`).first();
            await expect(validarEmpleadoId).toBeVisible()
        } else {
            const nameParts = identificador.split(' ');
            const apellidos = nameParts.slice(-2).join(' ');
            const firstName = nameParts.slice(0, -2).join(' ');


            const validarNombreEmpleado = await pageFixture.page.getByText(`${firstName}`).first();
            const validarApellidoEmpleado = await pageFixture.page.getByText(`${apellidos}`).first();
            await expect(validarNombreEmpleado).toBeVisible()
            await expect(validarApellidoEmpleado).toBeVisible()
        }
    }

    async buscarAlEmpleado(identificador: string) {

        if (this.isNumeric(identificador)) {
            await pageFixture.page.getByRole('textbox').nth(2).fill(identificador)
            await pageFixture.page.locator(this.botonBuscarEmpleado).click()
        } else {
            await pageFixture.page.locator(this.linkBuscadorEmpleados).click()


            await pageFixture.page.getByPlaceholder(this.inputBuscadorNombreEmpleado).first().fill(identificador)
            await pageFixture.page.locator(this.botonBuscarEmpleado).click()
        }
    }

    async ingresarUsernamePassword(username:string,password:string, confirmarPassword:string){
        const checkHabilitarIngresarDatosExtra =  await pageFixture.page.locator(this.checkAgregarUsernamePassword);
        await checkHabilitarIngresarDatosExtra.click()
        const elementos = await pageFixture.page.locator(this.inputUsernamePassword).all()

        const usernameElemento = await elementos[0]
        const passwordElemento = await elementos[1]
        const ConfirmarPasswordElemento = await elementos[2]

        await usernameElemento.fill(username)
        await passwordElemento.fill(password)
        if(password.length>=7){
            await ConfirmarPasswordElemento.fill(confirmarPassword)

        }
        await new Promise(resolve => setTimeout(resolve, 1000));

    }

    async validarEmpleadoNoEncontrado(){
        const mensajeExitoso = await pageFixture.page.locator(this.mensajeEmpleadoNoEncontrado)
        await expect(mensajeExitoso).toBeVisible()
    }

    async modificarIdEmpleado(idEmpleado:string){
        const inputIdEmpleado = await pageFixture.page.locator('form').getByRole('textbox').nth(4);
        await inputIdEmpleado.fill(idEmpleado)
    }

    async validarMensajeDeAdvertencia(mensaje:string){
        
        const mensajeAdvertencia = await pageFixture.page.locator(`//span[contains(.,"${mensaje}")]`).all()

        for (const elemento of mensajeAdvertencia) {
            await expect(elemento).toBeVisible()
        
    }}
}

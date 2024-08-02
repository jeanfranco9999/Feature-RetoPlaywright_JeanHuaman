import { expect } from "@playwright/test";
import { pageFixture } from "../../hooks/pageFixture";


export class DashboardPage {

    linkIrSeccionEmpleados = '//span[contains(.,"PIM")]'
    tituloDashboard = "Dashboard"
    
    async irASeccionCrearEmpleado() {
        await pageFixture.page.locator(this.linkIrSeccionEmpleados).click()

    }

    async validarVista(){
        const titulo = await pageFixture.page.getByText(this.tituloDashboard).first()
        await expect(titulo).toBeVisible()
    }
   
}

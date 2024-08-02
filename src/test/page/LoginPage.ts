import { expect } from "@playwright/test";
import { pageFixture } from "../../hooks/pageFixture";


export class LoginPage {
    async iniciarSesion(user: string, password: string) {
        await pageFixture.page.getByPlaceholder("Username").fill(user)
        await pageFixture.page.getByPlaceholder("Password").fill(password)
        await pageFixture.page.locator('[type="submit"]').click()
    }

    async mnesajeCredencialesInvalidas(){
        const mensaje = await pageFixture.page.getByText("Invalid credentials")
        await expect(mensaje).toBeVisible()
    }
}

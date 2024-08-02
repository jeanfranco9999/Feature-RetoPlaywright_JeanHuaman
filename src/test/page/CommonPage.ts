import { Locator, Page } from "@playwright/test";
import { pageFixture } from "../../hooks/pageFixture";


export class CommonPage {
    tituloPieDePagina = "OrangeHRM OS 5.7"
    async swipeHaciaAbajo() {


        const elemento = await pageFixture.page.getByText(this.tituloPieDePagina)
        await elemento.scrollIntoViewIfNeeded()
    }


}

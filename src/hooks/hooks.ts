import { Before,After, BeforeAll, AfterAll, BeforeStep, AfterStep, Status } from "@cucumber/cucumber";
import { chromium,Browser,Page, BrowserContext } from "@playwright/test";
import { pageFixture } from "./pageFixture";

let browser : Browser
let context: BrowserContext

BeforeAll(async function(){
    browser = await chromium.launch({headless:false})
})
Before(async function(){
    context = await browser.newContext()
    const page = await context.newPage()
    pageFixture.page = page
})
AfterStep(async function({pickle}){
    //screenshot
    await new Promise(resolve => setTimeout(resolve, 1000));
    const img = await pageFixture.page.screenshot({path:`./test-results/screenshots/${pickle.name}.png`,type:"png"})
    await this.attach(img,"image/png")
})

After(async function({result}){
    console.log(result?.status)
    await pageFixture.page.close()
    await context.close()
})

AfterAll(async function(){
    await browser.close()
})


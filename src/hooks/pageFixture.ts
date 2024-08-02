import { setDefaultTimeout } from "@cucumber/cucumber"
import {Page} from "@playwright/test"
setDefaultTimeout(40000)

export const pageFixture = {
    //@ts-ignore
    page : undefined as Page

}
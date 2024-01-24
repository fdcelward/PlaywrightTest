const { chromium } = require("@playwright/test");

async function globalSetup(){
    const browser = await chromium.launch({headless: true});
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://fdc_user:admin123@english-staging.fdc-inc.com/login')
    await page.getByRole('textbox', { name: 'mail@example.com' }).fill("nc.automation.fdc+230226043017@gmail.com");
    await page.locator("(//input[@id='UserPassword'])[1]").fill("admin123");
    await page.getByRole('button', { name: 'ログイン' }).click();
    await expect(page.url()).toContain('/mypage');

    await page.context().storageState({path: "./LoginAuth.json"});
    await browser.close()
}

export default globalSetup;
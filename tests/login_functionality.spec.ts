import { test, expect } from '@playwright/test';
const testdata = JSON.parse(JSON.stringify(require(process.env.testDataPath as string)));

test('Login successful using valid credentials', async ({ page }) => {
  await page.goto('/login')
  await page.getByRole('textbox', { name: 'mail@example.com' }).fill(testdata.premium_paid.username);
  await page.locator("(//input[@id='UserPassword'])[1]").fill(testdata.premium_paid.password);
  await page.getByRole('button', { name: 'ログイン' }).click();
  await expect(page.url()).toContain('/mypage');
});

test('Login unsuccessful using invalid credentials', async ({ page }) => {
  await page.goto('/login')
  await page.getByRole('textbox', { name: 'mail@example.com' }).fill('invalidlogin_test@gmail.com');
  await page.locator("(//input[@id='UserPassword'])[1]").fill("admin");
  await page.getByRole('button', { name: 'ログイン' }).click();
  await expect(page.locator("//div[@id='authMessagexx']")).toBeVisible()
});

test('Login test credentialsss', async ({ page }) => {
  await page.goto('/account')
  await expect(page.locator("//div[@class='account_area cf']")).toBeVisible()
});
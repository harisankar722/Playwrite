const {test, expect}  = require('@playwright/test');

//test.describe.configure({mode:'prallel'});
//test.describe.configure({mode:'serial'});
test.only('MoreValidations', async ({page})=>    {
 
await page.goto("https://www.rahulshettyacademy.com/AutomationPractice/");
//await page.goto("https://www.google.com/");
//await page.goBack();
//await page.goForward();
await expect(page.locator("#displayed-text")).toBeVisible();  // Element Displayed Example // Hide
await page.locator("#hide-textbox").click();
await expect(page.locator("#displayed-text")).toBeHidden();
page.on('dialog',dialog => dialog.accept());   // pop click on ok
await page.locator("#confirmbtn").click();   // Switch To Alert Example
await page.locator("#mousehover").hover();
const framePage = page.frameLocator("#courses-iframe");
await framePage.locator("li a[href*='lifetime-access']:visible").click();
const textCheck = await framePage.locator(".text h2").textContent();
console.log(textCheck.split(" ")[1]);

});

/*test('capture screenshots', async ({page})=>    {
 
    await page.goto("https://www.rahulshettyacademy.com/AutomationPractice/");
   await expect(page.locator("#displayed-text")).toBeVisible();  // Element Displayed Example // Hide
  // await page.screenshot({path : 'screenshot.png'});
  await page.locator("#displayed-text").screenshot({path : 'partialscreenshot.png'});
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();

});

test('Visual testing', async ({page})=>    {

    await page.goto("https://www.google.com/");
    expect(await page.screenshot()).toMatchSnapshot('landing.png');

});*/

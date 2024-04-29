const {test, expect} = require('@playwright/test');
let webContext;
test.beforeAll(async ({browser}) =>
{
    const context = await browser.newContext();   // context,page is a variable
    const page = await context.newPage();
 await page.goto("https://rahulshettyacademy.com/client");
 await page.locator("#userEmail").fill("anshika@gmail.com");
 await page.locator("#userPassword").fill("Iamking@000");
 await page.locator("[value='Login']").click();
await page.waitForLoadState("networkidle");   // loaded all the network but due to some flaky that why we use waitfor method
await context.storageState({path : 'state.json'}); // one instance(context) number of pages
webContext = await browser.newContext({storageState:'state.json'}); //we created a new context, we are injecting that existing storage data.


})



test('@Web Client App Login', async ()=>    {
   // const email = "anshika@gmail.com";
    const productName = 'ZARA COAT 3';
    const page = await webContext.newPage(); // this page is now created dynamically. So we are not passing it as a fixture. so we removed page
    await page.goto("https://rahulshettyacademy.com/client");
    const products = page.locator(".card-body");
  
await page.locator(".card-body b").first().waitFor();
 const graballTitles = await page.locator(".card-body b").allTextContents();
// console.log(graballTitles);
 const count = await products.count();
 //ZARA COAT 3
 for(let i=0; i<count ; ++i)
 {
   if(await products.nth(i).locator("b").textContent() === productName )
   {
    
    await products.nth(i).locator("text= Add To Cart").click();
    break;   
}
 }
 //await page.pause();
 await page.locator("[routerlink*='cart']").click();
 await page.locator("div li").first().waitFor();
 const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
 expect(bool).toBeTruthy();
 await page.locator("text=Checkout").click();
 await page.locator("[placeholder*='Country']").pressSequentially("ind",{delay:100});
 const dropdown = page.locator(".ta-results");
 await dropdown.waitFor();
 const optionsCount = await dropdown.locator("button").count();
 for(let i=0;i<optionsCount;++i)
 {
   const text = await dropdown.locator("button").nth(i).textContent();
    if(text === " India")
    {
        await dropdown.locator("button").nth(i).click();
        break;
    }
    
 }
 //expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
    await page.locator(".action__submit").click();
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderId);

    await page.locator("button[routerlink*='myorders']").click();
   await page.locator("tbody").waitFor();
   const rows = await page.locator("tbody tr");
 
 
   for (let i = 0; i < await rows.count(); ++i) {
      const rowOrderId = await rows.nth(i).locator("th").textContent();
      if (orderId.includes(rowOrderId)) {
         await rows.nth(i).locator("button").first().click();
         break;
      }
   }
   const orderIdDetails = await page.locator(".col-text").textContent();
   expect(orderId.includes(orderIdDetails)).toBeTruthy();

});

test('Test case 2', async ()=>    {
    // const email = "anshika@gmail.com";
     const productName = 'ZARA COAT 3';
     const page = await webContext.newPage();
     await page.goto("https://rahulshettyacademy.com/client");
     const products = page.locator(".card-body");
   
 await page.locator(".card-body b").first().waitFor();
  const graballTitles = await page.locator(".card-body b").allTextContents();
 // console.log(graballTitles);

});
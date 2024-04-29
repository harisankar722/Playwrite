const {test,expect,request} = require('@playwright/test');
const {APIUtils} = require('../utils/APIUtils');
const loginpayload = {userEmail: "anshika@gmail.com", userPassword: "Iamking@000"}
const orderPayload = {orders: [{country: "Cuba", productOrderedId: "6581ca399fd99c85e8ee7f45"}]}
let response; 

test.beforeAll( async()=> 
{
   //login API
   const apiContext = await request.newContext();
   const ApIUtils =new APIUtils(apiContext,loginpayload);  // sending two parameters
   response = await ApIUtils.CreateOrder(orderPayload);

});
//Create order is success
test('place the order', async ({page})=>    {
   
    await page.addInitScript(value => {
      window.localStorage.setItem('token',value);  // key : value pair
    },response.token);

    await page.goto("https://rahulshettyacademy.com/client/");
    await page.locator("button[routerlink*='myorders']").click();
   await page.locator("tbody").waitFor();
   const rows = await page.locator("tbody tr");
 
   for (let i = 0; i < await rows.count(); ++i) {
      const rowOrderId = await rows.nth(i).locator("th").textContent();
      if (response.orderId.includes(rowOrderId)) {
         await rows.nth(i).locator("button").first().click();
         break;
      }
   }
   const orderIdDetails = await page.locator(".col-text").textContent();
  // page.pause();
  expect(response.orderId.includes(orderIdDetails)).toBeTruthy();

});

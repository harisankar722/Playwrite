const {test,expect,request} = require('@playwright/test');
const loginpayload = {userEmail: "anshika@gmail.com", userPassword: "Iamking@000"}
const orderPayload = {orders: [{country: "Cuba", productOrderedId: "6581ca399fd99c85e8ee7f45"}]}
const {APIUtils}=require('../utils/APIUtils');
const fakePayLoadOrders = { data: [], message: "No Orders" };
let response;

test.beforeAll(  async() => 
{
   //login API
   const apiContext = await request.newContext();
   const ApIUtils =new APIUtils(apiContext,loginpayload);
   response = await ApIUtils.CreateOrder(orderPayload);

});
//Create order is success
test('place the order', async ({page})=>    {
   
    page.addInitScript(value => {
      window.localStorage.setItem('token',value);  // key : value pair
    }, response.token);


 await page.goto("https://rahulshettyacademy.com/client");
 await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
 async route => {
   const response = await page.request.fetch(route.request());
   let body = JSON.stringify(fakePayLoadOrders); // so how this will know that, this is not a JavaScript, this is a Json object that why we given json.stringify //  convert this JavaScript object into Json object.
   route.fulfill(
     {
       response,
       body,

     });
   //intercepting response -APi response-> { playwright fakeresponse}->browser->render data on front end
 });

await page.locator("button[routerlink*='myorders']").click;
await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");

console.log(await page.locator(".mt-4").textContent());



});
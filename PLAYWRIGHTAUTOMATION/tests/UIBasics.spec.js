const {test, expect} = require('@playwright/test');
/*send that browser as a parameter to your test to function first 
and that parameter will be passed of to inside your body*/
/*browser is one of the fixture available for you from which you have opened a new context, 
One instance of browser*/
test('first playwright test', async ({browser})=>    
{
   // chrome - plugins/cookie(parameter) browser : Browser
   const context = await browser.newContext();   // context,page is a variable
   const page = await context.newPage();
  // page.route('**/*.css',route=>route.abort());
 //page.route('**/*.{jpg,png,jpeg}', route=> route.abort());
   const userName = page.locator('#username');    // storing in variables
   const signInBtn = page.locator("#signInBtn");
   const cardTitles = page.locator(".card-body a");  // parent to child
   //page.on('request', request=> console.log(request.url()));
   //page.on('response',response=>console.log(response.url(), response.status()));
   await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
   console.log(await page.title());
   //css   // wrong credentials and extract the error msg and do the assertion
   await userName.fill("rahulshetty");
   await page.locator("[type='password']").fill("learning");
   await signInBtn.click();
   console.log(await page.locator("[style*='block']").textContent());
   await expect(page.locator("[style*='block']")).toContainText('Incorrect username/password.');  //assertion
    // correct credetials
    await userName.fill("");
    await userName.fill("rahulshettyacademy");
    await signInBtn.click();
    console.log(await cardTitles.first().textContent());
    console.log(await cardTitles.nth(1).textContent());
 // All the products text in the list format
  const allTitles = await cardTitles.allTextContents(); // this method won't wait 30sec bcze it's an array array will be  0 or 10
  console.log(allTitles);

  


}); 

/*test('page playwright test', async ({page})=>
{
   
   await page.goto("https://google.com");
   //get title - assertion
   console.log(await page.title());
   await expect(page).toHaveTitle("Google");

});*/

test('UI Controls', async ({page})=>
{
   
   await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
   const userName = page.locator('#username');
   const signInBtn = page.locator("#signInBtn");
   const documentLink = page.locator("[href*='documents-request']");  // bliking text
   const staticdropdown = page.locator("select.form-control");
   await staticdropdown.selectOption("consult");
  // await page.locator(".radiotextsty").last().click();
  await page.locator(".radiotextsty").nth(1).click();
  await page.locator("#okayBtn").click();  //popup
 
 //Assertions
 // console.log(await page.locator(".radiotextsty").nth(1).isChecked());
  await expect(page.locator(".radiotextsty").nth(1)).toBeChecked();
  await page.locator("#terms").click(); // agree checkbox
  await expect(page.locator("#terms")).toBeChecked();
  await page.locator("#terms").uncheck();
  expect (await page.locator("#terms").isChecked()).toBeFalsy();
   //await page.pause();
   await expect(documentLink).toHaveAttribute("class","blinkingText"); // blinking text link


});

test.only('child window handle', async ({browser})=>
{
   
   const context = await browser.newContext();   // context,page is a variable
   const page = await context.newPage();
   const userName = page.locator('#username'); 
   await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
   const documentLink = page.locator("[href*='documents-request']");  // bliking text
   const [newPage] = await Promise.all([
      context.waitForEvent('page'), // this method will be invoked when there is another page is created in your original context.
      documentLink.click(),
   
   ])
   const text = await newPage.locator(".red").textContent();
   const arrayText = text.split("@");
   const domain = arrayText[1].split(" ")[0]
   console.log(domain);
   await page.locator("#username").type(domain);
   page.pause();
   console.log(await page.locator("#username").textContent());


});
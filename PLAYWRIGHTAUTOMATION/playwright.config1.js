const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  retries : 1,
    timeout : 30 * 1000,
  expect:  {   // assertions

    timeout : 5000
  },
  reporter: 'html',
  projects : [
    {
         name : 'safari',
         use : {
      
          browserName : 'webkit',
             headless : false,
             screenshot : 'on',
             trace :     'retain-on-failure' ,            //'off', 'on',
             ...devices['iPhone 11'],
        }
    },
    {
      name : 'chrome',
      use: {
    
        browserName : 'chromium',
           headless : false,  // show the browser
           screenshot : 'on',
           video : 'retain-on-failure',
           ignoreHTTPSErrors:true,
           permissions:['geolocation'],
           trace :     'retain-on-failure' ,            //'off', 'on',
          viewport : {width:720,height:720}
          }
 }


  ]
  
  
  });

import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }, testInfo) => {
  await page.goto("http://uitestingplayground.com/ajax");
  await page.getByText("Button Triggering AJAX Request").click();
 // 1) testInfo.setTimeout(testInfo.timeout + 2000);  // chenge timeout for tests
 
});


test("auto-waiting", async ({ page }) => {
  const successButton = page.locator(".bg-success");

  await successButton.click();


  //Here TextContent wait timeout
  const text3 = await successButton.textContent()

  //Here allTextContents dont wait timeout
  const text = await successButton.allTextContents();
  expect(text).toContain("Data loaded with AJAX get request.");

  //here allTextContents - wait timeout
  await successButton.waitFor({state: 'attached'})
  const text1 = await successButton.allTextContents();
  expect(text1).toContain("Data loaded with AJAX get request.");

// set timeout in ms because without this timeout dontwork
  await expect(successButton).toHaveText("Data loaded with AJAX get request.", {timeout: 20000})
});


test("alternative waits", async ({ page }) => {
  // test.setTimeout(10000)  // hardcode timeout for test
  // test.slow() // default*3
  const successButton = page.locator(".bg-success");

/// ___ wait for element

// await page.waitForSelector(".bg-success");

// wait for particular response
// await page.waitForResponse("http://uitestingplayground.com/ajaxdata");
 

// wait for network calls to be completed ('NOT RECOMMENDED)
await page.waitForLoadState('networkidle')



   const text = await successButton.allTextContents();
   expect(text).toContain("Data loaded with AJAX get request.");
});

test("timeouts", async ({ page }) => {
  const successButton = page.locator(".bg-success");

  await successButton.click();


  //custom action timeout
  //await successButton.click({timeout: 17000});
});
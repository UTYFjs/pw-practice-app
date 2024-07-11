import {expect, test} from "@playwright/test"


test.beforeEach( async ({ page}) => {
  await page.goto("http://localhost:4200/");
  await page.getByText("Forms").click();
  await page.getByText("Form Layouts").click();
})

test('first Test', async ({page}) => {
  //by TagName
  await page.locator('input').first().click()

  // by Id
  await page.locator("#inputEmail1").click();

  //by Class
  page.locator(".input-full-width");

  //by attribute
  page.locator('[placeholder="Email"]')
  //by class value
  page.locator(
    '[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]'
  );
  //comine different selection
  page.locator('input.input-full-width[placeholder="Email"]');

  // by XPath
  page.locator('//*[@id="inputEmail1"]');

  // by partial text match
  page.locator(':text("Using")')
  //by exact text match 
  page.locator(':text-is("Using the Grid")')
})

test('User-facing locators', async ({page}) =>{
  await page.getByRole("textbox", { name: "Email" }).first().click();
  await page.getByRole('button', {name: 'Sign In'}).first().click()
  await page.getByLabel('Email').first().click()

  await page.getByPlaceholder("Jane Doe").click();

  await page.getByText('Using the Grid').click()
  
  await page.getByTestId("SignIn").click();
  await page.locator('nb-card nb-radio :text-is("Option 1")').click();
  //await page.getByTitle("IoT Dashboard").click();
})


test('locating child elements', async ({page}) => {
  //children elements
  await page.locator('nb-card nb-radio :text-is("Option 1")').click();

  // children elements by chaining
  await page
    .locator("nb-card")
    .locator("nb-radio")
    .locator(':text-is("Option 2")')
    .click();
  //children elements combination
  await page
    .locator("nb-card")
    .getByRole("button", { name: "Sign In" })
    .first()
    .click();
  //children elements nth child by index ( from 0)
  await page.locator("nb-card").nth(3).getByRole("button").click();
})


test("locating parent elements", async ({ page }) => {
  await page.locator('nb-card', { hasText: 'Using the Grid'}).getByRole("textbox", { name: "Email" }).click()

  await page
    .locator("nb-card", { has: page.locator("#inputEmail1") })
    .getByRole("textbox", { name: "Email" })
    .click();

    await page
      .locator("nb-card")
      .filter({ hasText: "Basic form" })
      .getByRole("textbox", { name: "Email" })
      .click();
      await page
        .locator("nb-card")
        .filter({ has: page.locator(".status-danger") })
        .getByRole("textbox", { name: "Password" })
        .click();

        await page
          .locator("nb-card")
          .filter({ has: page.locator("nb-checkbox") })
          .filter({ hasText: "Sign In" })
          .getByRole("textbox", { name: "Email" })
          .click();
//not recommended
          await page
            .locator(':text-is("Using the Grid")')
            .locator("..")
            .getByRole("textbox", { name: "Email" })
            .click();
});

test("reusing the locators", async ({ page }) => {
const basicForm = page.locator("nb-card").filter({ hasText: "Basic form" });
const emailField = basicForm.getByRole("textbox", { name: "Email" });

  await emailField.fill("test@test.com");
   
  await basicForm
     .getByRole("textbox", { name: "Password" })
     .fill("Welcome123");
  await basicForm.locator("nb-checkbox").click();
  await   basicForm.getByRole("button").click();

  await expect(emailField).toHaveValue("test@test.com");
});

test("Extracting values", async ({ page }) => {
  //single text value
  const basicForm = page.locator("nb-card").filter({ hasText: "Basic form" });
  const buttonText = await basicForm.locator('button').textContent()
  expect(buttonText).toEqual('Submit')

  //all text values
 const radioText =  await page.locator('nb-radio').allTextContents()  // return array
 expect(radioText).toContain('Option 1');

  //input value
  const emailField =   basicForm.getByRole('textbox', {name: "Email"})
  await emailField.fill('test@text.com')
  const emailValue = await emailField.inputValue()
  expect(emailValue).toEqual("test@text.com");

  const placeholderValue = await emailField.getAttribute('placeholder')
  expect(placeholderValue).toEqual('Email')
});


test("assertions", async ({ page }) => {
   const basicFormButton = page
     .locator("nb-card")
     .filter({ hasText: "Basic form" })
     .locator("button");

  // general assertions
  const value = 5
  expect(value).toEqual(5)

  const text =await basicFormButton.textContent()

  expect(text).toEqual('Submit')


  //locator assertion 

 await  expect(basicFormButton).toHaveText('Submit')

 // Soft assertion 
 await expect.soft(basicFormButton).toHaveText('Submit')
 await basicFormButton.click()
});


// test.beforeEach( async ({ page}) => {
//    await page.goto("http://localhost:4200/");
// })

// test.describe("suite 1", () => {
//   test.beforeEach(async ({ page }) => {
//     await page.getByText("Forms").click();
//   });

//   test("the first test", async({page}) => {
//  await page.getByText("Form Layouts").click();
//   });

//   test("Navigate to date picker page", async({page}) => {  
//   await page.getByText("Datepicker").click();
//   });

//   test("the thirth test", async ({ page }) => {
//     await page.getByText("Datepicker").click();
//   });

//   test("the fourth test", async ({ page }) => {
//     await page.getByText("Datepicker").click();
//   });
// });

// test.describe.skip("suite 2", () => {
//   test.beforeEach(async ({ page }) => {
//     await page.getByText("Charts").click();
//   });

//   test("the first test", async ({ page }) => {
//     await page.getByText("Echarts").click();
//   });

//   test("Navigate to date picker page", async ({ page }) => {
//     await page.getByText("Datepicker").click();
//   });

// });
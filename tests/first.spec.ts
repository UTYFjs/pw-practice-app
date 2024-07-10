import {test} from "@playwright/test"

test ("the first test", ()=> {

})

test.describe("test suite", () => {
  test("the first test", async({page}) => {
 await page.goto("http://localhost:4200/");
 await page.getByText('Forms').click()
 await page.getByText("Form Layouts").click();
  });

  test("the second test", () => {});

  test("the thirth test", () => {});

  test("the fourth test", () => {});
});
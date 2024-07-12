import { test, expect } from "@playwright/test";
import {NavigationPage} from '../page-object/navigationPage'
import { FormLayoutPage } from '../page-object/formLayoutsPage';
import { DatepickerPage } from '../page-object/datepickerPage';

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/");
});

test("navigate to form page", async ({ page }) => {
  const navigateTo = new NavigationPage(page)
  await navigateTo.formLayoutsPage()
  await navigateTo.datepickerPage()
  await navigateTo.smartTablePage()
  await navigateTo.toastrPage()
  await navigateTo.tooltipPage()
 
});

test("submit usingTheGridForm", async ({ page }) => {
  const navigateTo = new NavigationPage(page);
  const usingTheGridForm = new FormLayoutPage(page)

  await navigateTo.formLayoutsPage();
  await usingTheGridForm.submitUsingTheGridFormWithCredentialsAndSelectOption('test@test.com', '123dd', 'Option 1')
});


test("submit Inline form", async ({ page }) => {
  const navigateTo = new NavigationPage(page);
  const usingTheGridForm = new FormLayoutPage(page);

  await navigateTo.formLayoutsPage();
  await usingTheGridForm.submitInlineFormWithNameEmailAndCheckbox(
    "Henry Henry",
    "123dd@test.com",
    true
  );
});

test('select common datepicker date from today', async ({page})=>{
    const navigateTo = new NavigationPage(page);
    const datepicker = new DatepickerPage(page);
    await navigateTo.datepickerPage()
    await datepicker.selectCommonDatepickerDateFromToday(17)
})

test("select range datepicker date from today", async ({ page }) => {
  const navigateTo = new NavigationPage(page);
  const datepicker = new DatepickerPage(page);
  await navigateTo.datepickerPage();
  await datepicker.selectDatepickerWithRangeFromToday(5,15);
});
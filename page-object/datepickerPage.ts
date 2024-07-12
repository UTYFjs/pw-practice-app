import { expect, Locator, Page } from "@playwright/test";


export class DatepickerPage {
  private readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async selectCommonDatepickerDateFromToday(numberOfDaysFromToday: number) {
    const calendarInputField = this.page.getByPlaceholder("Form Picker");
    await calendarInputField.click();
    const dateToAssert = await this.selectDateInTheCalendar(numberOfDaysFromToday);
    await expect(calendarInputField).toHaveValue(dateToAssert);
  }

  async selectDatepickerWithRangeFromToday(startDayFromToday:number, endDayFromToday: number){
        const calendarInputField = this.page.getByPlaceholder("Range Picker");
        await calendarInputField.click();
        const dateToAssertStart = await this.selectDateInTheCalendar(startDayFromToday);
        const dateToAssertEnd = await this.selectDateInTheCalendar(endDayFromToday);
        await expect(calendarInputField).toHaveValue(`${dateToAssertStart} - ${dateToAssertEnd}`);
  }

  private async selectDateInTheCalendar(numberOfDaysFromToday: number) {
    let date = new Date();
    date.setDate(date.getDate() + numberOfDaysFromToday);
    const expectedDate = date.getDate().toString();
    const expectedMonthShot = date.toLocaleString("En-US", { month: "short" });
    const expectedMonthLong = date.toLocaleString("En-US", { month: "long" });
    const expectedYear = date.getFullYear();
    const dateToAssert = `${expectedMonthShot} ${expectedDate}, ${expectedYear}`;

    let calendarMonthAndYear = await this.page
      .locator("nb-calendar-view-mode")
      .textContent();
    const expectedMonthAndYear = ` ${expectedMonthLong} ${expectedYear}`;
    while (!calendarMonthAndYear.includes(expectedMonthAndYear)) {
      await this.page
        .locator('nb-calendar-pageable-navigation [data-name="chevron-right"]')
        .click();
      calendarMonthAndYear = await this.page
        .locator("nb-calendar-view-mode")
        .textContent();
    }
    await this.page
      .locator('.day-cell.ng-star-inserted')
      .getByText(expectedDate, { exact: true })
      .click();

      return dateToAssert
  }
  
}
//.locator('[class="day-cell ng-star-inserted"]')
import { Locator, Page } from "@playwright/test";

export class FormLayoutPage{
  private readonly page: Page
  constructor(page: Page){
    this.page = page
  }

  /**
   * this method will out Grid form 
   * @param email - valid email
   * @param password - any password
   * @param optionText  - Option 1 or Option 2  - text
   */
  async submitUsingTheGridFormWithCredentialsAndSelectOption (email:string, password: string, optionText: string){
    const usingTheGridForm = this.page.locator("nb-card", {
      hasText: "Using the grid",
    });

    await usingTheGridForm.getByRole('textbox', {name: 'Email'}).fill(email)
    await usingTheGridForm.getByRole("textbox", { name: "Password" }).fill(password);
    await  usingTheGridForm.getByRole("radio", { name: optionText}).check({ force: true });
    await usingTheGridForm.getByRole('button').click()
  }


  /**
   * this method fill out inline form for user details
   * @param name - name should first and last name
   * @param email - valid email
   * @param rememberMe - checkbox
   */
  async submitInlineFormWithNameEmailAndCheckbox(name:string, email:string, rememberMe: boolean){
        const usingInlineForm = this.page.locator("nb-card", {
          hasText: "Inline form",
        });
        await usingInlineForm.getByRole('textbox', {name: 'Jane Doe'}).fill(name)
        await usingInlineForm.getByRole("textbox", { name: "Email" }).fill(email);
        if(rememberMe) await  usingInlineForm.getByRole("checkbox").check({ force: true });
        await usingInlineForm.getByRole('button').click()
  }

  }
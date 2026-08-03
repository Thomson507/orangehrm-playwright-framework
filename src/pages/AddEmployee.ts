import {Page,Locator} from '@playwright/test';
import {BasePage} from './BasePage';
/**
 * AddEmployee — models the "Add Employee" form under PIM.
 * Driven by CSV data (see src/data/employee.csv + tests/pim.spec.ts)
 * so the same class handles every row without duplicating test logic.
 */
export class AddEmployee extends BasePage{
    readonly addButton : Locator;
    readonly firstName : Locator;
    readonly lastName : Locator
    readonly SaveButton : Locator;

    constructor(page : Page){
        super(page);
        this.addButton = page.getByRole('button',{name :' Add '});
        this.firstName = page.getByRole('textbox',{name : 'First Name'});
        this.lastName = page.getByRole('textbox',{name : 'Last Name'});
        this.SaveButton = page.getByRole('button',{name : ' Save '});
    }

    /**
     * Full "add a new employee" flow: opens the Add form, fills the
     * name fields, and saves. A successful save redirects to that
     * employee's Personal Details page (asserted in the test, not here).
     *
     * Note: this method previously included a `waitForLoadState('networkidle')`
     * call after Save, which was removed — it caused unreliable CI timeouts
     * on this server (see README's CI section). BasePage.click()'s
     * toBeEnabled() check is a more precise, reliable wait than networkidle.
     */
    
    async AddEmployeeDetails(firstname : string,lastname : string) : Promise<void> {
      
        await this.waitForElement(this.addButton);
        await this.click(this.addButton);
        await this.waitForElement(this.firstName);
        await this.fill(this.firstName,firstname);
        await this.waitForElement(this.lastName);
        await this.fill(this.lastName,lastname);
        await this.waitForElement(this.SaveButton);
        await this.click(this.SaveButton);
    }
}
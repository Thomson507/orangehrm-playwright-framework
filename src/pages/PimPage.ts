import {Page,Locator} from '@playwright/test';
import {BasePage} from './BasePage';

 
/**
 * PimPage — models the PIM module's employee search screen
 * (/pim/viewEmployeeList). Handles the multi-step search flow:
 * typing a partial name, picking the right match from an autocomplete
 * dropdown, filling employee ID, and selecting employment status
 * from a second dropdown — all before submitting the search.
 */

export class PimPage extends BasePage{
    readonly Pimmenu : Locator;
    readonly employeeName : Locator;
    readonly employeeNameDropdown : Locator;
    readonly employeeId : Locator;
    readonly employeeStatus : Locator;
    readonly employeeStatusDropdown : Locator;
    readonly searchButton : Locator;
    
    constructor(page : Page){
        super(page);
        this.Pimmenu = page.getByRole('link',{name :'PIM'});
        // .first() because the placeholder text is reused elsewhere on
        // the page (e.g. supervisor search) — this targets the employee
        // name field specifically, confirmed via codegen.
        this.employeeName = page.getByPlaceholder('Type for hints...').first();
        this.employeeNameDropdown = page.locator('//div[@class="oxd-autocomplete-dropdown --positon-bottom"]/div');
        this.employeeId = page.locator('//div[@class="oxd-grid-item oxd-grid-item--gutters"]/div/div/input');
        this.employeeStatus = page.locator('//div[@class="oxd-select-wrapper"]/div/div/i').nth(0);
        this.employeeStatusDropdown = page.locator('//div[@class="oxd-select-dropdown --positon-bottom"]/div[@class="oxd-select-option"]');
        this.searchButton = page.getByRole('button', { name: ' Search ' });
        
    }
     //Opens the PIM module from the sidebar.
    async clickPimMenu() : Promise<void> {
        await this.waitForElement(this.Pimmenu);
        await this.click(this.Pimmenu);
    }
     /**
     * Runs a full employee search using a partial name match.
     * The autocomplete dropdown returns multiple matches for a partial
     * name, so this loops through the results and clicks the one whose
     * text exactly matches the expected full name — same pattern used
     * for the employment-status dropdown further down.
     */
    async employeesearchPartial(empname : string,employee :string,employeeId :string,employeeStatus :string) : Promise<void> {
        await this.waitForElement(this.employeeName);

          // pressSequentially (not fill) so the autocomplete actually
        // triggers — fill() sets the value instantly and skips the
        // keystroke events OrangeHRM's autocomplete listens for.

        await this.employeeName.pressSequentially(empname);
        //await this.waitForElement(this.employeeNameDropdown);
        const dropdownOptions =  this.employeeNameDropdown;
        const dropdownCount = await dropdownOptions.count();
        for(let i=0;i<dropdownCount;i++){
            if(await dropdownOptions.nth(i).innerText() === employee){
                await dropdownOptions.nth(i).click();
                break;
            }
        }
        await this.waitForElement(this.employeeId);
        await this.fill(this.employeeId,employeeId);
        await this.waitForElement(this.employeeStatus);
        await this.click(this.employeeStatus);

         /**  Same "loop and match exact text" pattern as the name dropdown
        above, applied to the employment-status options.*/

        const statusDropdownOptions = this.employeeStatusDropdown;
        const statusDropdownCount = await statusDropdownOptions.count();
        for(let i=0;i<statusDropdownCount;i++){
            if(await statusDropdownOptions.nth(i).innerText() === employeeStatus){
                await statusDropdownOptions.nth(i).click();
                break;
            }
        }
        await this.waitForElement(this.searchButton);
        await this.searchButton.click();

    }
    
}
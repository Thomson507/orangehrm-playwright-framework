import {Page, Locator,expect} from '@playwright/test';
 
/**
 * BasePage — shared foundation for every Page Object in the framework.
 * All page classes extend this instead of duplicating common Playwright
 * actions, so a fix or improvement here (e.g. a better wait strategy)
 * automatically applies to every page.
 */

export class BasePage {
    readonly page :Page;

    constructor(page :Page){
        this.page = page;
    }
    //Navigates to a relative path off the configured baseURL.

    async goto(path : string='/') : Promise<void>{
        await this.page.goto(path);
    }
     /**
     * Waits for a locator to be visible before any interaction is attempted.
     * Centralizing this avoids repeating waitFor() in every page method.
     */
    async waitForElement(locator : Locator) : Promise<void>{
        await locator.waitFor({state : 'visible'});
    }
    //Fills a text field, but only after confirming it's visible
    async fill(locator : Locator, value : string) : Promise<void>{
        await this.waitForElement(locator);
        await locator.fill(value);   
    }
    
    /**
     * Defensive click wrapper — this is the core reliability mechanism
     * of the whole framework:
     *  1. wait until visible
     *  2. scroll it into view (handles elements below the fold)
     *  3. assert it's actually enabled (catches disabled/loading buttons
     *     that are technically "visible" but not yet clickable)
     *  4. only then click
     * This sequence directly fixed a real flaky-click bug found during
     * CI testing — see AddEmployee.ts history / README for details.
     */

    async click(locator : Locator) : Promise<void>{
        await locator.waitFor({state : 'visible'});
        await locator.scrollIntoViewIfNeeded();
        await expect(locator).toBeEnabled();
        await locator.click();
    }
     /**
     * Reads and trims the visible text of an element.
     * Falls back to an empty string if textContent() returns null,
     * so callers never have to null-check the result themselves.
     */
    async getText(locator : Locator) : Promise<string>{
        await this.waitForElement(locator);
        return (await locator.textContent())?.trim() ?? '';
    }
}
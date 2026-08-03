import {Page,Locator} from '@playwright/test';
import {BasePage} from './BasePage';
/**
 * DashboardPage — models the post-login landing screen.
 * Kept intentionally minimal: its only job right now is to prove a
 * login actually succeeded, by confirming the "Dashboard" heading loads.
 * Extend this if more dashboard-specific assertions are needed later.
 */
export class DashboardPage extends BasePage{
    readonly DashBoardheader : Locator;
    constructor(page :Page){
        super(page);
        this.DashBoardheader = page.getByRole('heading',{name : 'Dashboard'});
    }

    /**
     * Confirms the dashboard has loaded by reading its header text.
     * Used both as a direct assertion target and as a "did login work"
     * checkpoint inside the auth fixture (see auth.fixture.ts).
     */
    async getDashBoardHeaderText() : Promise<string>{
        await this.getText(this.DashBoardheader);
        return await this.getText(this.DashBoardheader);
    }
}
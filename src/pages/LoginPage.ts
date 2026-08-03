import {Page ,Locator} from '@playwright/test';
import {BasePage} from './BasePage';

 
/**
 * LoginPage — models OrangeHRM's login screen.
 * Covers both the happy path (valid login) and the negative path
 * (invalid credentials → error message), used across tests/login.spec.ts
 * and as the entry point for the `loggedIn` auth fixture.
 */

export class LoginPage extends BasePage {
    readonly UsernameInput : Locator;
    readonly PasswordInput : Locator;
    readonly LoginButton : Locator; 
    readonly ErrorMessage : Locator;
   

    constructor(page :Page){
        super(page);
        this.UsernameInput = page.getByPlaceholder('Username');
        this.PasswordInput = page.getByPlaceholder('Password');
        this.LoginButton = page.getByRole('button', {name : 'Login'});
        // XPath used here because this error banner has no accessible
        // role/name Playwright can target cleanly — confirmed via codegen.
        this.ErrorMessage = page.locator('//div[@class="orangehrm-login-error"]/div/div/p');
    }
    //Navigates directly to the login URL (bypasses any prior page state).
    async gotoLogin(): Promise<void>{
        await this.goto('/web/index.php/auth/login');
    }
    // Fills credentials and submits the form — the standard login flow.
    async login(username : string,password :string): Promise<void>{
        await this.fill(this.UsernameInput, username);
        await this.fill(this.PasswordInput, password);
        await this.click(this.LoginButton);
    }
    /**
     * Reads the error banner text after a failed login attempt.
     * Used by the negative-path test to confirm OrangeHRM actually
     * rejects invalid credentials rather than just failing to redirect.
     */
    async getErrorMessage(): Promise<string>{
        await this.waitForElement(this.ErrorMessage);
        return await this.getText(this.ErrorMessage);
    }
}
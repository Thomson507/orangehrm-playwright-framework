import {test as base} from '@playwright/test';
import {LoginPage} from '../pages/LoginPage';
import {DashboardPage} from '../pages/DashboardPage';
import {PimPage} from '../pages/PimPage';
import {AddEmployee} from '../pages/AddEmployee';

 
/**
 * page.fixture.ts — injects every Page Object into tests as a fixture,
 * so specs never do `new LoginPage(page)` manually. Add a new page
 * class here once, and every test gets access to it via destructuring
 * (e.g. `async ({ loginPage }) => {...}`).
 */

 type Pages ={
    loginPage : LoginPage;
    dashboardPage : DashboardPage;
    pimPage : PimPage;
    addEmployee : AddEmployee;
 };

 export const test = base.extend<Pages>({
    loginPage : async ({page},use)=>{
        await use(new LoginPage(page));
    },
    dashboardPage : async ({page},use)=>{
        await use(new DashboardPage(page));
    },
    pimPage : async ({page},use)=>{
        await use(new PimPage(page));
    },
    addEmployee : async ({page},use)=>{
        await use(new AddEmployee(page));
    }
 });

 export const expect = test.expect;
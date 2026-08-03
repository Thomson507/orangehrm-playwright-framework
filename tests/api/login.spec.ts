import { test, expect } from '@playwright/test';

test('Login via raw api call succeeds', async({request})=>{
    const loginPageresposnse = await request.get('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    const html = await loginPageresposnse.text();
    
    const tokenMatch = (await html).match(/:token="&quot;([^&]+)&quot;"/);
    expect (tokenMatch).not.toBeNull();
    const token = tokenMatch![1];

    const loginResponse = await request.post('https://opensource-demo.orangehrmlive.com/web/index.php/auth/validate',{form:{
        _token :token,
        username :'Admin',
        password :'admin123'
    },
    maxRedirects : 0,
})
 expect(loginResponse.status()).toBe(302);
  expect(loginResponse.headers()['location']).toContain('dashboard');
})
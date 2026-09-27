export const validUser = {
    username: process.env.ORANGEHRM_USERNAME ?? 'admin',
    password: process.env.ORANGEHRM_PASSWORD ?? 'admin123'
};

export const invalidUser = {
    username: 'invaliduser',
    password: 'invalidpword'
};
export const invalidErrorMesage = 'Invalid credentials';
export const dashboardHeader = 'Dashboard';
import {test, expect} from '../src/fixtures/auth.fixture';
import {Pimpagedata} from '../src/data/pimpagedata';
import {readCsv} from '../src/utils/csvReader';

type EmployeeRow = {firstName : string, lastName : string};
const employees = readCsv<EmployeeRow>('../src/data/employee.csv');

test.describe('PIM page test',()=>{
test ('PIM page test',async ({loggedIn,pimPage})=>{
    await pimPage.clickPimMenu();
    await pimPage.employeesearchPartial(Pimpagedata.empName,Pimpagedata.employee,Pimpagedata.employeeId,Pimpagedata.employeeStatus)
})
for (const emp of employees){
test (`Add Employee test - ${emp.firstName} ${emp.lastName}`,async ({loggedIn,pimPage,addEmployee})=>{
    await pimPage.clickPimMenu();
    await addEmployee.AddEmployeeDetails(emp.firstName,emp.lastName);
})
}}) 
 
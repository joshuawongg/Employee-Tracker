
const inquirer = require('inquirer')
const QueryInterface = require('./app/js/query')

async function init(){

    let running = true;

    while (running) {
        const { action } = await inquirer.prompt({
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: [
                'View All Departments',
                'View All Roles',
                'View All Employees',
                'Add A Department',
                'Add A Role',
                'Add An Employee',
                'Update An Employee Role'
            ]
        })
    

    switch(action) {
        case 'View All Departments': 
            const departments = await QueryInterface.viewAllDepartments();
            console.log('\n', departments[0])
            break;
        
        case 'View All Roles':
            const roles = await QueryInterface.viewAllRoles();
            console.log('\n', roles[0])
            break;
        
        case 'View All Employees':
            const employees = await QueryInterface.viewAllEmployees();
            console.log('\n', employees[0])
            break;

        case 'Add A Department':
            const { name } = await inquirer.prompt(
                {
                    type: 'input',
                    name: 'name',
                    message: 'Enter new department name'
                }
            )
            await QueryInterface.addDepartment(name);
            console.log('New Department Added!')
            break;
        
        case 'Add A Role':
            const newRole = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'title',
                    message: 'Enter new role name'
                },
                {
                    type: 'input',
                    name: 'salary',
                    message: 'Enter the salary for this role'
                },
                {
                    type: 'list',
                    name: 'department_id',
                    message: 'Select the department for this role',
                    choices: await QueryInterface.listDepartments()
                }
            ])
            await QueryInterface.addRole(newRole);
            console.log('New Role Added!')
            break;

        case 'Add An Employee':
            const newEmployee = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'first_name',
                    message: 'Enter the employees first name'

                },
                {
                    type: 'input',
                    name: 'last_name',
                    message: 'Enter the employees last name'

                },
                {
                    type: 'list',
                    name: 'role_id',
                    message: 'Select the role for the employee',
                    choices: await QueryInterface.listRoles()
                },
                {
                    type: 'list',
                    name: 'manager_id',
                    message: 'Select the manager for this employee',
                    choices: await QueryInterface.listEmployees()
                }
            ])
            await QueryInterface.addEmployee(newEmployee)
            console.log('New Employee Added!')
            break;

        case 'Update An Employee Role':
            const updateRole = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'id',
                    message: 'Select the employee to be updated',
                    choices: await QueryInterface.listEmployees
                },
                {
                    type: 'list',
                    name: 'role_id',
                    message: 'Select their new role',
                    choices: await QueryInterface.listRoles()
                }
            ])
            await QueryInterface.updateEmployeeRole(updateRole)
            console.log('Employee Role Updated!')
            break; 
    }}
}
init()

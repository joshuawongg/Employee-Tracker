const db = require('./db')

class QueryInterface {
    
    async viewAllDepartments(){
        const results = await db.query('SELECT * FROM department')
        return results; 
    }

    viewAllRoles(){
        return db.query(`
            SELECT
                role.id,
                role.title,
                department.name AS department,
                role.salary
            FROM
                role
                INNER JOIN department ON role.department_id = department.id
        `)
    }

    viewAllEmployees(){
        return db.query(`
            SELECT
                e.id, 
                e.first_name,
                e.last_name,
                r.title,
                d.name AS department,
                r.salary,
                CONCAT(m.first_name, ' ', m.last_name) AS manager
            FROM
                employee AS e
                INNER JOIN role AS r ON e.role_id = r.id
                INNER JOIN department AS d ON r.department_id = d.id
                LEFT JOIN employee AS m ON e.manager_id = m.id
        `)
    }

    addDepartment(name){
        return db.query('INSERT INTO department SET ?', {name});
    };

    addRole({ title, salary, department_id}){
        return db.query('INSERT INTO role SET ?', {title, salary, department_id});
    };

    addEmployee({ first_name, last_name, role_id, manager_id }){
        return db.query('INSERT INTO employee SET ?', {first_name, last_name, role_id, manager_id});
    };

    updateEmployeeRole({ id, role_id}){
        return db.query("UPDATE employee SET role_id = ? WHERE id = ?", [role_id, id]);
    };

    async listDepartments(){
        const departments = await this.viewAllDepartments()
        const choices = departments[0].map(department => {
            return { name: department.name, value: department.id}
        })
        return choices 
    };

    async listRoles(){
        const roles = await this.viewAllRoles()
        const choices = roles[0].map(role => {
            return { name: role.title, value: role.id }
        })
        return choices 
    };

    async listEmployees(){
        const employees = await this.viewAllEmployees()
        const choices = employees[0].map(employee => {
            return { name: `${employee.first_name} ${employee.last_name}`, value: employee.id}
        })
        choices.push({ name: "None", value: null})
        return choices
    };
}

module.exports = new QueryInterface(); 


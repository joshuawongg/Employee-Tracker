const mysql = require('mysql2');

const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '12341234',
    database: 'employeeDB'
}).promise();

module.exports = db; 


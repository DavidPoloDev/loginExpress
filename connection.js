const mysql = require('mysql2/promise');
const connection = mysql.createPool({
    host: process.env.HOSTDB ||'localhost',
    user: process.USERDB || 'root',
    database: process.DB || 'login',
    password: process.PASSWORDDB || '',
    port: process.env.PORTDB || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    connectTimeout: 20000
    });

module.exports = connection;
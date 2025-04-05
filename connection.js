const mysql = require('mysql2/promise');

const connection = mysql.createPool({
    host: process.env.HOSTDB || 'localhost',
    user: process.env.USERDB || 'root',       // Corregido: process.env.USERDB
    database: process.env.DB || 'login',      // Corregido: process.env.DB
    password: process.env.PASSWORDDB || '',   // Corregido: process.env.PASSWORDDB
    port: process.env.PORTDB || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    connectTimeout: 20000
});

module.exports = connection;
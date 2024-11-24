const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'faydro', // Replace with your actual password
    database: 'task_manager',
    port: 3308 // Specify the correct port here
});

db.connect(err => {
    if (err) throw err;
    console.log('MySQL Connected...');
});

module.exports = db;

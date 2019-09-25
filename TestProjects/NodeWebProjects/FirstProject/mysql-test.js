var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'test'
});

connection.connect();

connection.query('select * from user', function (error, results, fields) {
    if (error){
        console.log("error!",error);
        return;
    }
    console.log(results[0].password, fields[0].name);
});
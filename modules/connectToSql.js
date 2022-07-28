var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'formses'
});

const connectionStatus = function (err) {
    if (err) {
        console.log('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);
}

connection.connect(connectionStatus);
// module.exports = console.log("test");

// connection.query('SELECT * FROM companies', function (error, results, fields) {
//     if (error) throw error;
//     console.log('The solution is: ', results);
//   });


module.exports = connection;





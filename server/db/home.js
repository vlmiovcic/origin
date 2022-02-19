const mysql = require('mysql');
const dbConfig = require('./configdb.json');


const condb = mysql.createConnection({
    host: dbConfig.db.host,
    user: dbConfig.db.user,
    password: dbConfig.db.password,
    database: dbConfig.db.name

});

condb.connect(function(error){
    if(error) throw error;
    console.log(' is connected.');
});

module.exports = condb;
/*var ejs= require('ejs');
var mysql = require('mysql');
*/
//Put your mysql configuration settings - user, password, database and port
/*function getConnection(){
	var pool = mysql.createPool({
	    connectionLimit : 100,
		host     : 'sensor-cloud-database.cpes3a3lpx4t.us-west-1.rds.amazonaws.com',
	    user     : 'mscloud',
	    password : 'mscloud123',
	    database : 'GPX',
	    port	 : 3306
	});
	return pool;
}
*/
var ejs= require('ejs');
var mysql = require('mysql');

//Put your mysql configuration settings - user, password, database and port
function getConnection(){
	var connection = mysql.createConnection({
		host     : 'sensor-cloud-database.cpes3a3lpx4t.us-west-1.rds.amazonaws.com',
	    user     : 'mscloud',
	    password : 'mscloud123',
	    database : 'GPX',
	    port	 : 3306
	});
	return connection;
}


function fetchData(callback,sqlQuery){
	
	console.log("\nSQL Query::"+sqlQuery);
	
	var connection=getConnection();
	
	connection.query(sqlQuery, function(err, rows, fields) {
		if(err){
			console.log("ERROR: " + err.message);
		}
		else 
		{	// return err or result
			console.log("DB Results:"+rows);
			callback(err, rows);
		}
	});
	console.log("\nConnection closed..");
	connection.end();
}	

exports.fetchData=fetchData;
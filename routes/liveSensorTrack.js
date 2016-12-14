var mysql = require('./mysql');

exports.getliveSensorPage = function(req, res){
	  
	if (req.session.email) {
		res.header(
						'Cache-Control',
						'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
		
		//var queryStr = "select * from Location ORDER BY id DESC LIMIT 1";
		var queryStr = "select * from Location";
		//console.log("")
		mysql.fetchData(function(err, results) {
			if (err) {
				console.log("Error in db connection: "+err);
				throw err;
			} else {
				var jsonString1= JSON.stringify(results);
				var passParsed= JSON.parse(jsonString1);
				console.log("I am in live sensor js function: "+results);
				//console.log("Results "+results[0].lattitude);
				res.render('liveSensor', { "firstName":req.session.firstName, "results": results });
				//res.render('liveSensor', { "firstName":req.session.firstName, lat: results[0].lattitude, lng: results[0].longitude });
				//res.send({dataSaved: true});
			}
		}, queryStr);
		
		
		
	}//res.render('liveSensor', { title: 'Express' , "firstName":req.session.firstName});
	else{
		res.render('customerLogin', {"status":1});
	}
};
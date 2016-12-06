var mysql = require('./mysql');
exports.getRequestSensorPage = function(req, res){
	  
	if (req.session.email) {
		res.header(
						'Cache-Control',
						'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
		
		var selectRequests="SELECT * FROM SensorRequest where email='"+req.session.email+"'";
		mysql.fetchData(function(err, results) {
			if (err) {
				throw err;
			} else {
					res.render('requestSensor', { title: 'Express', firstName: req.session.firstName, "results":results });
			}
		}, selectRequests);
		
		}
	else{
		res.render('customerLogin', {"status":1});
	}
};


exports.requestSensor= function(req, res){
	  
	if (req.session.email) {
		res.header(
						'Cache-Control',
						'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
	
		var sensorName=req.param("sensorName");
		var location=req.param("location");
		var insertQuery="INSERT INTO SensorRequest (email, sensorRequested, sensorLocation) values ('"+req.session.email+"', '"+sensorName+"', '"+location+"')";
		
		mysql.fetchData(function(err, results) {
			if (err) {
				throw err;
			} else {
					res.redirect('/getRequestSensor');
			}
		}, insertQuery);
		}
	else{
		res.render('customerLogin', {"status":1});
	}
};
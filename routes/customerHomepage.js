var mysql = require('./mysql');

exports.getCustomerHomepage = function(req, res){
	if (req.session.email) {
		res.header(
						'Cache-Control',
						'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');

	console.log("User's name: "+req.session.firstName);	
	
	var checkU="SELECT * from Subscription WHERE email='"+req.session.email+"'";
	var checkUserSubscription="SELECT * FROM Sensor s INNER JOIN Subscription sb ON s.sensorId = sb.sensorId AND sb.email='"+req.session.email+"'";
	
	mysql.fetchData(function(err, results) {
		if (err) {
			throw err;
		} else {
			if(results.length>0){
				var jsonString1= JSON.stringify(results);
				var passParsed= JSON.parse(jsonString1);
				console.log("aaaaaaa"+jsonString1);
				res.render('customerHomepage', { "firstName": req.session.firstName, "subsrcibed": 1, "results": results });
			}
			else{
				res.render('customerHomepage', { "firstName": req.session.firstName, "subsrcibed": 0, "results": results });
			}	
		}
	}, checkUserSubscription);
	
	
	}else{
		res.render('customerLogin', {"status":1});
	}
};
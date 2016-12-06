var mysql = require('./mysql');
var moment = require('moment');


/*var now = moment(new Date()); //todays date
var end = moment("2015-12-1"); // another date
var duration = moment.duration(now.diff(end));
var days = duration.asDays();
console.log(days)*/


exports.getBillPage = function(req, res){
	
	if (req.session.email) {
		res.header(
						'Cache-Control',
						'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');

	console.log("User's name: "+req.session.firstName);	

	var diff=0;
	var bill=[];
	//Calculate the unsubscribed bills:
	var unsubscriptionQuery="SELECT * FROM GPX.Unsubscription WHERE email='"+req.session.email+"'";
	var ts, tu;
	mysql.fetchData(function(err, results) {
		if (err) {
			throw err;
		} else {
			var jsonBills={};
			console.log("In billing page- unsubscription details getting"+ JSON.stringify(results[0]));
			for (var i in results){
				ts=moment(results[i].timeSubscribed);
				tu=moment(results[i].timeUnsubscribed);
				var duration = moment.duration(tu.diff(ts));
				var hours = duration.asHours();
				console.log("Difference in time: "+(hours*5));
				bill.push(hours*5);
				console.log("Bill array"+bill);
			}
			res.render('billing', { "results": results, "bill":bill, "firstName":req.session.firstName});
		}
	}, unsubscriptionQuery);}
	else{
		res.render('customerLogin', {"status":1});
	}
	
};

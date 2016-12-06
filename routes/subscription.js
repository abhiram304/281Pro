var mysql = require('./mysql');
var moment=require('moment');

exports.getSubscriptionPage = function(req, res){	
	if (req.session.email) {
		res.header(
						'Cache-Control',
						'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');

	console.log("User's name: "+req.session.firstName);
	var sensorJson={};
	//var getSensorsAvailable="SELECT * FROM Sensor";
	//var checkSensorsSubscribed="SELECT * FROM Subscription where"
	var checkUserSubscription="SELECT s.sensorId,s.sensorName, sb.timeSubscribed, sb.timeUnsubscribed FROM Sensor s INNER JOIN Subscription sb ON s.sensorId = sb.sensorId AND sb.email='"+req.session.email+"'";;
	var checkUserNotSubscribed="select sensorId,sensorName from Sensor Where sensorId NOT IN (SELECT sensorId FROM Subscription where email='"+req.session.email+"')";
	mysql.fetchData(function(err, results) {
		if (err) {
			throw err;
		} else {
			sensorJson.resultsSub=results;
			mysql.fetchData(function(err, results) {
				if (err) {
					throw err;
				} else {
					sensorJson.resultsNotSub=results;
					console.log("Results Subscribed: "+JSON.stringify(sensorJson.resultsSub));
					console.log("Results Not Subscribed: "+JSON.stringify(sensorJson.resultsNotSub));
					res.render('subscription', { "results": sensorJson });		
				}
			}, checkUserNotSubscribed);	
		}
	}, checkUserSubscription);
}
else{
		res.render('customerLogin', { "status":1 });
}
};


exports.unSubscribeMe = function(req, res){
	var choice=req.param("sensorIdToUnSubscribe");
	var currentTime=req.param("currentTime");
	console.log("Choice : "+choice);
	console.log("Current Time : "+currentTime+" New formatted date"+moment(currentTime).format('YYYY-MM-DD HH:mm:ss'));
	var timeSubscribed="";
	var unsubscribeQuery="UPDATE Subscription SET timeUnsubscribed='"+currentTime+"' WHERE email='"+req.session.email+"'";
	
	var getSubscriptionTime="SELECT timeSubscribed FROM GPX.Subscription WHERE email='"+req.session.email+"' AND sensorId='"+choice+"'";
	
	console.log("unsubscribeQuery"+unsubscribeQuery);
	console.log("getSubscriptionTime: "+getSubscriptionTime);
	mysql.fetchData(function(err, results) {
		if (err) {
			throw err;
		} else {
			console.log("Time subscribed: "+results[0].timeSubscribed);
			timeSubscribed=results[0].timeSubscribed;
			console.log("Time subs being entered into the unsub from suub: "+results[0].timeSubscribed);
			var dd = timeSubscribed.getDate();
		    var mm = timeSubscribed.getMonth()+1; //January is 0!
		    var yyyy = timeSubscribed.getFullYear();

		    if(dd<10) {
		        dd="0"+dd
		    } 

		    if(mm<10) {
		        mm="0"+mm
		    } 

		    

		    console.log("Time: "+timeSubscribed);
		    timeSubscribed = yyyy+"-"+mm+"-"+dd+ " " +timeSubscribed.getHours() + ":" + timeSubscribed.getMinutes()+":" + timeSubscribed.getSeconds();

			var inserIntoUnSubscriptionTime="INSERT INTO Unsubscription (email, sensorId, timeSubscribed, timeUnsubscribed) values('"+req.session.email+"', '"+choice+"', '"+timeSubscribed+"', '"+currentTime+"')";
			mysql.fetchData(function(err, results) {
				if (err) {
					throw err;
				} else {
					console.log("Inserted  into unsubscription table");
					var deleteFromSubscription="DELETE FROM Subscription WHERE email='"+req.session.email+"' AND sensorId='"+choice+"'";
					mysql.fetchData(function(err, results) {
						if (err) {
							throw err;
						} else {
							console.log("Deleted entry from subscription");
							
							res.redirect('/subscription');
						}
					}, deleteFromSubscription);
				}
			}, inserIntoUnSubscriptionTime);	
			
		}
	}, getSubscriptionTime);	
	

};

exports.subscribeMe = function(req, res){
	var choice=req.param("sensorIdToSubscribe");
	var time=req.param("currentTime1");
	console.log("Choice :"+choice);
	console.log("Time: "+time);
	//moment.utc(moment(now,"DD/MM/YYYY HH:mm:ss").diff(moment(then,"DD/MM/YYYY HH:mm:ss"))).format("HH:mm:ss")
	var subscribeQuery="INSERT INTO Subscription (email, sensorId, timeSubscribed) values('"+req.session.email+"', '"+choice+"', '"+time+"')";
	mysql.fetchData(function(err, results) {
		if (err) {
			throw err;
		} else {
			res.redirect('/subscription');
		}
	}, subscribeQuery);

};





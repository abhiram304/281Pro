var mysql = require('./mysql');
exports.getBillPage = function(req, res){
  
	//Calculate the unsubscribed bills:
	var unsubscriptionQuery="SELECT * FROM GPX.Unsubscription WHERE email='"+req.session.email+"'";
	mysql.fetchData(function(err, results) {
		if (err) {
			throw err;
		} else {
			console.log("In billing page- unsubscription details getting"+ JSON.stringify(results[0]));
			res.render('billing', { "results": results});
		}
	}, unsubscriptionQuery);
	
};

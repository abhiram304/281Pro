
var ejs = require("ejs");
var mysql = require('./mysql');


exports.signup = function(req, res){
  res.render('customerSignup', { "status": 0 });
};

exports.signed = function(req, res) {
	var fname = req.body.FirstName;
	var details = {
		firstName : req.body.firstName,
		lastName : req.body.lastName,
		email : req.body.email,
		password : req.body.password,
		phone: req.body.phone
	};
	var detailsS = JSON.stringify(details);
	var detailsP = JSON.parse(detailsS);
	console.log(detailsP.userid);
	
	/*SHOULD CHECK DUPLICATE ENTRIES*/
	var checkEmailExist="SELECT * from User where email='"+detailsP.email+"'";
	var queryStr = "INSERT INTO User(firstName,lastName ,email, pass, phone) VALUES('" + detailsP.firstName+"', '"+detailsP.lastName
				+ "', '" + detailsP.email + "', '" + detailsP.password+"', '"+detailsP.phone+"')";
		// var queryStr="INSERT INTO USERDETAILS
		// VALUES('fn','lna',STR_TO_DATE('1-01-2012',
		// '%d-%m-%Y'),"+detailsP.email+"'pass','thandle','123')"";
		mysql.fetchData(function(err, results) {
			if (err) {
				throw err;
			} else {
				if(results.length>0){
					res.render('customerSignup',{"status": 1});
				}
				else{
					mysql.fetchData(function(err, results) {
						if (err) {
							throw err;
						} else {
							res.render('customerLogin',{"status": 1});
						}
					}, queryStr);
				}
				
			}
		}, checkEmailExist);

};
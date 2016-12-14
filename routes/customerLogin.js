var mysql = require('./mysql');
//var passwordHash = require('password-hash');
exports.getLogin = function(req, res){
		res.render('customerLogin',{"status":1});
};


exports.checkLogin = function(req, res){
	var email=req.body.email;
	var password=req.body.password;
	console.log("Userid :"+ password);
	var query="select * from User where (email='"+email+"' AND pass='"+password+"')";
	mysql.fetchData(
			function(err, results) {
				if (err) {
					console.log("Error: Some problem with db"+err);
					throw err;
				} else {
					if(results.length>0){
						var jsonString1= JSON.stringify(results);
						var passParsed= JSON.parse(jsonString1);
						console.log("results "+jsonString1);
						req.session.email=email;
						req.session.firstName=results[0].firstName;
						res.redirect('/customerHomepage');
						
					}
					else{
						console.log("Couldn't find userid");
						res.render('customerLogin', {"status": 0});
					}
				}
				
			}, query);
	
};



/*exports.checkLogin = function(req, res){
	var username, password;
	username = req.body.username;
	password = req.body.password;
	var bool=0;
	console.log("Username:"+username);
	//var hashedPass=passwordHash.generate(password);
	//console.log(hashedPass);
	var passUser = "select * from User where username='"
		+ username +"' and password='"+password+"'";
	

	
	mysql.fetchData(
			function(err, results) {
				if (err) {
					console.log("errorrrrrrrr"+err);
					throw err;
				} else {
					var jsonString1= JSON.stringify(results);
					var passParsed= JSON.parse(jsonString1);
					console.log("results "+jsonString1);
					res.render('LoginSuccessful');
					res.send(json_responses);
				}
				
			}, passUser);
*/

	
	
	
	//var getUser = "select * from userdetails where email='"
	//+ username + "' and pass='" + password + "'";
	//var json_responses;
	
	/*mysql.fetchData(
			function(err, results) {
				if (err) {
					throw err;
				} else {
					if (results.length > 0) {
						
						console.log(results);
						//var pass=results;
						var jsonString1= JSON.stringify(results);
						var passParsed= JSON.parse(jsonString1);
						console.log(passParsed[0].password);
						console.log("password_----"+password);
						var p=passParsed[0].password;
						if(passwordHash.verify(req.body.password,'sha1$c9c76677$1$1b823283fc0cf1340bfb439361d085103f'))
						{	//req.session.username = username;
						    console.log("Session initialized-password match!!");
						    json_responses = {"statusCode" : 200};
						    res.render('LoginSuccessful');
						}
						else{
							console.log("password not matched");
							json_responses = {"statusCode" : 401};
							res.send(json_responses);
						}
					}
					else{
						console.log("username not matched");
						json_responses = {"statusCode" : 401};
						res.send(json_responses);

					}
				}
				
			}, passUser);
*/
	
	//res.render('LoginSuccessful', { title: 'Express' });

/*LOGOUT*/
exports.logout = function(req,res)
{
	req.session.destroy();
	res.render('customerLogin', {"status":1});
};
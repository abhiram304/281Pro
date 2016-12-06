





exports.getliveSensorPage = function(req, res){
	  
	if (req.session.email) {
		res.header(
						'Cache-Control',
						'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
	res.render('liveSensor', { title: 'Express' , "firstName":req.session.firstName});}
	else{
		res.render('customerLogin', {"status":1});
	}
};


exports.getMySensorsPage = function(req, res){
	if (req.session.email) {
		res.header(
						'Cache-Control',
						'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
	res.render('UserMySensors', { title: 'Express', "firstName":req.session.firstName });}
	else{
		res.render('customerLogin', {"status":1});
	}
};
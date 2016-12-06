





exports.getliveSensorPage = function(req, res){
	  
	
	res.render('liveSensor', { title: 'Express' });
};


exports.getMySensorsPage = function(req, res){
	  
	
	res.render('UserMySensors', { title: 'Express' });
};
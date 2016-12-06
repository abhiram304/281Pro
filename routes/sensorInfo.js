var weather = require('openweather-apis');
weather.setLang('en');
var mysql = require('./mysql');
exports.getMysensorInfo = function(req, res){
	
	var choice=req.param("sensorId");
	if(choice=='1'){
		res.redirect('/weatherSensor');
	}
	else if(choice=='2'){
		res.redirect('/elephantSensor');
	}
	
};

//Weather
exports.getWeatherInfo = function(req, res){
	if (req.session.email) {
		res.header(
						'Cache-Control',
						'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
		var ownKey="1549dd863cf5dccdb6a7593a854d8077";
		var tempA=[]; var presA=[]; var humA=[];var descA=[];
		var jsonobj={};
		var getWeatherDataQuery="SELECT * FROM Weather;"
			weather.setUnits('metric');
		weather.setAPPID(ownKey);
		mysql.fetchData(
				function(err, results) {
					if (err) {
						console.log("errorrrrrrrr"+err);
						throw err;
					} else {
						
						console.log(JSON.stringify(results[0]));
						for(var i=0;i<results.length;i++){
							weather.setCoordinate(results[i].Lat, results[i].Lng);
							
							weather.getTemperature(function(err, temp){
								tempA.push(temp);
								console.log(tempA);
						    });
						 
						    // get the Atm Pressure 
						    weather.getPressure(function(err, pres){
						    	presA.push(pres);
						    	console.log(presA);
						    });
						 
						    // get the Humidity 
						    weather.getHumidity(function(err, hum){
						    	humA.push(hum);
						    	console.log(humA);
						    });
						 
						    // get the Description of the weather condition 
						    weather.getDescription(function(err, desc){
						    	descA.push(desc);
						    	console.log(descA);
						    });	
						
						}
						
						console.log("Temperature: "+tempA)
						jsonobj.temp=tempA;
						jsonobj.pres=presA;
						jsonobj.hum=humA;
						jsonobj.desc=descA;
						console.log("Json object: "+JSON.stringify(jsonobj.temp));
					
						res.render('weatherSensor',{"firstName": req.session.firstName, "results": results});
					}
					
				}, getWeatherDataQuery);
		
		
		
		/*weather.getTemperature(function(err, temp){
	        console.log(temp);
	    });
	 
	    // get the Atm Pressure 
	    weather.getPressure(function(err, pres){
	        console.log(pres);
	    });
	 
	    // get the Humidity 
	    weather.getHumidity(function(err, hum){
	        console.log(hum);
	    });
	 
	    // get the Description of the weather condition 
	    weather.getDescription(function(err, desc){
	        console.log(desc);
	    });
	    
	    // get all the JSON file returned from server (rich of info) 
	    weather.getAllWeather(function(err, JSONObj){
	        console.log(JSONObj);
	    });*/
	
	}
	else{
		res.render('customerLogin', {"status":1});
	}
};




/*exports.setWeatherDetails= function(req, res){
	if (req.session.email) {
		res.header(
						'Cache-Control',
						'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');

	//console.log("User's name: "+req.session.firstName);	
		var ownKey="1549dd863cf5dccdb6a7593a854d8077";
		var lat=req.param("lat");
		var lon=req.param("lon");
		weather.setCoordinate(lat, lon);
		weather.setUnits('metric');
		weather.setAPPID(ownKey);
		weather.getTemperature(function(err, temp){
	        console.log(temp);
	    });
	 
	    // get the Atm Pressure 
	    weather.getPressure(function(err, pres){
	        console.log(pres);
	    });
	 
	    // get the Humidity 
	    weather.getHumidity(function(err, hum){
	        console.log(hum);
	    });
	 
	    // get the Description of the weather condition 
	    weather.getDescription(function(err, desc){
	        console.log(desc);
	    });
	 
	    // get all the JSON file returned from server (rich of info) 
	    
		weather.getAllWeather(function(err, JSONObj){
	    
			console.log(JSONObj);
			
		});
	
		weather.getSmartJSON(function(smart){
	        
			console.log(smart);
			res.render('weatherSensor',{"firstName": req.session.firstName, "details":smart});
		});
	}
	else{
		res.render('customerLogin', {"status":1});
	}
};*/

//Elephant

exports.getElephantInfo = function(req, res){
	if (req.session.email) {
		res.header(
						'Cache-Control',
						'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
		var ownKey="1549dd863cf5dccdb6a7593a854d8077";
		
		
		var getElephantDataQuery="SELECT * FROM GPX.GPX;"
		
		mysql.fetchData(
				function(err, results) {
					if (err) {
						console.log("errorrrrrrrr"+err);
						throw err;
					} else {
						console.log("elephant results: "+JSON.stringify(results[0]));
						
						res.render('elephant',{"firstName": req.session.firstName, "results": results});
					}
					
				}, getElephantDataQuery);
		
		
		
	
		/*weather.getTemperature(function(err, temp){
	        console.log(temp);
	    });
	 
	    // get the Atm Pressure 
	    weather.getPressure(function(err, pres){
	        console.log(pres);
	    });
	 
	    // get the Humidity 
	    weather.getHumidity(function(err, hum){
	        console.log(hum);
	    });
	 
	    // get the Description of the weather condition 
	    weather.getDescription(function(err, desc){
	        console.log(desc);
	    });
	    
	    // get all the JSON file returned from server (rich of info) 
	    weather.getAllWeather(function(err, JSONObj){
	        console.log(JSONObj);
	    });*/
	
	}
	else{
		res.render('customerLogin', {"status":1});
	}
};

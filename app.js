
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');
var point= require('./routes/backend');
var app = express();
var session=require('client-sessions');
var registerPointer=require('./routes/customerSignup');
var loginPointer=require('./routes/customerLogin');
var subscriptionPointer=require('./routes/subscription');
var cusHomePointer=require('./routes/customerHomepage');
var sensorInfoPointer=require('./routes/sensorInfo');
var pointBill=require('./routes/billing');
var requestSensorPointer=require('./routes/requestSensor');

// all environments
app.use(session({   
	  
	cookieName: 'session',    
	secret: 'mscloud_secret_key',    
	duration: 30 * 60 * 1000,    //setting the time for active session
	activeDuration: 5 * 60 * 1000,  })); // setting time for the session to be active when the window is open // 5 minutes set currently

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/billing', pointBill.getBillPage);

app.get('/liveSensor', point.getliveSensorPage);
app.get('/mySensors', point.getMySensorsPage);

//CUSTOMER HOMEPAGE
app.get('/customerHomepage', cusHomePointer.getCustomerHomepage);

//SUBSCRIPTION 
app.get('/subscription', subscriptionPointer.getSubscriptionPage);
app.get('/unSubscribeMe',subscriptionPointer.unSubscribeMe);
app.get('/subscribeMe',subscriptionPointer.subscribeMe);

//LOGIN AND SIGNUP
app.get('/userRegister', registerPointer.signup);
app.get('/userLogin', loginPointer.getLogin);
app.post('/postSignUpDetails', registerPointer.signed);
app.post('/customerCheckLogin',loginPointer.checkLogin);


///requesting Sensor
app.get('/getRequestSensor', requestSensorPointer.getRequestSensorPage);
app.get('/requestSensor', requestSensorPointer.requestSensor);


//Induvidual sensor 
app.get('/senorInfo', sensorInfoPointer.getMysensorInfo);
//Sensor Page
app.get('/weatherSensor', sensorInfoPointer.getWeatherInfo);

app.get('/elephantSensor', sensorInfoPointer.getElephantInfo);
//app.get('/weatherForm', sensorInfoPointer.setWeatherDetails);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

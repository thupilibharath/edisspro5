
//Packages-Needed
var express = require('express');
var session = require('express-session');
//var redis = require('redis');
var mybodyParser = require('body-parser');
var url = require('url');
var http = require('http');
var path = require('path');
var mongojs = require('mongojs');
var MongoStore = require('connect-mongo')(session);
//var mongodb = require('mongodb');
var mongoURL = 'mongodb://localhost:27017/Project5';

//Connect to mongo and save connection
db = mongojs(mongoURL, [], {authMechanism: 'ScramSHA1'});

//ROUTES
var routes = require('./routes');
var users = require('./routes/users');
var loginsuccess = require('./routes/login');
var updatedetails = require('./routes/updatedetails');
var register = require('./routes/register');
var updateitems = require('./routes/updateitems');
var search = require('./routes/search');
var logout = require('./routes/logout');
var purchase = require('./routes/purchase');
var orders = require('./routes/orders');
var app = express();

// Set app's environments
app.set('port', process.env.PORT || 7001);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(mybodyParser.urlencoded({ extended: true }));
app.use(mybodyParser.json());
//Session Settings
app.use(session({key: 'express.sid' // use unique ids for session IDs
,secret: 'xyz123abC',
    store: new MongoStore({
        db: 'express',
        host: 'oceanic.mongohq.com',
        port: 10065,
        username: 'cm',
        password: 'cm',
        collection: 'session',
        autoReconnect:true
    }),
    resave: true, saveUninitialized: true,
    cookie:{expires:new Date(new Date().getMinutes()+240), maxAge:900000}
}));


//Route Mappings
app.get('/', routes.index);
app.post('/registerUser', register.register);
app.post('/login', loginsuccess.loginsuccess);
app.post('/updateInfo', updatedetails.updatedetails);
app.get('/getProducts', search.search);
app.post('/modifyProduct', updateitems.updateitems);
app.get('/viewUsers', users.list);
app.get('/logout', logout.logoutuser);
app.post('/logout', logout.logoutuser);
app.post('/buyProduct',purchase.buy);
app.post('/getOrders', orders.getOrders);

//Start Server
var serve = http.createServer(app);
serve.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});

var express = require('express');
var app = express();
var myApp = require('./myApp.js')
var router = express.Router();


if (!process.env.DISABLE_XORIGIN) {
    app.use(function(req, res, next) {
        var allowedOrigins = ['https://narrow-plane.gomix.me', 'https://www.freecodecamp.com'];
        var origin = req.headers.origin || '*';
        if(!process.env.XORIG_RESTRICT || allowedOrigins.indexOf(origin) > -1){
            console.log(origin);
            res.setHeader('Access-Control-Allow-Origin', origin);
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        }
        next();
    });
}

var port = process.env.PORT || 3000;
app.use(myApp);
app.listen(port, function(){
    console.log('Node is listening on port '+ port + '...')
});
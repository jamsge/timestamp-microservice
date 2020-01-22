var express = require("express");
var app = express();
var bodyParser = require("body-parser");


app.get("/", function(req, res){
    res.sendFile(__dirname + "/views/index.html")
})

app.get("/api/timestamp", function(req, res){
    var date = new Date();
    res.json({utc: date.toUTCString(), unix: (date/1)})
})

app.get("/api/timestamp/:date_string?", function(req, res){
    var dateString = req.params.date_string
    var epoch, date= new Date(0);
    console.log(dateString)
    if (!isNaN(dateString)){
        epoch = parseInt(dateString);
        date.setUTCSeconds(Math.floor(epoch)/1000)
        res.json({unix: epoch, utc: date.toUTCString()})
    } else if (dateString.length === 10){
        epoch = Date.parse(dateString)
        if (epoch){
            date.setUTCSeconds(Math.floor(epoch)/1000)
            res.json({unix: epoch, utc: date.toUTCString()})
        } else {
            res.json({"error" : "Invalid Date" })
        }
    } else {
      res.json({"error" : "Invalid Date" })
    }
})

module.exports = app;
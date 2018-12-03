var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var expressValidator = require('express-validator');
var bodyParser = require('body-parser');
var request = require('request');

router.use(bodyParser.json());
router.use(expressValidator());
var urlencodedParser = bodyParser.urlencoded({extended: false});

function getScheduleOnDate(month, day, year, res){
    var dateString = (day < 10) ? "0"+day : ""+day;
    var monthString = (month < 10) ? "0"+month : ""+month;

    var url = "http://api.sportradar.us/nhl/simulation/v5/en/games/"+year+"/"+monthString+"/"+dateString+"/schedule.json?api_key=q7kufkcmdvqsqjrd8pr4gf8e"

    request(url, function (error, response, body) {
        console.log(JSON.parse(response.body)["games"][0]["home"]["name"])
        res.render("schedule", {data: JSON.parse(response.body)["games"]})
    });
}

router.get('/', function(req, res, next) {
    res.render("schedule", {data: undefined})
  });
router.post("/",function(req,res,next){
    getScheduleOnDate(req.body.Month, req.body.Day, req.body.Year, res);
})


  module.exports = router;




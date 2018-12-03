var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var expressValidator = require('express-validator');
var bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(expressValidator());
var urlencodedParser = bodyParser.urlencoded({extended: false});

function getPlayers(res, data){
	var conn = mysql.createConnection({
		host: "us-cdbr-iron-east-01.cleardb.net",
		user: "b41bfe55ebea40",
		password: "9ec792ff",
		database: "heroku_4ecfaa15a2f8e91",
		port: 3306,
		ssl: true
	});

	conn.connect(
		function (err){
			if (err){
				console.log(err);
				return;
			}else{
				conn.query("SELECT * FROM player;", function(err, results, fields){
					if (err) throw err;
					else{
						var resArr = [];
						for (var i = 0; i < results.length; i++){
							resArr.push({
								id : results[i]["id"],
								firstName : results[i]["firstName"],
								lastName : results[i]["lastName"],
								age : results[i]["age"]
							});
						}
						data["content"] = resArr;
						console.log(data["content"])
					}
				});

				conn.end(function(err){
					if (err) throw err;
					else console.log("done");
					res.render("players", data);
				});
			}
		}
	)

}

function createPlayer(firstName, lastName, age, res, data){
	var conn = mysql.createConnection({
		host: "us-cdbr-iron-east-01.cleardb.net",
		user: "b41bfe55ebea40",
		password: "9ec792ff",
		database: "heroku_4ecfaa15a2f8e91",
		port: 3306,
		ssl: true
	});

	conn.connect(
		function (err){
			if (err){
				console.log(err);
				return;
			}else{
				conn.query("INSERT INTO player (firstName, lastName, age) VALUES (?, ?, ?);", [firstName, lastName,age], function(err, results, fields){
					if (err) throw err;
					else{
						
					}
				});

				conn.end(function(err){
					if (err) throw err;
					else console.log("done");
					getPlayers(res, {})
				});
			}
		}
	)
}

function updatePlayers(firstName, lastName, age, id, res, data){
	var conn = mysql.createConnection({
		host: "us-cdbr-iron-east-01.cleardb.net",
		user: "b41bfe55ebea40",
		password: "9ec792ff",
		database: "heroku_4ecfaa15a2f8e91",
		port: 3306,
		ssl: true
	});

	conn.connect(
		function (err){
			if (err){
				console.log(err);
				return;
			}else{
				conn.query('UPDATE player set firstName ="'+firstName+'", lastName = "'+lastName+'", age = '+age+' where id = '+id+';', function(err, results, fields){
					if (err) throw err;
					else{
						console.log("success");
					}
				});

				conn.end(function(err){
					if (err) throw err;
					else console.log("done");
					getPlayers(res, {})
				});
			}
		}
	)
}

function deletePlayers(id, res, data){
	var conn = mysql.createConnection({
		host: "us-cdbr-iron-east-01.cleardb.net",
		user: "b41bfe55ebea40",
		password: "9ec792ff",
		database: "heroku_4ecfaa15a2f8e91",
		port: 3306,
		ssl: true
	});

	conn.connect(
		function (err){
			if (err){
				console.log(err);
				return;
			}else{
				conn.query('DELETE from player where id = '+id, function(err, results, fields){
					if (err) throw err;
					else{
						console.log("success");
					}
				});

				conn.end(function(err){
					if (err) throw err;
					else console.log("done");
					getPlayers(res, {})
				});
			}
		}
	)
}



/* GET users listing. */
router.get('/', function(req, res, next) {
  getPlayers(res, {});
});

router.get('/update/:id', function(req, res, next) {
	console.log(req.params["id"])
	res.render('update');
  });

  router.post('/update/:id', function(req, res, next) {
	console.log(req.params["id"])
	updatePlayers(req.body.firstName, req.body.lastName, req.body.age, req.params["id"], res, {});
  });


router.post('/', urlencodedParser, function(req, res,next){
	console.log(req.body.firstName);
	createPlayer(req.body.firstName, req.body.lastName, req.body.age, res, {});
})

router.post('/delete/:id', function(req, res, next){
	console.log(req.params["id"])
	deletePlayers(req.params["id"], res, {});
})



module.exports = router;
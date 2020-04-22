var express = require('express'); //Ensure our express framework has been added
var app = express();
var bodyParser = require('body-parser'); //Ensure our body-parser tool has been added
var session = require('express-session'); // session variable
var path = require('path');
var bcrypt = require('bcrypt');
const saltRounds = 5;
//var validator = require('express-validator');
app.use(bodyParser.json());              // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(session({
	saveUninitialized: false,
	secret: 'secret',
	resave: false
}));
//app.use(validator());


// view engine
app.set('view engine', 'ejs');

var pgp = require('pg-promise')();

const dbConfig = {
	host: 'localhost',
	port: 5432,
	database: 'gamedb',
	user: 'postgres',
	password: 'az'
};

//const dbConfig = process.env.DATABASE_URL;

var db = pgp(dbConfig);

app.use(express.static(__dirname + '/'));


app.get('/', function(req,res){
	if(req.session.name===undefined){
		res.redirect('/login');
	}
	if(req.session.name!== undefined){
		res.redirect('/home');
	}
})

app.get('/home', function(req,res){
	if(req.session.name===undefined){
		res.redirect('/login');
	}
	else if(req.session.name!==undefined){
		res.render('pages/index', {
			title: "Home of CU-Sprint"
		});
	}
});


app.get('/leaderboards', function(req, res){
	if(req.session.name===undefined){
		res.redirect('/login');
	}
	else if(req.session.name!==undefined){
		res.render('pages/leaderboards', {
	    title: "Leaderboards"
	  });
	}

});

app.get('/game', function(req, res){
	if(req.session.name===undefined){
		res.redirect('/login');
	}
	else if(req.session.name!==undefined){
		res.render('pages/game', {
	    title: "CU Sprint Lives Here!",
	    local_css: "game.css"
	  });
	}
});

// ........blog?session_key="sessionkey u sent when logged in"
app.get('/blog', function(req,res){
	if(req.session.name===undefined){
		res.redirect('/login');
	}
//make a db query toc echk if the session is there
	else if(req.session.name!==undefined){
	  res.render('pages/blog', {
	    title: "Blog"
	  });
	}
});

app.get('/register', function(req, res){
  res.render('pages/registration', {
    title: "Registration",
    local_css: "register.css"
  });
});

app.post('/submit', function(req,res){
  var firstname = req.body.fname;
  var lastname = req.body.lname;
  var username = req.body.username;
  var pwd = req.body.pwd;
	var pwd2 = req.body.cpwd;
	if(pwd !== pwd2){
		console.log("Passwords don't match");
		res.redirect('/register');
	}
	else{
		db.none('SELECT * FROM users WHERE username = $[usr]', {
			usr: username
		})
			.then(result => {
				console.log(result);
				bcrypt.hash(pwd, saltRounds, function(err, hash){
					console.log(hash);
					db.none('INSERT INTO users(username, firstname, lastname, password) VALUES (${username}, ${firstname}, ${lastname}, ${pwd})',{
						username: username,
						firstname: firstname,
						lastname: lastname,
						pwd: hash
					})
				  	.then(function(result) {
							console.log('Profile added to DB');
							res.redirect('/login');
						})
						.catch(function(error){
							console.log('error:', error);
							res.redirect('back');
						})
				})
			})
			.catch(error =>{
				console.log(username + " already exists");
				res.redirect('back');
			})
	}
});

app.get('/login', function(req,res){
  //var user =
  //var sessionKey = randomNum;
  res.render('pages/login', {
    title: "Login",
    local_css: "login.css"
  });
});

app.post('/auth', function(req, res) {
	var username = req.body.username;
	if(username && req.body.password){
		db.any('SELECT * FROM users WHERE username = $[usr]', {
			usr: username
		})
			.then(result => {
				console.log(result);
				console.log(req.session.name);
				bcrypt.compare(req.body.password, result[0].password, function(err, success){
					if(success){ //
						console.log('JSON: ', result[0].password, 'Password: ', success);
						req.session.name = username;
						res.redirect('/home');
					}
					if(!success){ // if the password is incorrect
						console.log('Wrong password');
						res.redirect('back');
					}
					if(err){
						console.log("something went wrong comparing passwords", err);
						res.redirect('back');
					}
				});
			})
			.catch(error => {
				console.log("This is where a non-existant user errror is sent");
				console.log('error', error);
				res.redirect('back');
			})


	}
	else {
		res.send('Please enter a username and password');
		res.end();
		console.log("hi");
	}
	//res.redirect('/');
});




// app.post('/login', function(req, res) {
// //logic to cvalidate username
// var userne;
// console.log(request.body.username);
// console.log(request.body.password);
//
// //db quey to check if they are cvalidate
//
// //sucess
// var sessionkey = "randomly generated string";
// //stre sesssion key against the user in the table
// //redirect orrender the user /home?sessionkey=sessionke
//
//
//
// });


app.listen(3000);
// app.listen(process.env.PORT);
console.log('3000 is the magic port');

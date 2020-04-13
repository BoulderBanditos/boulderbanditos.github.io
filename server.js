var express = require('express'); //Ensure our express framework has been added
var app = express();
var bodyParser = require('body-parser'); //Ensure our body-parser tool has been added
app.use(bodyParser.json());              // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// var pgp = require('pg-promise')();

// const dbConfig = {
// 	host: 'localhost',
// 	port: 5432,
// 	database: 'football_db',
// 	user: 'postgres',
// 	password: 'pwd'
// };

// const dbConfig = process.env.DATABASE_URL;
//
// var db = pgp(dbConfig);

// view engine
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/'));

app.get('/', function(req,res){
  res.render('pages/index', {
    title: "Home of CU-Sprint"
  });
});


app.get('/leaderboards', function(req, res){
  res.render('pages/leaderboards', {
    title: "Leaderboards"
  });
});

app.get('/game', function(req, res){
  res.render('pages/game', {
    title: "CU Sprint Lives Here!",
    local_css: "game.css"
  });
});

app.get('/blog', function(req,res){
  res.render('pages/blog', {
    title: "Blog"
  });
});

app.get('/login', function(req,res){
  //var user =
  res.render('pages/login', {
    title: "Login",
    local_css: "login.css"
  });
});



app.listen(3000);
// app.listen(process.env.PORT);
console.log('3000 is the magic port');

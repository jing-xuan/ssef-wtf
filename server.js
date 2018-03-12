var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var app = express();

var con = mysql.createConnection({
  host: "localhost",
  user: "ssefwtf-admin",
  database: "ssefwtf",
  password: "burdenbear"
});

con.connect(function(err){
  if(err) throw err;
  console.log("connected");
})

app.get('/', function(req, res){
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/write', function(req, res){
  res.sendFile(__dirname + '/views/form.html');
});

app.get('/posts', function(req, res){
  var sql = "SELECT * FROM posts"
  con.query(sql, function(err, result){
    if(err) throw err;
    res.render('posts.ejs', {data: result});
  })
})

app.post('/submit', bodyParser.urlencoded({extended: true}), function(req, res){
  var sql = "INSERT INTO posts (title, content) VALUES ?";
  str = req.body.post.replace(/(?:\r\n|\r|\n)/g, '<br/>');
  var values = [
    [String(req.body.title),
    String(str)]
  ];
  con.query(sql, [values], function(err, result){
    if(err) throw err;
    console.log("inserted");
    res.redirect('/posts');
  })
})

app.listen(8080)
console.log("app listening at port 8080");

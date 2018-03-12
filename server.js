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

function htmlEscape(str) {
    return str
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/(?:\r\n|\r|\n)/g, '<br/>');
}

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
  var s = htmlEscape(req.body.post);
  var values = [
    [String(req.body.title),
    String(s)]
  ];
  con.query(sql, [values], function(err, result){
    if(err) throw err;
    console.log("inserted");
    res.redirect('/posts');
  })
})

app.listen(8080)
console.log("app listening at port 8080");

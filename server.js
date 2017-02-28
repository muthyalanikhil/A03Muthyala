var express = require('express');
var app = express();

var path = require("path");
var logger = require("morgan");
var bodyParser = require("body-parser");
var http = require('http').Server(app); 

app.use(express.static(__dirname + '/assets'));

app.set("views", path.resolve(__dirname, "views"));
app.set("assets", path.resolve(__dirname, "assets"));
app.set("view engine", "ejs");

var entries = [];
app.locals.entries = entries;

app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));

/////////////////////////////////////////////////////////////////////////////
app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/assets/home.html'));
});

app.get('/contact',function(req,res){
  res.sendFile(path.join(__dirname+'/assets/contact.html'));
});

app.get('/myWorks',function(req,res){
  res.sendFile(path.join(__dirname+'/assets/myWorks.html'));
});

app.get("/index", function (request, response) {
  response.render("index");
});

app.get("/new-entry", function (request, response) {
  response.render("new-entry");
});
//////////////////////////////////////////////////////////////////////////////
app.post("/new-entry", function (request, response) {
  if (!request.body.title || !request.body.body) {
    response.status(400).send("Entries must have a title and a body.");
    return;
  }
  entries.push({ 
    title: request.body.title,
    content: request.body.body,
    published: new Date()
  });
  response.redirect("/index"); 
});
app.post("/contact", function (request, response) {
var api_key = 'key-638540938604d9c1045f5cb5229ed36e';
var domain = 'sandboxaf916e19326342628f609667593b8db0.mailgun.org';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
 
var data = {
  from: 'Nik <postmaster@sandboxaf916e19326342628f609667593b8db0.mailgun.org>',
  to: request.body.email,
  subject: request.body.subject,
  text: request.body.body
};
 
mailgun.messages().send(data, function (error, body) {
  console.log(body);
  if(!error)
  response.send("Mail sent..!!");
  else
  response.send("Mail not sent..!!");
});
});
//////////////////////////////////////////////////////////////////////////////

// if we get a 404 status, render our 404.ejs view
app.use(function (request, response) {
  response.status(404).render("404");
});


// Listen for an application request on port 8081
// use http listen, so we can provide a callback when listening begins
// use the callback to tell the user where to point their browser
app.listen(8081, function () {
  console.log('listening on http://127.0.0.1:8081/');
});

var express = require('express');
app = express();
require('dotenv').config();

serverPort = process.env.PORT || 8080;

var toDoRoutes = require('./routes/index');
var userRoutes = require('./routes/userRoutes');
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

//serving static content
app.use(express.static(__dirname + '/public/'));


//routes for all the api calls
app.use('/api/todo', toDoRoutes);
app.use('/api/users', userRoutes);

//standalong application for server
app.get('/', function(req, res){
    res.sendFile(__dirname + '/public/index.html')
});


app.listen(serverPort, function(){
    console.log("API Server Started at "+ serverPort);
});

//bring in the express package
var express = require("express"); 
var app = express();

app.get("/", function(req, res){
    res.send("Hello uncle Nick! Index route is working! :)");
}); //this is the homepage


//set the port to listen on
var port = process.env.PORT || 8080;
app.listen(port);
console.log("Express started, listening on port %s.", port);
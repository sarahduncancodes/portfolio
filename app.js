
//bring in the express package
var express = require("express"); 
var app = express();

//add express handlebars
var exphbs = require("express-handlebars");

//add path
var path = require("path");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", ".hbs");
app.engine(".hbs", exphbs.engine({
    extname: ".hbs",
    defaultLayout: false
}));



//this is the homepage
app.get("/", function(req, res){
    res.render("home.hbs");
}); 


//set the port to listen on
var port = process.env.PORT || 8080;
app.listen(port);
console.log("Express started, listening on port %s.", port);
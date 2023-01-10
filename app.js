//add the express package
var express = require("express"); 
var app = express();
var projects = require("./projects.json");

//add express handlebars - for html
var exphbs = require("express-handlebars");

//add path
var path = require("path");

//add bodyParser - to parse json
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

console.log(projects["1"]);

//add node-mailer
var nodeMailer = require("nodemailer");

//add dotenv
require("dotenv").config();

app.use(express.static(path.join(__dirname, "/public")));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", ".hbs");
app.engine(".hbs", exphbs.engine({
    extname: ".hbs",
    defaultLayout: false
}));


//this is the homepage
app.get("/", function(req, res){
    res.render("home");
}); 

//this is the contact page
app.get("/contact", function(req, res){
    res.render("contact", {submitted:"no"});
});

//step 1- transporter
let transporter = nodeMailer.createTransport({
    service:"gmail",
    auth:{
        user: process.env.email,
        pass: process.env.password
    }
});

//contact form post
app.post("/contact", function(req, res){
    var name = req.body.fullname;
    var email = req.body.email;
    var note = req.body.note;
    var subject = req.body.subject;
    //step 2
    let mailOptions = {
        from: "sarahduncancodes@gmail.com",
        to: "sarahduncancodes@gmail.com",
        subject: subject,
        text: "req.body.note",
        html: "<b>Full Name </b>" + name + "<br><b>Email </b>" + email + "<br><b>Message </b>" + note
    };
    //step 3
    transporter.sendMail(mailOptions, function(err, data){
        if(err){
            console.log("Error sending email")
        } else {
            console.log("Email sent!");
            res.render("contact", {submitted:"yes"});
        }
    });
});

//work page
app.get("/work", function(req, res){
    res.render("work", {projects:projects});
})

//set the port to listen on
var port = process.env.PORT || 8080;
app.listen(port);
console.log("Express started, listening on port %s.", port);
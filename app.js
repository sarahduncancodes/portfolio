//add the express package
var express = require("express");
var app = express();

//add the projects file
var projects = require("./projects.json");

//add express handlebars - for html
var exphbs = require("express-handlebars");

//add path
var path = require("path");

//add bodyParser - to parse json
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

//add nodemailer
var nodeMailer = require("nodemailer");
const { pid } = require("process");
const helpers = require("./helpers");

//add dotenv
require("dotenv").config();

app.use(express.static(path.join(__dirname, "/public")));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", ".hbs");
app.engine(".hbs", exphbs.engine({
    extname: ".hbs",
    defaultLayout: false,
    helpers: require("./helpers")
}));


//routes
app.get("/", function (req, res) {
    res.render("home");
});

app.get("/contact", function (req, res) {
    res.render("contact", { submitted: "no" });
});

app.get("/work", function (req, res) {
    res.render("work", { projects: projects });
})

app.get("/about", function (req, res) {
    res.render("about");
})

app.get("/project/:pid", function (req, res, next) {
    var pid = req.params.pid;
    var thisProject = projects[pid.toString()];
    res.render("project", { project: thisProject });
}); 

let transporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.email_email,
        pass: process.env.email_pass
    }
});

app.post("/contact", function (req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var message = req.body.message;
    var subject = req.body.subject;

    let mailOptions = {
        from: "sarahduncancodes@gmail.com",
        to: "sarahduncancodes@gmail.com",
        subject: subject,
        text: "req.body.note",
        html: "<b>Full Name </b>" + name + "<br><b>Email </b>" + email + "<br><b>Message </b>" + message
    };

    transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
            console.log(err);
            console.log("Error sending email.")
        } else {
            console.log("Email successfully sent.");
            
            res.render("contact", { submitted: "yes" });
        }
    });
});

//set the port to listen on
var port = process.env.PORT || 8080;
app.listen(port);
console.log("Express started, listening on port %s.", port);
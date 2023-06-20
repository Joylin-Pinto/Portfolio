const express = require("express")
const app=express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect("mongodb+srv://pintojoylin3:Sir7mPGIVcwtWiAX@cluster0.rk3y3ws.mongodb.net/?retryWrites=true&w=majority")

//create a data schema
const PortfolioSchema = new mongoose.Schema({
    Name: String,
    Email: String,
    Project: String,
    Message: String
});

const Portfolio = mongoose.model("PortMesg", PortfolioSchema);

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
  });

app.get("/css/style.css", function(req, res) {
    res.set("Content-Type", "text/css");
    res.sendFile(__dirname + "/css/style.css");
  });
  app.get("/js/script.js", function(req, res) {
    res.sendFile(__dirname + "/js/script.js");
  });
  app.get("/img/:filename", function(req, res) {
    var filename = req.params.filename;
    res.sendFile(__dirname + "/img/" + filename);
  });

  app.post("/", function( req, res){
    let newPortfolio = new Portfolio({
        Name: req.body.Name,
        Email: req.body.Email,
        Project:req.body.Project,
        Message: req.body.Message,
    });
    newPortfolio.save();
    res.redirect("/")
    })

app.listen(3000, function(){
    console.log("Server is running on 3000")
})
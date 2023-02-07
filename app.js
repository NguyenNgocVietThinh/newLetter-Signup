const express = require("express"); // framre work nodejs
const bodyParser = require("body-parser"); // su dung de parse cac bien duoc chuyen tu body, req.body
const https = require("https"); // phuong thuc http

const app = express(); // mot instance cua express

app.use(express.static(__dirname + '/public')); // Moi request deu tra ve cac tep tinh trong folder public
app.use(bodyParser.urlencoded({extended: true})); // Moi request deu su dung bodyParser, voi extended: true, bodyParser se su dung qs library de xu ly dinh dang du lieu duoc gui len - voi qs > querystring la xu duoc cac object long

app.get("/", function(req, res){

  res.sendFile(__dirname + "/signup.html");

});

app.post("/", function(req, res){

  var list_id = "dbfb4f17e3";
  var url = "https://us10.api.mailchimp.com/3.0/lists/"+ list_id +"/members";

  var user = "key:e374fa5656a648115009993d8f4a14ca-us10";
  var header = "content-type: application/json";

  var data = {
  "email_address": req.body.emailAddress,
  "status": "subscribed",
  "merge_fields": {
  	"FNAME": req.body.firstName,
  	"LNAME": req.body.lastName
    }
  }

  var jsonData = JSON.stringify(data);

  var option = {
    method: "POST",
    auth: user //"key:e374fa5656a648115009993d8f4a14ca-us10"
  }

  const request = https.request(url, option, function(respone){
    respone.on("data", function(data){
      console.log(JSON.parse(data));
      if(respone.statusCode === 200){
        res.sendFile(__dirname + "/success.html")
      } else {
        res.sendFile(__dirname + "/failure.html")
      };
    })
  })

  //request.write(jsonData); // write a response to the client
  request.end(); // ket thuc request

});

app.post("/failure", function(req, res){
  res.redirect("/"); // thuc hiem app.get("/",function(rea,res){})
})

app.listen(process.env.PORT || 3000, function(){ // su dung heroku thi su dung tham so PORT la process.env.PORT
  console.log("Server is running on port 3000.");
});


// API Key: e374fa5656a648115009993d8f4a14ca-us10
// Audience List ID: dbfb4f17e3

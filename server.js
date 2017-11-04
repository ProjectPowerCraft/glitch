// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

app.param("timestamp",(req,res,next,timestamp)=>{
  let date,
      months = {0: "January",1:"February",2:"March",3:"April",4:"May",5:"June",6:"July",7:"August",8:"September",9:"October",10:"November",11:"December"},
      unix = null,
      natural = null
  if(Number.parseInt(timestamp)){
    date = new Date(timestamp * 1000);
  }else if(new Date(timestamp)){
    date = new Date(timestamp);
  }
  
  if(!Number.isNaN(date.getTime())){
    unix = date.getTime() / 1000;
    natural = `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  }
  req.timestamp = {unix: unix,
                  natural: natural};
  next();
          })

app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

// http://expressjs.com/en/starter/basic-routing.html
app.get("/:timestamp", function (request, response) {
  response.end(JSON.stringify(request.timestamp));
  //response.sendFile(__dirname + '/views/index.html');
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

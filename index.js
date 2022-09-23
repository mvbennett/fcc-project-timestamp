// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get('/api', (req, res) => {
  res.json({"unix": new Date().valueOf(), utc: new Date().toGMTString()});
});

app.get('/api/:date', (req, res) => {
  if(new Date(req.params.date).toGMTString() === 'Invalid Date') {
    if(parseInt(req.params.date)) {
      res.json({"unix": new Date(parseInt(req.params.date)).valueOf(), utc: new Date(parseInt(req.params.date)).toGMTString()})
    } else {
      res.json({error: "Invalid Date"})
    }
  } else {
    res.json({"unix": new Date(req.params.date).valueOf(), utc: new Date(req.params.date).toGMTString()});
  }
});
// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

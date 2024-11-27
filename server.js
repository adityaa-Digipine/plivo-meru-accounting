var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser')
// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.set('views', path.join(__dirname, '/webApp-plivo/views'));

// set the view engine to ejs
app.set('view engine', 'ejs');

// make express look in the public directory for assets (css/js/img)
console.log(__dirname);
app.use(express.static(__dirname + '/webApp-plivo/public'));

// set the home page route
app.get('/', function(req, res) {
  // ejs render automatically looks in the views folder
  res.render('index');
});

app.post('/makeCall', function(req, res) {
  // ejs render automatically looks in the views folder
  const response = req.body['X-PH-callerId'] ?  `<?xml version="1.0" encoding="UTF-8"?>
      <Response>
        <Dial  callerId="${req.body['X-PH-callerId']}">
            <Number>${req.body.To}</Number>
        </Dial>
    </Response>` : `<?xml version="1.0" encoding="UTF-8"?>
      <Response>
        <Dial>
            <Number>${req.body.To}</Number>
        </Dial>
    </Response>`
  res.send(response)
});

app.listen(port, function() {
  console.log('Our app is running on http://localhost:' + port);
});
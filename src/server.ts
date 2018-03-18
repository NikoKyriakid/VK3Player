
const express = require('express')
const app = express()
const path = require('path')

app.use('/', express.static(path.join(__dirname, '/')))

app.get('/', function (req, res) {
  res.sendFile(__dirname + "/index.html")
});

const port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080;
const ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';
 
app.listen(port, ip, function () {
    console.log( "Live on " + ip + ", port " + port );
});
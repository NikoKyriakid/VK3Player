import * as express from 'express';
import * as path from 'path';

const app = express();

app.use('/', express.static(path.resolve(__dirname, 'public/')));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/main.html');
});

const port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080;
const ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';
 
app.listen(port, ip, function () {
    console.log( "Live on " + ip + ", port " + port );
});
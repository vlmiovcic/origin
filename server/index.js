const fs = require("fs");
const https = require("https");
const express = require("express");
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require("cors");
const privKey = fs.readFileSync('sslcert/it-vladimirmiovcic.com.key','utf8');
const cert = fs.readFileSync('sslcert/it-vladimirmiovcic.com.crt', 'utf8');
const PORT = process.env.PORT || 4043;
const dbConnection = require('./db/home');


const options = {
  key: privKey,
  cert: cert
};


const app = express();
app.use(cors());

app.get('/api', (req, res) => {
  res.json('Hello dev.to!');
});

app.get('/upload', (req, res) => {
  res.json('Hello upload');
});

const httpsServer = https.createServer({
  key: options.key,
  cert: options.cert,
}, app);

httpsServer.listen(PORT, () => {
    console.log('HTTPS Server running on port ' + PORT);
    dbConnection.query("SELECT * FROM customers;", function (error, result, fields){
     console.log(result);
     console.log(fields);
     console.log(error);
    //result.release();
 });
});

const apiProxy = createProxyMiddleware('/', {
  target: 'https://webserver.it-vladimirmiovcic.com:4043',
  changeOrigin: true,
});

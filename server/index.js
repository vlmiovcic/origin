const fs = require("fs");
const https = require("https");
const express = require("express");
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require("cors");
const privKey = fs.readFileSync('sslcert/it-vladimirmiovcic.com.key','utf8');
const cert = fs.readFileSync('sslcert/it-vladimirmiovcic.com.crt', 'utf8');
const PORT = process.env.PORT || 4043;
const dbConnection = require('./db/home');
const dbConfig = require('./db/configdb.json');
const bodyParser = require('body-parser');


const options = {
  key: privKey,
  cert: cert
};


const app = express();
// app.use(cors({})); can be used to restrict access
app.use(bodyParser.json({limit:'6mb'}));
app.use(bodyParser.urlencoded({extended:true,limit:'6mb'}))
// set headers
app.use(function (request, response, next) {

    response.setHeader('Access-Control-Allow-Origin', dbConfig.server.localcall);
    //
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    //
    response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    //
    response.setHeader('Access-Control-Allow-Credentials', true);
    //
    next();
});

app.get('/api', (req, res) => {
    let requestParams = req.query;
    if(requestParams['products'] === 'all' ){
        dbConnection.query("SELECT * FROM products;", function (error, result, fields){
            res.json(result);
        });
    }
});

app.post('/save', (req, res) => {
    console.log('req.body.mail:',req.body);
    res.json({'message':'Hello save', 'request':req.query, 'req.body.mail':req.body});
})

app.get('/upload', (req, res) => {
  res.json('Hello upload');
});

const httpsServer = https.createServer({
  key: options.key,
  cert: options.cert,
}, app);

httpsServer.listen(PORT, () => {
    console.log('HTTPS Server running on port ' + PORT);
 //    dbConnection.query("SELECT * FROM customers;", function (error, result, fields){
 //     console.log(result);
 //     console.log(fields);
 //     console.log(error);
 //    //result.release();
 // });
});

const apiProxy = createProxyMiddleware('/', {
  target: 'https://serverhome.it-vladimirmiovcic.com:4043',
  changeOrigin: true,
});

const fs = require("fs");
const https = require("https");
const privKey = fs.readFileSync('sslcert/it-vladimirmiovcic.com.key', 'utf8');
const cert = fs.readFileSync('sslcert/it-vladimirmiovcic.com.crt', 'utf8');
const process = require('process');
const PORT = process.env.PORT || 4043;
const app = require("./routes/general.routes.js");


const options = {
    key: privKey,
    cert: cert
};

const httpsServer = https.createServer({
    key: options.key,
    cert: options.cert,
}, app);

httpsServer.listen(PORT, () => {
    console.log('HTTPS Server running on port ' + PORT);
});

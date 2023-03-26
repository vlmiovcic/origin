const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const dbConfig = require("../db/configdb.json");

app.use(bodyParser.json({limit: '6mb'}));
app.use(bodyParser.urlencoded({extended: true, limit: '6mb'}))
// set headers
app.use(function (request, response, next) {

    response.setHeader('Access-Control-Allow-Origin', dbConfig.server.localcall);
    //
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    //
    response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    //
    response.setHeader('Access-Control-Allow-Credentials', 1);
    //
    next();
});


const Inquiries = require("../controllers/inquiries.controllers");
const products = require("../controllers/products.controllers");

let router = express.Router();

router.post("/inquiries", Inquiries.create);

router.get("/inquiries", Inquiries.findAll);

router.get("/inquiries/:id", Inquiries.findOne);

router.put("/inquiries/:id", Inquiries.update);

router.delete("/inquiries/:id", Inquiries.deleteInquiries);
app.use(dbConfig.api.default, router);

router.post("/products", products.create);

router.get("/products", products.findAll);

router.get("/products/:id", products.findOne);

router.put("/products/:id", products.update);

router.delete("/products/:id", products.deleteProduct);

app.use(dbConfig.api.default, router);

module.exports = app;

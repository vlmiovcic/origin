const express = require('express');
const app = express();
const Inquiries = require("../controllers/inquiries.controllers");
const bodyParser = require("body-parser");
const dbConfig = require("../db/configdb.json");
let router = express.Router();

router.post("/", Inquiries.create);

router.get("/", Inquiries.findAll);

router.get("/:id", Inquiries.findOne);

router.put("/:id", Inquiries.update);

router.delete("/:id", Inquiries.delete);

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

app.use('/api/inquiries', router);

const InquiriesRoutes = {};
InquiriesRoutes.Inquiries = Inquiries;
InquiriesRoutes.router = router
InquiriesRoutes.app = app;

module.exports = InquiriesRoutes;

module.exports = app => {
    const Inquiries = require("../controllers/inquiries.controllers");

    let router = require("express").Router();

    router.post("/", Inquiries.create);

    router.get("/", Inquiries.findAll);

    router.get("/:id", Inquiries.findOne);

    router.put("/:id", Inquiries.update);

    router.delete("/:id", Inquiries.delete);

    app.use('/api/inquiries', router);
};

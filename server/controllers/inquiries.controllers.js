const db = require('../models');
const Inquiries = db.inquiries;

exports.create = (req, res) => {
    let requestData = req.body;
    console.log("exports.create = (req, res):", requestData);
    let inquiriesData = {
        'name': requestData.username,
        'message': requestData.usermessage,
        'mail': requestData.usermail,
        'subject': requestData.usersubject
    };
    console.log("exports.create = (req, res):inquiriesData:", inquiriesData);
    Inquiries.create(inquiriesData)
        .then(data => {
            console.log("Inquiries.create(inquiriesData):", data);
            res.send(data);
        })
        .catch(error => {
            res.status(500).send({
                message:
                    error.message + ' Inquiries coudn"t be saved.'
            })
        })
};

exports.findAll = (req, res) => {
    Inquiries.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(error => {
            res.status(500).send(
                {
                    message:
                    error.message + ' Inquiries coudn"t be queried.'
                }
            );
        });
};

exports.findOne = (req, res) => {
    Inquiries.findAll({
        where: req.params.mail ?? -1
    })
        .then(data => {
            res.send(data);
        })
        .catch(error => {
            res.status(500).send(
                {
                    message:
                        error.message + ' Inquirie coudn"t be queried.'
                }
            );
        });
};

exports.update = (req, res) => {
    let requestData = req.params.data;
    let inquiriesData = {
        'name': requestData.username,
        'message': requestData.usermessage,
        'subject': requestData.usersubject
    };
    Inquiries.update(inquiriesData, {
        where: {
            mail: requestData.usermail
        }
    })
        .then(data => {
            res.send(data);
        })
        .catch(error => {
            res.status(500).send({
                message:
                    error.message + ' Inquiries coudn"t be updated.'
            })
        })
};

exports.delete = (req, res) => {
    let data = req.params.data;
    Inquiries.destroy({where: {
            mail: (!data) ? -1 : data.usermail
        }
    })
        .then(data => {
            res.send(data);
        })
        .catch(error => {
            res.status(500).send({
                message:
                    error.message + ' Inquiries coudn"t be updated.'
            })
        })
};

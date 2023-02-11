const db = require('../models');
const Inquiries = db.inquiries;

exports.create = (req, res) => {
    let requestData = req.body;
    let inquiriesData = {
        'name': requestData.name,
        'message': requestData.message,
        'mail': requestData.mail,
        'subject': requestData.subject
    };
    Inquiries.create(inquiriesData)
        .then(data => {
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
        where: {
            mail: req.params.mail ?? -1
        }
    }).then(data => {
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
    Inquiries.destroy({
        where: {
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
const db = require('../models');
const products = db.products;

exports.create = (req, res) => {
    // TODO: should be implemented
    console.log('req: ', req);
    console.log('res: ', res);
};

exports.findAll = (req, res) => {
    products.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(error => {
            res.status(500).send(
                {
                    message:
                        error.message + ' Products coudn"t be queried.'
                }
            );
        });
};

exports.findOne = (req, res) => {
    products.findAll({
        where: req.params.name ?? -1
    })
    .then(data => {
        res.send(data);
    })
    .catch(error => {
        res.status(500).send(
            {
                message:
                    error.message + ' Products coudn"t be queried.'
            }
        );
    });
};

exports.update = (req, res) => {
    // TODO: should be implemented
    console.log('req: ', req);
    console.log('res: ', res);
};

exports.delete = (req, res) => {
    let data = req.params.data;
    products.destroy({
        where: {
            id: (!data) ? -1 : data.id
        }
    })
    .then(data => {
        res.send(data);
    })
    .catch(error => {
        res.status(500).send({
            message:
                error.message + ' Products coudn"t be deleted.'
        })
    })
};

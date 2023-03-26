const {Inquiries} = require('../models');

const create = async (req, res) => {
    try{
        let requestData = req.body;
        let inquiriesData = {
            'name': requestData.name,
            'message': requestData.message,
            'mail': requestData.mail,
            'subject': requestData.subject
        };
        const inquirie = await Inquiries.create(inquiriesData);
        return res.status(200).json({inquirie,});

    }catch(error){
        return res.status(500).json({error:error.message + + ' Inquiries coudn"t be saved.'});
    }
};

const findAll = async (req, res) => {
    try{
        const inquiriesColl = await Inquiries.findAll();
        return res.json(200).json({inquiriesColl,});
    }catch(error){
        return res.status(500).json({error:error.message + ' Inquiries coudn\'t be queried.'});
    }
};

const findOne = async (req, res) => {
    try{
        const mail = req.params.mail ?? -1;
        const inquirie = await Inquiries.findOne({mail:mail});
        return res.status(200).json({inquirie});
    }catch(error){
        return res.status(500).json({error:error.message + ' Dataset of Inquiries couldn\'t be queried.'});
    }
};

const update = async (req, res) => {
    try{
        let requestData = req.params.data;
        let inquiriesData = {
            'name': requestData.username,
            'message': requestData.usermessage,
            'subject': requestData.usersubject,
            'mail': requestData.mail,
        };
        const isUpdated = await Inquiries.update(inquiriesData, {
            where: {mail:requestData.mail,}
        });
        const updateMessage = 'Inquirie couldn\'t be updated.';
        if(isUpdated){
            updateMessage = 'Inquirie is updated.';
        }
        return res.status(200).json({'message':updateMessage});
    }catch(error){
        return res.status(500).json({error:error.message});
    }
};

const deleteInquiries = async (req, res) => {
    try{
        let data = req.params.data
        const mail = (!data) ? -1 : data.usermail;
        const isDeleted = await Inquiries.destroy({where: {mail:mail}});
        const deletedMessage = 'Inquire coludn\'t be deleted. The reference mail is: ' + mail;
        if(isDeleted){
            deletedMessage = 'Inquire is deleted. The reference mail is: ' + mail;
        }
        return res.status(200).json({message:deletedMessage});
    }catch(error){
        return res.status(500).json({error:error.message});
    }
};

module.exports = {
    deleteInquiries, 
    update,
    findOne,
    findAll,
    create
};
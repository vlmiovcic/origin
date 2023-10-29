const { registration } = require("../models");

const create = async (req, res) => {
  try {
    const registration = await registration.create(req.body);
    return res.status(200).json({
        registration,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({error: error.message});
  }
  // TODO: should be implemented
};

const findAll = async (req, res) => {
    try{
        const registrationColl = await registration.findAll();
        return res.status(200).json({registrationColl});
    }catch(error){
        return res.status(500).json({error:error.message});
    }
};

const findOne = async (req, res) => {
  try {
    const registrationItem = await registration.findAll({
      where: req.params.name ? req.params.name : -1,
    });
    return res.status(200).json({ registrationItem });
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message + ' Registration could\'nt be queried.' });
  }
};

const update = async (req, res) => {
    try{
        const {id} = req.params.id;
        const {updated} = await registration.update(req.body, {
            where: {id: id}
        });
        let updateMessage = 'Registration couldn\'t be updated.';
        if(updated){
            updateMessage = 'Registration is updated.';
            var registrationItem = await registration.findOne({where: {id:id}});
        }
        return res.status(200).json({
            message: updateMessage,
            registration: !registrationItem ? null : registrationItem,
        });
    }catch(error){
        return res.status(500).json({error: error.message + ' Registration couldn\'t be updated.'});
    }
};

const deleteRegistration = async (req, res) => {
    try{
        let data = req.params.data;
        const isDeleted = registration.destroy({where:{id:data.id}})
        var deletedMessage = 'Registration isn\'t deleted.'
        if(isDeleted){
            deletedMessage = 'Registration with the id: ' + data.id + ' is  deleted.';
        }
        return res.json(200).json({message:deletedMessage});
    }catch(error){
        return res.status(500).json({error:error.message + ' Registration couldn\'t be deleted.'});
    }
};

module.exports = {
    deleteRegistration,
    update,
    findOne,
    create,
    findAll
};

const { products } = require("../models");

const create = async (req, res) => {
  try {
    const product = await products.create(req.body);
    return res.status(200).json({
      product,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({error: error.message});
  }
  // TODO: should be implemented
};

const findAll = async (req, res) => {
    try{
        const productColl = await products.findAll(); 
        return res.status(200).json({productColl});
    }catch(error){
        return res.status(500).json({error:error.message});
    }
};

const findOne = async (req, res) => {
  try {
    const productItem = await products.findAll({
      where: req.params.name ? req.params.name : -1,
    });
    return res.status(200).json({ productItem });
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message + ' Product could\'nt be queried.' });
  }
};

const update = async (req, res) => {
    try{
        const {id} = req.params.id;
        const {updated} = await products.update(req.body, {
            where: {id: id}
        });
        const updateMessage = 'Product couldn\'t be updated.';
        if(updated){
            updateMessage = 'Product is updated.';
            const productItem = await products.findOne({where: {id:id}});
        }
        return res.status(200).json({
            message: updateMessage,
            product: !productItem ? null : productItem,
        });
    }catch(error){
        return res.status(500).json({error: error.message + ' Product couldn\'t be updated.'});
    }
};

const deleteProduct = async (req, res) => {
    try{
        let data = req.params.data;
        const isDeleted = products.destroy({where:{id:data.id}})
        const deletedMessage = 'Product isn\'t deleted.'
        if(isDeleted){
            deletedMessage = 'Product with the id: ' + data.id + ' is  deleted.';
        }
        return res.json(200).json({message:deletedMessaget});
    }catch(error){
        return res.status(500).json({error:error.message + ' Product couldn\'t be deleted.'});
    }
};

module.exports = {
    deleteProduct,
    update,
    findOne, 
    create,
    findAll
};

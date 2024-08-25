const models = require('../models');
module.exports = {
    get: (req, res, next) => {
        models.Product.find().populate('owner')
            .then((products) => res.send(products))
            .catch(next);
    },
    post: (req, res, next) => {
        const { title,description,price,image } = req.body;
        const { _id } = req.user;
        models.Product.create({title, description,price,image, owner: _id })
            .then((createdProduct) => {
                return Promise.all([
                    models.User.updateOne({ _id:req.user_id }, { $push: { productsForSale:createdProduct._id } }),
                    models.Product.findOne({ _id: createdProduct._id })
                ]);
            })
            .then(([_, productObj]) => {
                res.send(productObj);
            })
            .catch(next);
    },
    put: (req, res, next) => {
        const id = req.params.id;
        const {title, description,price,image } = req.body;
        models.Product.updateOne({ _id: id }, {title, description,price,image })
            .then((updatedProduct) => res.send(updatedProduct))
            .catch(next)
    },
    delete: (req, res, next) => {
        const id = req.params.id;
        models.Product.deleteOne({ _id: id })
            .then((removedProduct) => res.send(removedProduct))
            .catch(next)
    }
};
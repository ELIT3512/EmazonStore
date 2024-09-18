const models = require('../models');
const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads')); // Store files in 'backend/uploads'
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Use timestamp for unique filenames
    },
});
const upload = multer({ storage: storage });
module.exports = {
    get: (req, res, next) => {
        models.Product.find().populate('owner')
            .then((products) => res.send(products))
            .catch(next);
    },
    post: (req, res, next) => {
        upload.single('image')(req, res, (err) => {
            if (err) {
                return res.status(500).json({ error: 'Error uploading file' });
            }

            const { title, description, price } = req.body;
            const { _id } = req.user;

            // Create product with the relative path to the image
            const imagePath = req.file ? `/uploads/${req.file.filename}` : ''; // Save relative path to image
            models.Product.create({
                title,
                description,
                price,
                image: imagePath, // Save the relative path to the image
                owner: _id
            })
            .then((createdProduct) => {
                return Promise.all([
                    models.User.updateOne({ _id:_id }, { $push: { productsForSale: createdProduct._id } }),
                    models.Product.findOne({ _id: createdProduct._id })
                ]);
            })
            .then(([_, productObj]) => {
                res.send(productObj);
            })
            .catch(next);
        });
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
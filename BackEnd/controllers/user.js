const models = require('../models');
const config = require('../config/config');
const jwt = require('../utils/jwt');
const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads')); // Specify the upload directory
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Use timestamp for unique filenames
    },
});
const upload = multer({ storage: storage });
module.exports = {
    get: (req, res, next) => {
                const token = req.headers.authorization.split(' ')[1];
        console.log("getToken",token)
        jwt.verifyToken(token)
        .then(decoded =>{
            console.log("Decoded",decoded);
        const userId = decoded.id
        console.log("userId",userId)
        models.User.findById(userId).populate("productsForSale")
          .then((user) => {
            if (!user) {
              return res.status(404).send('find user error');
            }
            res.send(user);
          })
          .catch(next);
        })
    },
      
    post: {
    
    register: (req, res, next) => {
                    console.log("req",req.body)
                    const { username, password } = req.body;
                    if (!username || !password) {
                        return res.status(400).json({ message: 'Username and password are required' });
                      }
                    models.User.create({ username, password })
                        .then((createdUser) => {
                            // Ensure the response is in JSON format
                            res.status(201).json({
                                message: 'User registered successfully',
                                user: createdUser
                            });
                        })
                        .catch((err) => {
                            // Handle error properly and send a JSON response for errors
                            res.status(400).json({ message: 'Error registering user', error: err.message });
                        });
                },         
    login: (req, res, next) => {
            const { username, password } = req.body;
            models.User.findOne({ username })
            // .populate('product')
                .then((user) => Promise.all([user, user.matchPassword(password)]))
                .then(([user, match]) => {
                    if (!match) {
                        res.status(401).send('Invalid password');
                        return;}
                    const token = jwt.createToken({ id: user._id,username: user.username });
                    console.log("user", user)
                    res.json({ ...user.doc,token });
                }).catch(next);},
    logout: (req, res, next) => {
            const authHeader = req.headers.authorization;
            if (!authHeader) {
                return res.status(401).send('No token provided');
            }
            const token = authHeader.split(' ')[1];
            console.log('-'.repeat(100));
            console.log(token);
            console.log('-'.repeat(100));
            models.TokenBlacklist.create({ token })
                .then(() => {
                    res.clearCookie("token").send('Logout successfully!');
                }).catch(next);}},
    put: (req, res, next) => {
                    const id = req.params.id;
                
                    // Use upload.single to handle profileImage if it's included
                    upload.single('profileImage')(req, res, (err) => {
                        if (err) {
                            return res.status(500).json({ error: 'Error uploading file' });
                        }
                
                        // Find the user by ID
                        models.User.findById(id)
                            .then(user => {
                                if (!user) {
                                    return res.status(404).send('User not found');
                                }
                
                                // Update user fields
                                if (req.body.username) user.username = req.body.username;
                                if (req.body.password) user.password = req.body.password; // This will trigger the pre-save hook
                                if (req.body.balance) user.balance = req.body.balance;
                                if (req.file) user.image = `/uploads/${req.file.filename}`; // Update the profile image
                
                                // Save the user (this triggers the pre-save hook)
                                return user.save();
                            })
                            .then(updatedUser => res.send(updatedUser))
                            .catch(next);
                    });
                },  
    delete: (req, res, next) => {
        const id = req.params.id;
        models.User.deleteOne({ _id: id })
            .then((removedUser) => res.send(removedUser))
            .catch(next)
    }
};
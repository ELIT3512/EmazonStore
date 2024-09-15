const models = require('../models');
const config = require('../config/config');
const jwt = require('../utils/jwt');
module.exports = {
    get: (req, res, next) => {
                const token = req.headers.authorization.split(' ')[1];
        console.log("getToken",token)
        jwt.verifyToken(token)
        .then(decoded =>{
            console.log("Decoded",decoded);
        const userId = decoded.id
        console.log("userId",userId)
        models.User.findById(userId)
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
            const { username, password } = req.body;
            models.User.update({ _id: id }, { username, password })
            .then((updatedUser) => res.send(updatedUser))
            .catch(next)
        },
    delete: (req, res, next) => {
        const id = req.params.id;
        models.User.deleteOne({ _id: id })
            .then((removedUser) => res.send(removedUser))
            .catch(next)
    }
};
const { auth } = require('../utils/index');
const router = require('../routes/index.js');
const user = require("../models/User.js")
module.exports = (app) => {

    app.use('/api/user', router.user);

    app.use('/api/products',router.product);

    app.use('*', (req, res, next) => res.send('<h1> Something went wrong. Try again. :thumbsup: </h1>'))
};
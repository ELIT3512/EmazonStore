const controllers = require('../controllers/index');
const router = require('express').Router();
const auth = require('../utils/auth');

router.get('/', controllers.user.get);

router.post('/register', controllers.user.post.register);

router.post('/login', controllers.user.post.login);

router.post('/logout', controllers.user.post.logout);

router.put('/:id',auth(), controllers.user.put);

router.delete('/:id',auth(), controllers.user.delete);

module.exports = router;
const controllers = require('../controllers/index');
const router = require('express').Router();
const  auth  = require('../utils/auth');

router.get('/', controllers.product.get);

router.post('/', auth(), controllers.product.post);

router.put('/:id', auth(), controllers.product.put);

router.delete('/:id', auth(), controllers.product.delete);

module.exports = router;
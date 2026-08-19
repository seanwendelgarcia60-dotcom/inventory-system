const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const ctrl = require('../controllers/productController');

router.use(verifyToken); // protects all routes below

router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getById);
router.post('/', ctrl.create);
router.put('/:id', ctrl.update);
router.delete('/:id', ctrl.remove);

module.exports = router;
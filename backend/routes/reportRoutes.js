const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const { summary } = require('../controllers/reportController');

router.get('/summary', verifyToken, summary);

module.exports = router;
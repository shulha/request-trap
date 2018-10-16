const express = require('express');
const page = require('../page');

const router = express.Router();

/* GET home page. */
router.get('/', page.home);

module.exports = router;

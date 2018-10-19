const express = require('express');
const page = require('../page');
const trap = require('../trap');

const router = express.Router();

router.get('/', page.home);

router.all('/:trap_id', trap.create);
router.get('/:trap_id/requests', trap.show);

module.exports = router;

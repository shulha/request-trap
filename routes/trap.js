const express = require('express');
const trap = require('../trap');

const router = express.Router();

router.all('/:trap_id', trap.create);
router.get('/:trap_id/requests', trap.show);

module.exports = router;

const express = require('express');
const router = express.Router();

const crdcontrollers = require('../controllers/crd');

router.get('/', crdcontrollers.getData);
router.put('/:id', crdcontrollers.updateData);

module.exports = router;
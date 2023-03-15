const express = require('express');
const router = express.Router();

const {addmrd} = require('../controllers/mrd');

router.post('/', addmrd);

module.exports = router;

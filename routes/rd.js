const express = require('express');
const router = express.Router();

const {addrd} = require('../controllers/rd');

router.post('/', addrd);

module.exports = router;

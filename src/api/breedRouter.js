const express = require('express');
const breedService = require('../services/breedService');

const router = express.Router();

router.get('/topbreeds', breedService.getTopBreeds);

module.exports = router;

/*
    path: api/locations

*/

const { Router } = require('express');
const { crearLocation } = require('../controllers/authCoordenadas');
const router = Router();

router.post('/send', crearLocation);

module.exports = router;
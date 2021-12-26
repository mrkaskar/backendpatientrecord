let express = require('express');
const { getAll } = require('../controllers/all');
let router = express.Router();

router.get('/get', getAll);

module.exports = router;
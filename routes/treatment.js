let express = require('express');
const { getTreatment, addTreatment, updateTreatment, deleteTreatment } = require('../controllers/treatement');
let router = express.Router();

router.get('/get', getTreatment);
router.post('/add', addTreatment);
router.post('/update', updateTreatment);
router.post('/delete', deleteTreatment);

module.exports = router;
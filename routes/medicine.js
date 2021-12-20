let express = require('express');
let router = express.Router();

const { getAllMedicine, addMedicine, updateMedicine, deleteMedicine } = require('../controllers/medicine');

router.get('/get', getAllMedicine);
router.post('/add', addMedicine);
router.post('/update', updateMedicine);
router.post('/delete', deleteMedicine);

module.exports = router;
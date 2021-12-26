let express = require('express');
let router = express.Router();

const { getPatient, addPatient, getImages, deletePatient, updatePatient } = require('../controllers/patients');

router.get('/get', getPatient);
router.post('/add', addPatient);
router.post('/update', updatePatient);
router.post('/delete', deletePatient);
router.get('/images/:id', getImages);

module.exports = router;
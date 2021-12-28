let express = require('express');
const { getUser, addUser, updateUser, deleteUser } = require('../controllers/users');
let router = express.Router();

router.get('/get', getUser);
router.post('/add', addUser);
router.post('/update', updateUser);
router.post('/delete', deleteUser);

module.exports = router;
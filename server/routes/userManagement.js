const express = require('express');
const router = express.Router()

const { getAllUser, updateUser,deleteUser } = require('../controller/userManagement');
const { route } = require('./application');

router.route('/get-all-user').get(getAllUser);
router.route('/update-User/:id').post(updateUser);
router.route('/delete-User/:id').post(deleteUser);

module.exports = router;
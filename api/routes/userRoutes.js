var express = require('express');
var router = express.Router();
var usersHelper = require('../helpers/usersQueryHelper');


router.route('/register/')
    .post(usersHelper.registerUser);

router.route('/login/')
    .post(usersHelper.loginUser);


module.exports = router;
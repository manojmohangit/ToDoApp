var express = require('express');
var router = express.Router();
var usersHelper = require('../helpers/usersQueryHelper');


router.route('/register/')
    .post(usersHelper.registerUser);

router.route('/login/')
    .post(usersHelper.loginUser);

router.route('/is-user-auth/')
    .get(usersHelper.verifyJWT, usersHelper.isUserAuthenticated);


module.exports = router;
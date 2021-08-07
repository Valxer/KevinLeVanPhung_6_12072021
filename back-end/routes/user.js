const express = require('express');
const router = express.Router();            // creates a router using express

// imports the middleware we are using in the router
const userCtrl = require('../controllers/user');
const checkMail = require ('../middleware/checkMail');
const checkPassword = require ('../middleware/checkPassword');

router.post('/signup', checkMail, checkPassword, userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;
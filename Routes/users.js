//This is a private route to check jwt authorization

const router = require('express').Router();
const verify = require('../VerifyToken');
const UserController = require('../Controllers/usercontroller');


//Get list of users
router.get('/users', verify, UserController.get_users);

module.exports = router;
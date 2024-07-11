const express = require("express");
const { singUpPage, loginPage } = require("../controller/login-controller");
const router = express.Router();



router.route('/singup').post(singUpPage)
router.route('/login').post(loginPage)

module.exports = router;
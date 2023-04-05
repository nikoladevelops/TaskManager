const express=require('express');
const router = express.Router();
const {getRegister, getLogin, postRegister, postLogin, logout} = require('../controllers/users');;
const {isLoggedIn, isNotLoggedIn} = require('../middleware/loginChecker');

router.route('/register')
.get(isNotLoggedIn, getRegister)
.post(isNotLoggedIn, postRegister);

router.route('/login')
.get(isNotLoggedIn, getLogin)
.post(isNotLoggedIn, postLogin);

router.post('/logout', isLoggedIn, logout)

module.exports=router;
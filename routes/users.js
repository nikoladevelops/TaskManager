const express=require('express');
const router = express.Router();
const {getRegister, getLogin, postRegister, postLogin, logout} = require('../controllers/users');;

router.route('/register')
.get(getRegister)
.post(postRegister);

router.route('/login')
.get(getLogin)
.post(postLogin);

router.post('/logout',logout)

module.exports=router;
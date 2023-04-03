const express=require('express');
const router = express.Router();
const {getRegister,getLogin} = require('../controllers/users');
// TODO
router.route('/register')
.get(getRegister);

router.route('/login')
.get(getLogin)




module.exports=router;
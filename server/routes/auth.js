const router = require('express').Router();

const {signUp, signIn, userList, userFollow} = require('../controller/authController');

router.post('/signup', signUp);
router.post('/signin', signIn);
router.get('/users', userList);
router.put('/user/follow', userFollow);

module.exports = router;
const router = require('express').Router();
const auth = require('../middleware/auth');

const {signUp, signIn, userList, userFollow} = require('../controller/authController');

router.post('/signup', signUp);
router.post('/signin', signIn);
router.get('/users', auth, userList);
router.put('/user/follow', auth, userFollow);

module.exports = router;
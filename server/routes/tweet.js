const router = require('express').Router();

const{tweetPost, tweetList} = require('../controller/tweetController');

router.post('/post', tweetPost);
router.get('/list', tweetList);

module.exports = router;
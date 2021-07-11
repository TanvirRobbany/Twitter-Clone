const router = require('express').Router();

const{tweetPost, tweetList, tweetLikes} = require('../controller/tweetController');

router.post('/post', tweetPost);
router.get('/list', tweetList);
router.put('/like/:id', tweetLikes)

module.exports = router;
const router = require('express').Router();

const{tweetPost, tweetList, tweetLikes, myTweets, deletTweet} = require('../controller/tweetController');

router.post('/post', tweetPost);
router.post('/list', tweetList);
router.put('/like/:id/:userId', tweetLikes);
router.get('/my-tweet/list/:id', myTweets);
router.delete('/delete/:id', deletTweet)

module.exports = router;
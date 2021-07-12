const router = require('express').Router();
const auth = require('../middleware/auth');

const{tweetPost, tweetList, tweetLikes, myTweets, deletTweet} = require('../controller/tweetController');

router.post('/post',auth, tweetPost);
router.post('/list', auth, tweetList);
router.put('/like/:id/:userId', auth, tweetLikes);
router.get('/my-tweet/list/:id', auth, myTweets);
router.delete('/delete/:id', auth, deletTweet)

module.exports = router;
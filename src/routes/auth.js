const express = require('express');
const { signup, signIn } = require('../controllers/auth');
const auth = require('../middlewares/auth');
const router = express.Router();

router.post('/signup', signup);
router.post('/signIn', signIn);

// router.get('/me',auth ,async(req, res)=> {
//     await User req.user._id
// })

module.exports = router;

const router = require('express').Router();
const UserController = require('../controllers/UserController');

router.post('/sign-up', UserController.signUp);
router.post('/sign-in', UserController.signIn);
router.post('/gooogleSignIn', UserController.googleSignIn)

module.exports = router;
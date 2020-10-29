const router = require('express').Router();
const userRouter = require('./userRouter');
const wikiRouter = require('./wikiRouter');
const newsRouter = require('./newsRouter');
const healthRouter = require('./healthRouter');
const userSymptomRouter = require('./userSymptomRouter');
const { authentication } = require('../middlewares/auth');

router.get('/', (req, res) => {
  res.send('HELLO WORLD');
});

// ! USER ROUTER
router.use('/users', userRouter);

router.use(authentication);

// ! WIKI ROUTER
router.use('/wiki', wikiRouter);

// ! NEWS ROUTER
router.use('/news', newsRouter);

// ! Health ROUTER
router.use('/health', healthRouter);

// ! USERSYMPTOM ROUTER

router.use('/user-symptoms', userSymptomRouter);

module.exports = router;
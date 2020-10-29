const router = require('express').Router();
const userRouter = require('./userRouter');
const wikiRouter = require('./wikiRouter');
const newsRouter = require('./newsRouter');
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

module.exports = router;
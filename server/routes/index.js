const router = require('express').Router();
const userRouter = require('./userRouter');
const wikiRouter = require('./wikiRouter');
const newsRouter = require('./newsRouter');
const healthRouter = require('./healthRouter');

router.get('/', (req, res) => {
  res.send('HELLO WORLD');
});

// ! USER ROUTER
router.use('/users', userRouter);

// ! WIKI ROUTER
router.use('/wiki', wikiRouter);

// ! NEWS ROUTER
router.use('/news', newsRouter);

// ! Health ROUTER
router.use('/health', healthRouter);

module.exports = router;
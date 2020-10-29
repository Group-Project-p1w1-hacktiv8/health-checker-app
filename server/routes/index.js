const router = require('express').Router();
const userRouter = require('./userRouter');
const wikiRouter = require('./wikiRouter');
const newsRouter = require('./newsRouter');

router.get('/', (req, res) => {
  res.send('HELLO WORLD');
});

// ! USER ROUTER
router.use('/users', userRouter);

// ! WIKI ROUTER
router.use('/wiki', wikiRouter);

// ! NEWS ROUTER
router.use('/news', newsRouter);

module.exports = router;
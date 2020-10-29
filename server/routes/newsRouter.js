const router = require('express').Router();
const NewsController =  require('../controllers/NewsController');

router.get('/', (req, res) => {
  res.send('HELLO WORLD');
});

module.exports = router;
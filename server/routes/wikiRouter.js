const router = require('express').Router();
const WikiController = require('../controllers/WikiController');

router.get('/', (req, res) => {
  res.send('HELLO WORLD');
});

module.exports = router;
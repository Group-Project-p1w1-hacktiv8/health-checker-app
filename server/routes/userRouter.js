const router = require('express').Router();
const UserController = require('../controllers/UserController');

router.get('/', (req, res) => {
  res.send('HELLO WORLD');
});

module.exports = router;
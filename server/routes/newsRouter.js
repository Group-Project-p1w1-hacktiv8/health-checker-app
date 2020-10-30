const router = require('express').Router();
const NewsController =  require('../controllers/NewsController');

router.get('/', NewsController.findNews);

module.exports = router;
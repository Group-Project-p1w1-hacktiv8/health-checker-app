const router = require('express').Router();
const WikiController = require('../controllers/WikiController');

router.get('/', WikiController.findSymptoms);

module.exports = router;
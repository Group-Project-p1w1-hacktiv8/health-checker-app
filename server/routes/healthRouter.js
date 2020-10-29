const router = require('express').Router();
const HealthController = require('../controllers/HealthController');

router.get('/', HealthController.findHealth);

module.exports = router;
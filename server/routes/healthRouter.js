const router = require('express').Router();
const HealthController = require('../controllers/HealthController');

router.get('/symptoms', HealthController.findSymptoms);
router.post('/treatment', HealthController.findTreatment);

module.exports = router;
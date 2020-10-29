const router = require('express').Router();
const HealthController = require('../controllers/HealthController');

router.get('/symptoms', HealthController.findSymptoms);

router.get('/issues', HealthController.diagnosis);

// ! need req.body { issueId }
router.post('/treatment', HealthController.findTreatment);

module.exports = router;
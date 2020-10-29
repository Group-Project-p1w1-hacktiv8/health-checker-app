const router = require('express').Router();
const HealthController = require('../controllers/HealthController');

router.get('/issues', HealthController.findIssues);
router.post('/treatment', HealthController.findTreatment);

module.exports = router;
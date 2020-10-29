const router = require('express').Router();
const UserSymptomController = require('../controllers/UserSymptomController');
const { authorization } = require('../middlewares/auth');

router.get('/', UserSymptomController.getUserSymptoms);

// ! need req.body { symptomAPIId, symptomName }
router.post('/add', UserSymptomController.addSymptom);


// ! need params user symptom id
router.delete('/delete/:id', authorization, UserSymptomController.deleteUserSymptom);

module.exports = router;
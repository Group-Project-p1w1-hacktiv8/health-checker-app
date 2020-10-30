const { Symptom, UserSymptom, User } = require('../models');

class UserSymptomController {
  static async addSymptom(req, res, next) {
    const UserId = +req.user.id;
    const { symptomAPIId, symptomName } = req.body;

    try {

      const checkSymptom = await Symptom.findOne({
        where: {
          name: symptomName
        }
      });
      
      let SymptomId;

      if(!checkSymptom) {
        const newSymptom = await Symptom.create({
          name: symptomName,
          api_id: symptomAPIId
        });
        SymptomId = newSymptom.id 
      } else {
        SymptomId = checkSymptom.id
      }

      
      const userSymptom = await UserSymptom.create({
        UserId,
        SymptomId
      });

      res.status(201).json(userSymptom);
    } catch (err) {
      next(err);
    }
  }

  static async getUserSymptoms(req, res, next) {
    const userId = +req.user.id;
    try {
      const findAllSymptoms = await User.findByPk(userId, {
        include: Symptom
      });
      // console.log(findAllSymptoms.Symptoms);
      res.status(200).json({
        userSymptoms : findAllSymptoms.Symptoms
      })
    } catch (err) {
      next(err);
    }
  }

  static async deleteUserSymptom(req, res, next) {
    console.log('terpanggil')
    const symptomId = +req.params.id;
    const { id } = req.user;
    try {
      const deleted = await UserSymptom.destroy({
        where: {
          UserId: id,
          SymptomId: symptomId
        }
      });
      console.log(deleted);
      if(deleted) {
        res.status(200).json({
          message: 'User symptom deleted'
        });
      } else {
        throw {
          name: 'NotFound'
        }
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = UserSymptomController;
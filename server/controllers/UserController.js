const { User } = require('../models');
const { comparePassword } = require('../helpers/hash');
const { signInToken } = require('../helpers/jwt');

class UserController {
  static async signUp(req, res, next) {
    const { 
      email, 
      password, 
      first_name, 
      last_name, 
      gender, 
      birth_year } = req.body;
    try {
      const user = await User.create({
        email,
        password,
        first_name,
        last_name,
        gender,
        birth_year
      });
      
      res.status(201).json({
        id: user.id,
        email: user.email
      });
    } catch (err) {
      console.log(err);
      next(err);      
    }
  }

  static async signIn(req, res, next) {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({
        where: {
          email
        }
      });

      if (!user) {
        throw {
          name: 'InvalidUserPassword'
        }
      } else if (!comparePassword(password, user.password)) {
        throw {
          name: 'InvalidUserPassword'
        }
      } else {
        const accessToken = signInToken({
          id: user.id,
          email
        });
        res.status(200).json({ accessToken });
      }
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;
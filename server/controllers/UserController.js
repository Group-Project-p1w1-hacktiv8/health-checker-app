const { User } = require('../models');

class UserController {
  static async signUp(req, res, next) {
    const { email, password } = req.body;
    try {
      const user = await User.create({
        email,
        password
      });
      
      res.status(201).json({
        id: user.id,
        email: user.email
      });
    } catch (err) {
      next(err);      
    }
  }
}

module.exports = UserController;
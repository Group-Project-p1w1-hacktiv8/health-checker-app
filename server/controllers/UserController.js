const { User } = require('../models');
const { comparePassword } = require('../helpers/hash');
const { signInToken } = require('../helpers/jwt');
const {OAuth2Client} = require('google-auth-library');

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

  static googleSignIn (req, res, next){
    let {google_access_token} = req.body
    const client = new OAuth2Client("1527881779-0b6p5uijjlfsddain1cfomo3tu6unojv.apps.googleusercontent.com")
    let email;
    let first_name;
    let last_name;
    let gender;
    let birth_year;
    client.verifyIdToken({
      idToken: google_access_token,
      audience: "1527881779-0b6p5uijjlfsddain1cfomo3tu6unojv.apps.googleusercontent.com"
    })
    .then(ticket => {
      let payload = ticket.getPayload()
      email = payload.email
      first_name = payload.given_name
      last_name = payload.family_name
      gender = "male"
      birth_year = 2000
      // console.log(payload, ">>>")
      return User.findOne({
        where: {email: payload.email}
      })
      .then(user =>{
        if(user){
          // generate token
          return user
        } 
        else {
          let newUser = {
            email,
            password: "12345",
            first_name,
            last_name,
            gender,
            birth_year
          }
          // console.log(newUser)
          return User.create(newUser)
        }
      })
    })
    .then(data => {
      let accessToken = signInToken({id: data.id, email: data.email})
      return res.status(200).json(accessToken)
    })
    .catch(err => {
      console.log(err)
    })
  }
}

module.exports = UserController;
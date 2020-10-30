const jwt = require('jsonwebtoken');

const signInToken = (payload) => {
  const token = jwt.sign(payload, process.env.SECRET);
  return token;
}

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    return decoded;
  } catch (error) {
    return null;    
  }
}

module.exports = {
  signInToken,
  verifyToken
}
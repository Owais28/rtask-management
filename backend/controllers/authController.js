const { User } = require('../models/user')
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
require('dotenv').config();
// const fsPromises = require('fs').promises;
// const path = require('path');


// handle login
const handleLogin = async (req, res) => {

  console.log('')
  const { username, password } = req.body;

  // if username or password is not given 
  if (!username || !password) return res.status(400).json({ 'message': 'Username and password are required.' });

  // find user
  const foundUser = await User.findByUsername(username)
  if (!foundUser) return res.sendStatus(401); //Unauthorized 
  // res.json({})

  // evaluate password 
  const match = await bcrypt.compare(password, foundUser.password);

  // if it matched
  if (match) {
    const role = foundUser.role;

    // create JWTs
    const accessToken = await foundUser.generateToken();

    // create a refresh token
    const refreshToken = jwt.sign(
      { userId: foundUser._id, role: foundUser.role },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '1d' }
    );

    // Saving refreshToken with current user
    await foundUser.saveRefreshToken(refreshToken)

    res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
    res.json({ accessToken });

  } else {
    res.sendStatus(401);
  }
}

module.exports = { handleLogin };
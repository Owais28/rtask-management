// import { User } from '../models/user';
const { User } = require('../models/user')
// const fsPromises = require('fs').promises;
// const path = require('path');
const bcrypt = require('bcrypt');


const createUser = async (userData) => {
  try {
    const newUser = new User(userData);
    const savedUser = await newUser.save();
    console.log('User saved successfully:', savedUser);
    return savedUser;

  } catch (error) {
    console.error('Error saving user:', error);
    throw error;
  }
};

const handleNewUser = async (req, res) => {

  const { username, password, name, email } = req.body;

  if (!username || !password) return res.status(400).json({ 'message': 'Username and password are required.' });

  // check for duplicate usernames in the db
  const duplicate = await User.isUsernameTaken(username);

  if (duplicate) return res.status(409).json({ "message": "username is not available" }); //Conflict 

  try {

    if (req.body.role) {
      //store the new user
      const newUser = {
        "username": username,
        "name": name,
        "email": email,
        "password": password,
        "role": req.body.role
      };
    }

    const newUser = {
      "username": username,
      "name": name,
      "email": email,
      "password": password,
    }

    // save user
    const newUserCreated = await createUser(newUser)

    res.status(201).json({ 'success': `New user ${newUserCreated} created!` });

  } catch (err) {
    res.status(500).json({ 'message': err.message });
  }
}

module.exports = { handleNewUser };
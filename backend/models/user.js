const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  refreshToken: { type: String },

});

// Hash the password before saving the user
UserSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

// Compare the provided password with the hashed password
UserSchema.methods.comparePassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw new Error(error);
  }
};

// Generate a JWT token for the user
UserSchema.methods.generateToken = async function () {
  const token = jwt.sign(
    { userId: this._id, role: this.role },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '24h' }
  );
  return token;
};

// Save refresh token
UserSchema.methods.saveRefreshToken = async function (refreshToken) {
  this.refreshToken = refreshToken;
  await this.save();
};

// Find user by their username  
UserSchema.statics.findByUsername = async function (username) {
  return this.findOne({ username });
}

// Custom method to check for duplicate username
UserSchema.statics.isUsernameTaken = async function (username) {
  const user = await this.findOne({ username });
  return !!user; // Returns true if a user with the given username exists, false otherwise
};

const User = mongoose.model('User', UserSchema);

module.exports = { User, UserSchema };

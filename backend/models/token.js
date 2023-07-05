const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

const Token = mongoose.model('Token', tokenSchema);

// Save the token to the database
const token = new Token({
  token: yourToken,
  userId: userId
});
await token.save();

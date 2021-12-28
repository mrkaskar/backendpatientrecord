const mongoose = require('mongoose');
const { Schema } = mongoose;

const Users = new Schema({
  email: String,
  name: String,
  type: String, 
},{
  timestamps: true
});

let UserModel = mongoose.model('Users', Users);

module.exports = UserModel;
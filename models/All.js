const mongoose = require('mongoose');
const { Schema } = mongoose;

const All = new Schema ({
  users: Number,
  patients: Number,
  medicine: Number,
  revenue: Number,
  treatment: Number
});

let AllModel = mongoose.model('All', All);

module.exports = AllModel;
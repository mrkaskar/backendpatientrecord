const mongoose = require('mongoose');
const { Schema } = mongoose;

const Patient = new Schema({
  reg: String,
  name: String,
  phone: String,
  age: Number,
  address: String,
  date: Date,
  folderId: String,
  total: Number,
  treatment: [{
    type: Schema.Types.ObjectId,
    ref: "Treatment"
  }],
  medicine: [{
    type: Schema.Types.ObjectId,
    ref: "Medicine" 
  }],
  medCount: [Number],
  images: [String]
},
{
  timestamps: true
}
);

let PatientModel = mongoose.model('Patients', Patient);

module.exports = PatientModel;
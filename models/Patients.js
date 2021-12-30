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
  treatmentDates: [String],
  medicine: [{
    type: Schema.Types.ObjectId,
    ref: "Medicine" 
  }],
  medCount: [Number],
  medDates: [String],
  images: [String]
},
{
  timestamps: true
}
);

let PatientModel = mongoose.model('Patients', Patient);

module.exports = PatientModel;
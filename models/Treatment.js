const mongoose = require('mongoose');
const { Schema } = mongoose;

const Treatment = new Schema({
  trecode: String,
  name: String,
  charge: String, 
},
{
  timestamps: true
}
);

let TreatmentModel = mongoose.model('Treatment', Treatment);

module.exports =  TreatmentModel ;
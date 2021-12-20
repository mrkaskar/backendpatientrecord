const mongoose = require('mongoose');
const { Schema } = mongoose;

const Medicine = new Schema({
  medcode: String,
  name: String,
  price: String, 
  stock: Number
},
{
  timestamps: true
}
);

let MedicineModel = mongoose.model('Medicine', Medicine);

module.exports =  MedicineModel;
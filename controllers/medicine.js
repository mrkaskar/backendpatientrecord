const MedicineModel = require("../models/Medicine");
const { getData, addData, updateData, deleteData } = require('../services/db_operation');
const { updateAll } = require("./all");

const getAllMedicine = async (req, res) => {
  res.json(await getData(MedicineModel));
}
const addMedicine = async (req, res) => {
  const data = req.body;
  data.stock = +data.stock;
  try{
    await addData(MedicineModel, data);
    await updateAll('medicine', 1 , 'increase');
    res.status(201).json('added');  
  }
  catch(e){
    res.status(500).json(e.message);  
  }
}

const reduceStock = async (id, amount) => {
  await MedicineModel.findOneAndUpdate({
    _id: id,
    stock: {$gte: 0}
  }, {
    $inc: {stock: -amount}
  })
}

const updateMedicine = async (req, res) => {
  const data = req.body;
  const id = data.id;
  delete data.id;
  if(data.stock) {
    data.stock = +data.stock; 
  }
  try{
    await updateData(MedicineModel, data,id);
    res.status(201).json('updated');  
  }
  catch(e) {
    res.status(500).json(e.message);  
  }
}

const deleteMedicine = async (req,res) => {
  const id = req.body.id;
  try{
    await deleteData(MedicineModel, id);
    await updateAll('medicine', 1 , 'decrease');
    res.status(201).json('deleted');
  }
  catch(e) {
    res.status(500).json(e.message);
  }
}

module.exports = {
  getAllMedicine,
  addMedicine,
  updateMedicine,
  deleteMedicine,
  reduceStock
}

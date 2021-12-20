const TreatmentModel = require("../models/Treatment");
const { getData, addData, updateData, deleteData } = require('../services/db_operation');

const getTreatment = async (req, res) => {
  res.json(await getData(TreatmentModel));
}
const addTreatment = async (req, res) => {
  const data = req.body;
  try{
    await addData(TreatmentModel, data);
    res.status(201).json('added');
  }
  catch(e) {
    res.status(500).json(e.message);
  }
}

const updateTreatment = async (req, res) => {
  const data = req.body;
  const id = data.id;
  delete data.id;
  try{
    await updateData(TreatmentModel, data,id);
    res.status(201).json('updated');  
  }
  catch(e) {
    res.status(500).json(e.message);  
  } 
}


const deleteTreatment = async (req,res) => {
  const id = req.body.id;
  try{
    await deleteData(TreatmentModel, id);
    res.status(201).json('deleted');
  }
  catch(e) {
    res.status(500).json(e.message);
  }
}

module.exports = {
  getTreatment,
  addTreatment,
  updateTreatment,
  deleteTreatment 
}

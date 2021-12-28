const UserModel = require("../models/Users");
const { getData, addData, updateData, deleteData } = require('../services/db_operation');
const { updateAll } = require("./all");

const getUser = async (req, res) => {
  res.json(await getData(UserModel));
}
const addUser = async (req, res) => {
  const data = req.body;
  try{
    await addData(UserModel, data);
    await updateAll('users', 1 , 'increase');
    res.status(201).json('added');
  }
  catch(e) {
    res.status(500).json(e.message);
  }
}

const updateUser = async (req, res) => {
  const data = req.body;
  const id = data.id;
  delete data.id;
  try{
    await updateData(UserModel, data,id);
    res.status(201).json('updated');  
  }
  catch(e) {
    res.status(500).json(e.message);  
  } 
}


const deleteUser = async (req,res) => {
  const id = req.body.id;
  try{
    await deleteData(UserModel, id);
    await updateAll('users', 1 , 'decrease');
    res.status(201).json('deleted');
  }
  catch(e) {
    res.status(500).json(e.message);
  }
}

module.exports = {
  getUser,
  addUser,
  updateUser,
  deleteUser 
}

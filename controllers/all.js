const AllModel = require('../models/All');

const { getData, addData, updateData, deleteData } = require('../services/db_operation');

const getAll = async (req, res) => {
  res.json(await getData(AllModel));
}

const addAll = async () => {
  const data = {
    users: 0,
    patients: 0,
    medicine: 0,
    revenue: 0, 
    treatment: 0
  }
  try{
    await addData(AllModel, data);
  }
  catch(e){
    console.log(e.message);
  }
}
//dvalue => difference value
//type => increase or decrease
const updateAll = async (key, dvalue, type) => {
    let all = await getData(AllModel);
    if(all.length) {
      all = all[0];
    }
    if(type === 'increase'){
      all[key] += dvalue; 
    }
    else {
      all[key] -= dvalue;
    } 
   try {
     await AllModel.findByIdAndUpdate(all.id, all);
   }
  catch (e) {
    console.log(e.message);
  }
}

updateAll('users', 1, 'decrease');

module.exports = {
  getAll,
  updateAll
}

require('../helpers/connect_db');
require('../helpers/remodel');
const restructure = require('../helpers/remodel');

const Service = {
  getData: async (Model, populate) => {
    if(!populate)
    return restructure( await Model.find().sort({updatedAt: -1}))
    else
    return restructure(
      await Model.find().populate(populate).sort({updatedAt: -1})
    )
  
  },
  addData: async (Model, data) => {
    try{
      const toSave = new Model(data);
      await toSave.save();
      return 'success add';
    }
    catch(e) {
      throw new Error(e);
    }
  },
  updateData: async (Model, data, id) => {
    try{
      await Model.findByIdAndUpdate(id,data);
      console.log('update success');
      return 'success update';
    }
    catch(e) {
      throw new Error(e);
    }
  },
  deleteData:async (Model, id) =>{
    try{
      await Model.deleteOne({_id: id});
      return 'success delete';
    }
    catch(e) {
     throw new Error(e) ;
    }
  } 

}
module.exports = Service;
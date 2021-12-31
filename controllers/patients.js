const { download, createFolder, upload, updateName, listFiles, deleteFile } = require('../helpers/drive_functions');
const PatientModel = require('../models/Patients');
const MedicineModel = require('../models/Medicine');
const { getData, addData, updateData, deleteData } = require('../services/db_operation');
const { updateAll } = require('./all');
const fs = require('fs');
var path = require('path');
const { reduceStock } = require('./medicine');
const root = path.dirname(require.main.filename);
const env = require('../envconfig');


const getPatient = async (req, res) => {
  res.json(await getData(PatientModel,['treatment', 'medicine']));
}


function decodeBase64Image(dataString) {
  var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
      response = {};

  if (matches.length !== 3) {
      return new Error('Invalid input string');
  }

  response.type = matches[1];
  response.data = Buffer.from(matches[2], 'base64');

  return response;
}

const uploadImagesToDrive = async (images, regNum, name, fileids, folderId) => {
    for(var i = 1; i <= images.length; i++) {
      let imageName = `${regNum}-${name}-${Math.floor(Math.random()*1000)}.jpg` 
      let pathName = `${root}/temp/upload/${imageName}`;
      let decodedImg = decodeBase64Image(images[i - 1].dataURL);
      let imageBuffer = decodedImg.data;
      try{
       await fs.writeFileSync(pathName, imageBuffer, 'base64');
      
       fileids.push(
        await upload(imageName, pathName, folderId)
       );
       fs.unlinkSync(pathName);
  
      }
      catch(e) {
       console.log(e.message) ;
      }
    }
}

const addPatient = async (req, res) => {
  
  let { name, phone, age, address, regNum, treatments, total, medicine, images , date, remark} = req.body;
  treatments = JSON.parse(treatments);
  medicine = JSON.parse(medicine);
  let treatmentIds = [];
  let treatmentDates = [];
  let treCount = [];
  Object.keys(treatments).forEach(tdate => {
    treatments[tdate].forEach(t => {
      treatmentDates.push(tdate);  
      treatmentIds.push(t.id); 
      treCount.push(+t.unit);
    });
  });
  

  let medIds = [];
  let medDates = [];
  let medCount = [] ;

  Object.keys(medicine).forEach(mdate => {
    medicine[mdate].forEach(m => {
      medDates.push(mdate);  
      medIds.push(m.id); 
      medCount.push(m.count);
    });
  });

  for(var i = 0; i < medIds.length; i++){
     await reduceStock(medIds[i], +medCount[i]); 
    
  }
  
  images = JSON.parse(images);
  let fileids = [];

  const folderId = await createFolder(`${regNum}-${name}`, env.folderId);
  
  if(images.length > 0) {
      await uploadImagesToDrive(images, regNum, name, fileids, folderId);
  }

  if(fileids.length > 0) {
    fileids.forEach(async (i) => {
      try{
        await download(i);
      }
      catch(e) {
        console.log(e.message);
      }
    });
  }

   const data = {
     reg: regNum,
     name: name,
     phone: phone,
     age: +age,
     folderId,
     total: +total,
     address: address,
     date,
     treatment: treatmentIds,
     treCount,
     treatmentDates,
     medicine: medIds,
     medCount: medCount,
     medDates,
     remark,
     images: fileids
   }
   try{
     await addData(PatientModel, data);
     await updateAll('patients', 1 , 'increase');
     await updateAll('revenue', +total , 'increase');
    res.status(201).json('added');  
  }
  catch(e){
    console.log(e.message);
    res.status(500).json(e.message);  
  }
}

const updatePatient = async (req, res) => {
  let { id,
     name,
     phone,
     age,
     address,
     total,
     oldTotal,
     regNum,
     treatments,
     medicine,
     images,
     folderId,
     date,
     remark
    } = req.body;
  treatments = JSON.parse(treatments);
  medicine = JSON.parse(medicine);

  let treatmentIds = [];
  let treatmentDates = [];
  let treCount = [];
  Object.keys(treatments).forEach(tdate => {
    treatments[tdate].forEach(t => {
      treatmentDates.push(tdate);  
      treatmentIds.push(t.id); 
      treCount.push(+t.unit);
    });
  });
  
  let medicineIds = [];
  let medDates = [];
  let medCount = [] ;

  Object.keys(medicine).forEach(mdate => {
    medicine[mdate].forEach(m => {
      medDates.push(mdate);  
      medicineIds.push(m.id); 
      medCount.push(m.count);
    });
  });
  
 //to reduce stock 
  const newMedicineStock = {};

  Object.keys(medicine).forEach(e => {
      medicine[e].forEach(mobj => {
        if(!newMedicineStock[mobj.id]){
          newMedicineStock[mobj.id] = 0;  
        } 
          newMedicineStock[mobj.id] += mobj.count;  
      });
  });

  const medIds = [];
  
  Object.keys(newMedicineStock).forEach(mid => {
      medIds.push(mid);
  });

 //get Old Stock of Patient 
  const patientData = await PatientModel.findOne({id });
  const patientMeds = patientData.medicine; 
  const patientMedsCount = patientData.medCount; 
  
  const oldMedicineStock = {};
  const oldMedIds = [];

  for(let i = 0; i < patientMeds.length; i++) {
    const omid = patientMeds[i].toString();    
    oldMedIds.push(omid);
    if(medIds.includes(omid)) {
      if(!oldMedicineStock[omid]){
        oldMedicineStock[omid] = 0;
      }
        oldMedicineStock[omid] += patientMedsCount[i];
    }
  }

  let toReduceMedIds = []
  let toReduce = [];
  Object.keys(newMedicineStock).forEach(keyid => {
      if(newMedicineStock[keyid] > oldMedicineStock[keyid]) {
        toReduceMedIds.push(keyid); 
        toReduce.push(newMedicineStock[keyid] - oldMedicineStock[keyid]);
      }
  });

  for(let i = 0; i < toReduceMedIds.length; i++) {
    await reduceStock(toReduceMedIds[i], +toReduce[i]); 
  }

  let toReduceNewIds = [];
  let toReduceNew = [];

  Object.keys(newMedicineStock).forEach(keyid => {
    if(!oldMedIds.includes(keyid)) {
     //this is new medicine 
      toReduceNewIds.push(keyid);
      toReduceNew.push(newMedicineStock[keyid]);
    }
  });

  for(let i = 0; i < toReduceNewIds.length; i++) {
    await reduceStock(toReduceNewIds[i], +toReduceNew[i]); 
  }

  
  await updateName(folderId, `${regNum}-${name}`);

  images = JSON.parse(images);

  const noChangedImages = images.filter(e => e.dataURL.startsWith('/api/')).map(e => e.dataURL.slice(-33));
  const uploadImages = images.filter(e => !e.dataURL.startsWith('/api/'));

  const fileids = noChangedImages;
  
  if(uploadImages.length > 0) {
      await uploadImagesToDrive(uploadImages, regNum, name, fileids, folderId);
  }


  const existingImages = await listFiles(folderId);
  
  if(noChangedImages.length !== existingImages.length){
   //delete file start  
    const toDelete = existingImages.filter(e => !noChangedImages.includes(e));
    if(toDelete.length > 0) {
      toDelete.forEach(async (d) => {
        await deleteFile(d); 
      let deletePathName = `${root}/temp/images/${d}.jpg`;
       fs.unlinkSync(deletePathName);
      })
    }
  }

  if(fileids.length > 0) {
    fileids.forEach(async (i) => await download(i));
  }

   const data = {
     reg: regNum,
     name: name,
     phone: phone,
     age: +age,
     folderId,
     total: +total,
     address: address,
     date,
     treatment: treatmentIds,
     treCount,
     treatmentDates,
     medicine: medicineIds,
     medCount: medCount,
     medDates,
     remark,
     images: fileids
   }
   try{
    await updateData(PatientModel, data, id);
    const totalDiff = +total - +oldTotal;
    if(totalDiff > 0) {
      await updateAll('revenue', totalDiff , 'increase');
    }
    res.status(201).json('added');  
  }
  catch(e){
    console.log(e.message);
    
    res.status(500).json(e.message);  
  }
}

const deletePatient = async (req, res) => {
  const id = req.body.id;
  const folderId = req.body.folderId;

  try{
    await deleteData(PatientModel, id);
    await deleteFile(folderId);  
    await updateAll('patients', 1 , 'decrease');
    res.status(201).json('deleted');
  }
  catch(e) {
    res.status(500).json(e.message);
  }
}


const getImages = async (req, res) => {
  const id = req.params.id;
  const checkExist = fs.existsSync(`${root}/temp/images/${id}.jpg`);
  if(!checkExist) await download(id);
  
  res.set('Content-Type', 'image/jpeg');

  res.sendFile(`${root}/temp/images/${id}.jpg`);
  
}

module.exports = {
  getPatient, addPatient, getImages, deletePatient, updatePatient
}
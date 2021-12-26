const { download, createFolder, upload, updateName, listFiles, deleteFile } = require('../helpers/drive_functions');
const PatientModel = require('../models/Patients');
const { getData, addData, updateData, deleteData } = require('../services/db_operation');
const { updateAll } = require('./all');
const fs = require('fs');
var path = require('path');
const { reduceStock } = require('./medicine');
const root = path.dirname(require.main.filename);


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
  
  let { name, phone, age, address, regNum, treatments, total, medicine, images , date} = req.body;
  treatments = JSON.parse(treatments);
  medicine = JSON.parse(medicine);
  medicineIds = medicine.map(e => e.id);
  medicineCount = medicine.map(e => e.count);

  for (m of medicine) {
    await reduceStock(m.id, +m.count); 
  }
  
  images = JSON.parse(images);
  let fileids = [];

  const folderId = await createFolder(`${regNum}-${name}`, '1B_Qfjlz8KayC5R5bmL_nd3NehFwKaUnb');
  
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
     treatment: treatments,
     medicine: medicineIds,
     medCount: medicineCount,
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
  let { id, name, phone, age, address, total, oldTotal, regNum, treatments, medicine, images, folderId, date, oldStock } = req.body;
  treatments = JSON.parse(treatments);
  medicine = JSON.parse(medicine);
  oldStock = JSON.parse(oldStock);

  medicineIds = medicine.map(e => e.id);
  medicineCount = medicine.map(e => +e.count);

  oldStockIds = oldStock.map(e => e.id);
  newMeds = medicine.filter(e => {
      if(!oldStockIds.includes(e.id)) return true;
      return false;
  });
  for (m of newMeds) {
    await reduceStock(m.id, +m.count); 
  }

  await updateName(folderId, `${regNum}-${name}`);

  images = JSON.parse(images);

  const noChangedImages = images.filter(e => e.dataURL.startsWith('http')).map(e => e.dataURL.slice(-33));
  const uploadImages = images.filter(e => !e.dataURL.startsWith('http'));

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
     address: address,
     total: +total,
     date: date,
     treatment: treatments,
     medicine: medicineIds,
     medCount: medicineCount,
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
  const checkExist = fs.existsSync(`./temp/images/${id}.jpg`);
  if(!checkExist) await download(id);
  
  res.set('Content-Type', 'image/jpeg');

  res.sendFile(`${root}/temp/images/${id}.jpg`);
  
}

module.exports = {
  getPatient, addPatient, getImages, deletePatient, updatePatient
}
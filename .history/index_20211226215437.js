const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const { listImages, download } = require('./helpers/drive_functions');
const root = path.dirname(require.main.filename);

var cors = require('cors');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({limit: '50mb'}))



let treatmentRoutes = require('./routes/treatment');
let medRoutes = require('./routes/medicine');
let patientRoutes = require('./routes/patients');
let allRoutes = require('./routes/all');

app.use('/api/treatment', treatmentRoutes);
app.use('/api/medicine', medRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/dashboard', allRoutes);


async function downloadAllImages () {
  const imagesIds = await listImages();
  for(id of imagesIds){
    const checkExist = fs.existsSync(`${root}/temp/images/${id}.jpg`);
    if(!checkExist){
      download(id); 
    }
  } 
}

downloadAllImages();


const port = process.env.PORT  || 5000;
app.listen(port);
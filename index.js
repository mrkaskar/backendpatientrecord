const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const AllModel = require('./models/All');
const { getData } = require('./services/db_operation');
const env = require('./envconfig');
require('./helpers/passport_config');

const fs = require('fs');
var path = require('path');
var cors = require('cors');

const { listImages, download } = require('./helpers/drive_functions');
const root = path.dirname(require.main.filename);


const app = express();

app.use(cors({
  origin: env.front,
  credentials: true,
  exposedHeaders: ['set-cookie'],
}));
app.use(session({secret: 'cats',
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

//for heroku deployment

//var uploadDir = '/app/temp/upload';

//if (!fs.existsSync(uploadDir)){
 //   fs.mkdirSync(uploadDir, { recursive: true });
//}
//

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({limit: '50mb'}))




app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

app.get(
  "/google/callback",
  passport.authenticate("google",{
    failureRedirect: `${env.front}/login`
  }),
  (req, res) => {
    res.redirect(env.front)
  }
);

app.get("/checkauth",(req, res) => {
  if(req.user)
    {
      res.json(req.user);
    }
  else 
  res.status(401).json('Not authenticate');
});

app.get('/logout/', (req, res) => {
  req.logout();
  req.user = null;
  res.redirect(env.front)
})
app.get('/resetrevenue', async (req, res) => {
    let all = await getData(AllModel);
    if(all.length) {
      all = all[0];
    }
   try {
     await AllModel.findByIdAndUpdate(all.id, {
       revenue: 0,
     });
     res.send('success');
   }
  catch (e) {
    console.log(e.message);
    res.send('error');
  }
});

let treatmentRoutes = require('./routes/treatment');
let medRoutes = require('./routes/medicine');
let patientRoutes = require('./routes/patients');
let userRoutes = require('./routes/users');
let allRoutes = require('./routes/all');

app.use('/api/treatment', treatmentRoutes);
app.use('/api/medicine', medRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/users', userRoutes);
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
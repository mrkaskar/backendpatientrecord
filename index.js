const express = require('express');
const app = express();
var cors = require('cors');
app.use(cors());
app.use(express.json());

let treatmentRoutes = require('./routes/treatment');
let medRoutes = require('./routes/medicine');

app.use('/api/treatment', treatmentRoutes);
app.use('/api/medicine', medRoutes);


const port = process.env.PORT  || 5000;
app.listen(port);
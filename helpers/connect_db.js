let mongoose = require('mongoose');

let mongoDB = "mongodb+srv://kzinthant:kk123@cluster0.wzwkc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
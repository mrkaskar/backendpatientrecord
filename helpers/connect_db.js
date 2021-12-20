let mongoose = require('mongoose');

let mongoDB = "mongodb+srv://dbuser:dd123@cluster0.hvpaw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
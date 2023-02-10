const mongoose = require('mongoose')
require('dotenv').config();

try{
    mongoose.set('strictQuery', false);
    mongoose.connect(process.env.MONGO_URL  || process.env.MONGO_URL , 
    {
        useNewUrlParser: true,

        useUnifiedTopology: true
    });
    console.log("MONGO 123 Connected");
}
catch(err) {
    console.log(err.message);
    process.exit(1);
}
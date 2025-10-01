const mongoose = require('mongoose');
require('dotenv').config();

const DB = process.env.MONGODB_URI

mongoose.connect(DB)
.then(()=>{
    console.log('Database connect successfully');
})
.catch((error)=>{
    console.log('Error connecting to database', error.message);
})

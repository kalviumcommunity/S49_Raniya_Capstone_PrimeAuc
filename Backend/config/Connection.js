const mongoose = require('mongoose');
require("dotenv").config();

async function connectToDB(){
    try {
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("connected to mongodb database");
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectToDB;

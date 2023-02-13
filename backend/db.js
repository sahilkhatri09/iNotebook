const mongoose = require('mongoose');

const DB = process.env.DATABASE.replace(
    '<password>',
    process.env.DATABASE_PASSWORD
);
const connectToMongo = () => {
    mongoose.set("strictQuery", false);
    mongoose.connect(DB, () => {
        console.log("Connected to Mongo Sucessfully");

    })
}

module.exports = connectToMongo;
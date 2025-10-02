const mongoose = require('mongoose');

async function connectMongoDB(url) {
    await mongoose.connect(url)
    .then(console.log("mongodb connected..."))
    .catch((err)=> console.log('error connecting db ', err));
}

module.exports = connectMongoDB;
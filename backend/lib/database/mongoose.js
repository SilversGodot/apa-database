const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb+srv://apa-admin:nov11222@apa-database.hszts.mongodb.net/apa?retryWrites=true&w=majority' , {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
    .then(() => console.log("Database Connected"))
    .catch((error) => console.log(error));

module.exports = mongoose;
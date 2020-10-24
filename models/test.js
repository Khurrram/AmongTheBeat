const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TestSchema = new Schema({
    name : {
       
    }
});


module.exports = test = mongoose.model('test', TestSchema)
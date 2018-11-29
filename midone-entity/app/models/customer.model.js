const mongoose = require('mongoose');

const CustomerSchema = mongoose.Schema({
    ID_Customer: {
      type : Number,
      unique: true },
    name: String,
    bank: String,
    accountNumber:String
});
mongoose.set('useFindAndModify', false)
module.exports = mongoose.model('Customer', CustomerSchema);
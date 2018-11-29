const mongoose = require('mongoose');

const PaymentProviderSchema = mongoose.Schema({
    name: {
      type: String,
      unique: true}
});
mongoose.set('useFindAndModify', false)
module.exports = mongoose.model('PaymentProvider', PaymentProviderSchema);
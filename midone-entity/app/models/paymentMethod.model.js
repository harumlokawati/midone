const mongoose = require('mongoose');

const PaymentMethodSchema = mongoose.Schema({
    methodName: String,
    paymentProviderName: String,
    accNumber: String,
});
mongoose.set('useFindAndModify', false)
module.exports = mongoose.model('PaymentMethod', PaymentMethodSchema);
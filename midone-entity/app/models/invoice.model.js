const mongoose = require('mongoose');

const InvoiceSchema = mongoose.Schema({
    customer: Number,
    time: String,
    type: String,
    amount: Number,
    paymentMethod: String,
    paymentProvider: String,
    note: String
}, {
    timestamps: true
});
mongoose.set('useFindAndModify', false)
module.exports = mongoose.model('Invoice', InvoiceSchema);
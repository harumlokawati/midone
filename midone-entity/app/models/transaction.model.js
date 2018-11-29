const mongoose = require('mongoose');

const TransactionSchema = mongoose.Schema({
    customer: Number,
    type: String,
    status: Number,
    amount: Number,
    paymentMethod: String,
    paymentProvider: String,
}, {
    timestamps: true
});
mongoose.set('useFindAndModify', false)
module.exports = mongoose.model('Transaction', TransactionSchema);
const Transaction = require('../models/transaction.model.js');

// Create and Save a new Transaction
exports.create = (req, res) => {
  // Create a Transaction
  const transaction = new Transaction({
    customer: req.body.customer,
    type: req.body.type,
    status: req.body.status,
    amount: req.body.amount,
    paymentMethod: req.body.paymentMethod,
    paymentProvider: req.body.paymentProvider,
  });

  // Save Transaction in the database
  transaction.save()
  .then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
        message: err.message || "Some error occurred while creating the Transaction."
    });
  });
};

// Retrieve and return all transaction from the database.
exports.findAll = (req, res) => {
  Transaction.find()
  .then(transactions => {
      res.send(transactions);
  }).catch(err => {
      res.status(500).send({
          message: err.message || "Some error occurred while retrieving transactions."
      });
  });
};

// Find a single transaction with a transactionId
exports.findOne = (req, res) => {
  Transaction.findById(req.params.id)
  .then(transaction => {
      if(!transaction) {
          return res.status(404).send({
              message: "Transaction not found with id " + req.params.id
          });            
      }
      res.send(transaction);
  }).catch(err => {
      if(err.kind === 'ObjectId') {
          return res.status(404).send({
              message: "Transaction not found with id " + req.params.id
          });                
      }
      return res.status(500).send({
          message: "Error retrieving transaction with id " + req.params.id
      });
  });
};
exports.updateStatus = (req, res) => {
  // Find transaction and update it with the request body
    Transaction.update({ _id: req.params.id },
      {
        $set: {
          status: req.body.status,
        }
    }, {new: true})
    .then(transaction => {
      if(!transaction) {
          return res.status(404).send({
              message: "Transaction not found with id " + req.params.id
          });
      }
      res.send(transaction);
    }).catch(err => {
      if(err.kind === 'ObjectId') {
          return res.status(404).send({
              message: "Transaction not found with id " + req.params.id
          });                
      }
      return res.status(500).send({
          message: "Error updating transaction with id " + req.params.id
      });
    });
  };
// Update a transaction identified by the transactionId in the request
exports.update = (req, res) => {
// Find transaction and update it with the request body
  Transaction.findByIdAndUpdate(req.params.id, {
    type: req.body.type,
    status: req.body.status,
    amount: req.body.amount,
    paymentMethod: req.body.paymentMethod,
    paymentProvider: req.body.paymentProvider,
  }, {new: true})
  .then(transaction => {
    if(!transaction) {
        return res.status(404).send({
            message: "Transaction not found with id " + req.params.id
        });
    }
    res.send(transaction);
  }).catch(err => {
    if(err.kind === 'ObjectId') {
        return res.status(404).send({
            message: "Transaction not found with id " + req.params.id
        });                
    }
    return res.status(500).send({
        message: "Error updating transaction with id " + req.params.id
    });
  });
};

// Delete a transaction with the specified transactionId in the request
exports.delete = (req, res) => {
  Transaction.findByIdAndRemove(req.params.id)
  .then(transaction => {
      if(!transaction) {
          return res.status(404).send({
              message: "Transaction not found with id " + req.params.id
          });
      }
      res.send({message: "Transaction deleted successfully!"});
  }).catch(err => {
      if(err.kind === 'ObjectId' || err.name === 'NotFound') {
          return res.status(404).send({
              message: "Transaction not found with id " + req.params.id
          });                
      }
      return res.status(500).send({
          message: "Could not delete transaction with id " + req.params.id
      });
  });
};
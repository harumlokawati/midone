const Invoice = require('../models/invoice.model.js');

exports.create = (req, res) => {
  const invoice = new Invoice({
    customer: req.body.customer,
    type: req.body.type,
    time: req.body.time,
    amount: req.body.amount,
    paymentMethod: req.body.paymentMethod,
    paymentProvider: req.body.paymentProvider,
    note: req.body.note
  });

  invoice.save()
  .then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
        message: err.message || "Some error occurred while creating the invoice."
    });
  });
};

exports.findAll = (req, res) => {
  Invoice.find()
  .then(invoices => {
      res.send(invoices);
  }).catch(err => {
      res.status(500).send({
          message: err.message || "Some error occurred while retrieving invoices."
      });
  });
};

exports.findOne = (req, res) => {
  Invoice.findById(req.params.id)
  .then(invoice => {
      if(!invoice) {
          return res.status(404).send({
              message: "Invoice not found with id " + req.params.id
          });            
      }
      res.send(invoice);
  }).catch(err => {
      if(err.kind === 'ObjectId') {
          return res.status(404).send({
              message: "Invoice  not found with id " + req.params.id
          });                
      }
      return res.status(500).send({
          message: "Error retrieving invoice with id " + req.params.id
      });
  });
};

exports.update = (req, res) => {
  Invoice.findByIdAndUpdate(req.params.id, {
    customer: req.body.customer,
    type: req.body.type,
    time: req.body.time,
    amount: req.body.amount,
    paymentMethod: req.body.paymentMethod,
    paymentProvider: req.body.paymentProvider,
    note: req.body.note,
  }, {new: true})
  .then(invoice => {
    if(!invoice) {
        return res.status(404).send({
            message: "Invoice not found with id " + req.params.id
        });
    }
    res.send(invoice);
  }).catch(err => {
    if(err.kind === 'ObjectId') {
        return res.status(404).send({
            message: "Invoice not found with id " + req.params.id
        });                
    }
    return res.status(500).send({
        message: "Error updating invoice with id " + req.params.id
    });
  });
};

exports.delete = (req, res) => {
  Invoice.findByIdAndRemove(req.params.id)
  .then(invoice => {
      if(!invoice) {
          return res.status(404).send({
              message: "Invoice not found with id " + req.params.id
          });
      }
      res.send({message: "Invoice deleted successfully!"});
  }).catch(err => {
      if(err.kind === 'ObjectId' || err.name === 'NotFound') {
          return res.status(404).send({
              message: "Invoice not found with id " + req.params.id
          });                
      }
      return res.status(500).send({
          message: "Could not delete Invoice with id " + req.params.id
      });
  });
};
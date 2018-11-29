const Customer = require('../models/customer.model.js');

exports.create = (req, res) => {
  const customer = new Customer({
    ID_Customer: req.body.ID_Customer,
    name: req.body.name,
    bank: req.body.bank,
    accountNumber: req.body.accountNumber,
  });

  customer.save()
  .then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
        message: err.message || "Some error occurred while creating the customer."
    });
  });
};

exports.findAll = (req, res) => {
  Customer.find()
  .then(customers => {
      res.send(customers);
  }).catch(err => {
      res.status(500).send({
          message: err.message || "Some error occurred while retrieving customers."
      });
  });
};

exports.findOne = (req, res) => {
  Customer.findById(req.params.id)
  .then(customer => {
      if(!customer) {
          return res.status(404).send({
              message: "Customer not found with id " + req.params.id
          });            
      }
      res.send(customer);
  }).catch(err => {
      if(err.kind === 'ObjectId') {
          return res.status(404).send({
              message: "Customer  not found with id " + req.params.id
          });                
      }
      return res.status(500).send({
          message: "Error retrieving customer with id " + req.params.id
      });
  });
};

exports.findByID = (req, res) => {
  Customer.find({"ID_Customer" : req.params.ID_Customer})
  .then(customer => {
      if(!customer) {
          return res.status(404).send({
              message: "Customer not found with ID_Customer " + req.params.ID_Customer
          });            
      }
      res.send(customer);
  }).catch(err => {
      if(err.kind === 'ObjectId') {
          return res.status(404).send({
              message: "Customer  not found with ID_Customer " + req.params.ID_Customer
          });                
      }
      return res.status(500).send({
          message: "Error retrieving customer with ID_Customer " + req.params.ID_Customer
      });
  });
};

exports.update = (req, res) => {
  Customer.findByIdAndUpdate(req.params.id, {
    ID_Customer: req.body.ID_Customer,
    name: req.body.name,
    bank: req.body.bank,
    accountNumber: req.body.accountNumber,
  }, {new: true})
  .then(customer => {
    if(!customer) {
        return res.status(404).send({
            message: "Customer not found with id " + req.params.id
        });
    }
    res.send(customer);
  }).catch(err => {
    if(err.kind === 'ObjectId') {
        return res.status(404).send({
            message: "Customer not found with id " + req.params.id
        });                
    }
    return res.status(500).send({
        message: "Error updating customer with id " + req.params.id
    });
  });
};

exports.delete = (req, res) => {
  Customer.findByIdAndRemove(req.params.id)
  .then(customer => {
      if(!customer) {
          return res.status(404).send({
              message: "Customer not found with id " + req.params.id
          });
      }
      res.send({message: "Customer deleted successfully!"});
  }).catch(err => {
      if(err.kind === 'ObjectId' || err.name === 'NotFound') {
          return res.status(404).send({
              message: "Customer not found with id " + req.params.id
          });                
      }
      return res.status(500).send({
          message: "Could not delete Customer with id " + req.params.id
      });
  });
};
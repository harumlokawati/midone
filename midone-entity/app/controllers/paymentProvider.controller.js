const PaymentProvider = require('../models/paymentProvider.model.js');

exports.create = (req, res) => {
  const paymentProvider = new PaymentProvider({
    name: req.body.name,
  });

  paymentProvider.save()
  .then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
        message: err.message || "Some error occurred while creating the payment provider."
    });
  });
};

exports.findAll = (req, res) => {
  PaymentProvider.find()
  .then(paymentProviders => {
      res.send(paymentProviders);
  }).catch(err => {
      res.status(500).send({
          message: err.message || "Some error occurred while retrieving payment providers."
      });
  });
};

exports.findByName = (req, res) => {
  PaymentProvider.find({"name" : req.params.name})
  .then(paymentProvider => {
    if(!paymentProvider) {
        return res.status(404).send({
            message: "Payment Provider not found with name " + req.params.name
        });            
    }
    res.send(paymentProvider);
  }).catch(err => {
    if(err.kind === 'ObjectId') {
        return res.status(404).send({
            message: "Payment Provider  not found with name " + req.params.name
        });                
    }
    return res.status(500).send({
        message: "Error retrieving payment provider with name " + req.params.name
    });
  });
};

exports.findOne = (req, res) => {
  PaymentProvider.findById(req.params.id)
  .then(paymentProvider => {
      if(!paymentProvider) {
          return res.status(404).send({
              message: "Payment Provider not found with id " + req.params.id
          });            
      }
      res.send(paymentProvider);
  }).catch(err => {
      if(err.kind === 'ObjectId') {
          return res.status(404).send({
              message: "Payment Provider  not found with id " + req.params.id
          });                
      }
      return res.status(500).send({
          message: "Error retrieving payment provider with id " + req.params.id
      });
  });
};

exports.update = (req, res) => {
  PaymentProvider.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
  }, {new: true})
  .then(paymentProvider => {
    if(!paymentProvider) {
        return res.status(404).send({
            message: "Payment Provider not found with id " + req.params.id
        });
    }
    res.send(paymentProvider);
  }).catch(err => {
    if(err.kind === 'ObjectId') {
        return res.status(404).send({
            message: "Payment Provider not found with id " + req.params.id
        });                
    }
    return res.status(500).send({
        message: "Error updating payment provider with id " + req.params.id
    });
  });
};

exports.delete = (req, res) => {
  PaymentProvider.findByIdAndRemove(req.params.id)
  .then(paymentProvider => {
      if(!paymentProvider) {
          return res.status(404).send({
              message: "Payment Provider not found with id " + req.params.id
          });
      }
      res.send({message: "Payment Provider deleted successfully!"});
  }).catch(err => {
      if(err.kind === 'ObjectId' || err.name === 'NotFound') {
          return res.status(404).send({
              message: "Payment Provider not found with id " + req.params.id
          });                
      }
      return res.status(500).send({
          message: "Could not delete Payment Provider with id " + req.params.id
      });
  });
};
const PaymentMethod = require('../models/paymentMethod.model.js');

exports.create = (req, res) => {
  const paymentMethod = new PaymentMethod({
    methodName: req.body.methodName,
    paymentProviderName: req.body.paymentProviderName,
    accNumber: req.body.accNumber,
  });

  paymentMethod.save()
  .then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
        message: err.message || "Some error occurred while creating the payment method."
    });
  });
};

exports.findAll = (req, res) => {
  PaymentMethod.find()
  .then(paymentMethods => {
      res.send(paymentMethods);
  }).catch(err => {
      res.status(500).send({
          message: err.message || "Some error occurred while retrieving payment methods."
      });
  });
};

exports.findByMethod = (req, res) => {
  PaymentMethod.find({"methodName" : req.params.method})
  .then(paymentMethod => {
    if(!paymentMethod) {
        return res.status(404).send({
            message: "Payment Method not found with method " + req.params.method
        });            
    }
    res.send(paymentMethod);
  }).catch(err => {
    if(err.kind === 'ObjectId') {
        return res.status(404).send({
            message: "Payment Method  not found with method " + req.params.method
        });                
    }
    return res.status(500).send({
        message: "Error retrieving payment method with method " + req.params.method
    });
  });
};

exports.findByProvider = (req, res) => {
  PaymentMethod.find({"paymentProviderName" : req.params.provider})
  .then(paymentMethod => {
    if(!paymentMethod) {
        return res.status(404).send({
            message: "Payment Method not found with provider " + req.params.provider
        });            
    }
    res.send(paymentMethod);
  }).catch(err => {
    if(err.kind === 'ObjectId') {
        return res.status(404).send({
            message: "Payment Method  not found with provider " + req.params.provider
        });                
    }
    return res.status(500).send({
        message: "Error retrieving payment method with provider " + req.params.provider
    });
  });
};

exports.findOne = (req, res) => {
  PaymentMethod.findById(req.params.id)
  .then(paymentMethod => {
      if(!paymentMethod) {
          return res.status(404).send({
              message: "Payment Method not found with id " + req.params.id
          });            
      }
      res.send(paymentMethod);
  }).catch(err => {
      if(err.kind === 'ObjectId') {
          return res.status(404).send({
              message: "Payment Method  not found with id " + req.params.id
          });                
      }
      return res.status(500).send({
          message: "Error retrieving payment method with id " + req.params.id
      });
  });
};

exports.update = (req, res) => {
  PaymentMethod.findByIdAndUpdate(req.params.id, {
    methodName: req.body.methodName,
    paymentProviderName: req.body.paymentProviderName,
    accNumber: req.body.accNumber,
  }, {new: true})
  .then(paymentMethod => {
    if(!paymentMethod) {
        return res.status(404).send({
            message: "Payment Method not found with id " + req.params.id
        });
    }
    res.send(paymentMethod);
  }).catch(err => {
    if(err.kind === 'ObjectId') {
        return res.status(404).send({
            message: "Payment Method not found with id " + req.params.id
        });                
    }
    return res.status(500).send({
        message: "Error updating payment method with id " + req.params.id
    });
  });
};

exports.delete = (req, res) => {
  PaymentMethod.findByIdAndRemove(req.params.id)
  .then(paymentMethod => {
      if(!paymentMethod) {
          return res.status(404).send({
              message: "Payment Method not found with id " + req.params.id
          });
      }
      res.send({message: "Payment Method deleted successfully!"});
  }).catch(err => {
      if(err.kind === 'ObjectId' || err.name === 'NotFound') {
          return res.status(404).send({
              message: "Payment Method not found with id " + req.params.id
          });                
      }
      return res.status(500).send({
          message: "Could not delete Payment Method with id " + req.params.id
      });
  });
};
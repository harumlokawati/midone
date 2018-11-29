module.exports = (app) => {
  const paymentMethods = require('../controllers/paymentMethod.controller.js');

  app.post('/paymentMethod', paymentMethods.create);

  app.get('/paymentMethod', paymentMethods.findAll);

  app.get('/paymentMethod/:id', paymentMethods.findOne);

  app.get('/paymentMethodByMethod/:method', paymentMethods.findByMethod);

  app.get('/paymentMethodByProvider/:provider', paymentMethods.findByProvider);

  app.put('/paymentMethod/:id', paymentMethods.update);

  app.delete('/paymentMethod/:id', paymentMethods.delete);
}
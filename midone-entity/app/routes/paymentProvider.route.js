module.exports = (app) => {
  const paymentProviders = require('../controllers/paymentProvider.controller.js');

  app.post('/paymentProvider', paymentProviders.create);

  app.get('/paymentProvider', paymentProviders.findAll);

  app.get('/paymentProvider/:id', paymentProviders.findOne);

  app.get('/paymentProviderByName/:name', paymentProviders.findByName);

  app.put('/paymentProvider/:id', paymentProviders.update);

  app.delete('/paymentProvider/:id', paymentProviders.delete);

}
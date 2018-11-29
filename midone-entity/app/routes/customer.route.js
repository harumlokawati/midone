module.exports = (app) => {
  const customers = require('../controllers/customer.controller.js');

  app.post('/customer', customers.create);

  app.get('/customer', customers.findAll);

  app.get('/customer/:id', customers.findOne);

  app.get('/customerByID/:ID_Customer', customers.findByID);

  app.put('/customer/:id', customers.update);

  app.delete('/customer/:id', customers.delete);
}
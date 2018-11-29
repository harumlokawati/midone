module.exports = (app) => {
  const invoices = require('../controllers/invoice.controller.js');

  app.post('/invoice', invoices.create);

  app.get('/invoice', invoices.findAll);

  app.get('/invoice/:id', invoices.findOne);

  app.put('/invoice/:id', invoices.update);

  app.delete('/invoice/:id', invoices.delete);
}
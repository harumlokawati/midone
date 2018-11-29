module.exports = (app) => {
  const transactions = require('../controllers/transaction.controller.js');

  app.post('/transaction', transactions.create);

  app.get('/transaction', transactions.findAll);

  app.get('/transaction/:id', transactions.findOne);

  app.put('/transaction/:id', transactions.update);
  app.put('/transactionstatus/:id', transactions.updateStatus);

  app.delete('/transaction/:id', transactions.delete);
}
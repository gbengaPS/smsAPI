const express = require('express');
const router = require('./server/routes');

const app = express();
app.use(express.urlencoded());
app.use(express.json());
app.use('/api/v1', router);

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to SMS API' });
});

app.all('*', (req, res) => {
  res.status(404).json({ message: 'Route does not exist' });
});
const port = process.env.PORT || 3000;
if (require.main === module) {
  app.listen(port, () => {
    console.log(`App listening on Port ${port}`);
  });
}

module.exports = app;

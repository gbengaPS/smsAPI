const express = require('express');

const app = express();
app.use(express.urlencoded());

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to SMS API' });
});

const port = process.env.PORT || 3000;
app.listen(3000, () => {
  console.log(`App listening on Port ${port}`);
});

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const breedRouter = require('./api/breedRouter');

const app = express();

app.use(helmet());
app.use(cors());

app.use('/breeds', breedRouter);

app.listen(3001, () => {
  console.log('listening on port 3001');
});

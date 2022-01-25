const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const breedRouter = require('./api/breedRouter');
const config = require('./config/config');

const app = express();

app.use(helmet());
app.use(cors());

app.use('/breeds', breedRouter);

app.listen(config.localPort, () => {
  console.log(`listening on port ${config.localPort}`);
});

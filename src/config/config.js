const dotenv = require('dotenv');

dotenv.config();

const config = {
  catApi: {
    url: process.env.CAT_API_URL,
    accessKey: process.env.CAT_API_ACCESS_KEY,
  },
  localPort: process.env.LOCAL_PORT,
};

module.exports = config;

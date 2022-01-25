const axios = require('axios');
const config = require('../config/config');

async function getBreeds() {
  try {
    const headers = {
      headers: {
        'X-API-KEY': config.catApi.accessKey,
      },
    };
    const response = await axios.get(`${config.catApi.url}/v1/breeds`, headers);
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
}

module.exports = {
  getBreeds,
};

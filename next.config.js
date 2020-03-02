const dotenv = require('dotenv');
const withCSS = require('@zeit/next-css');

dotenv.config();

module.exports = withCSS({
  env: {
    API_URL: process.env.API_URL,
  },
});

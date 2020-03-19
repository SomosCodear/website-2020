const dotenv = require('dotenv');
const withSourceMaps = require('@zeit/next-source-maps');
const withCSS = require('@zeit/next-css');

dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = withSourceMaps(withCSS({
  target: 'serverless',
  env: {
    API_URL: process.env.API_URL,
    SENTRY_DSN: process.env.SENTRY_DSN,
  },
}));

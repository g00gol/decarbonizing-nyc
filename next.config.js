require("dotenv").config();
const webpack = require("webpack");

module.exports = {
  webpack: (config) => {
    config.plugins.push(
      new webpack.ProvidePlugin({
        "process.env.GMAPS_API_KEY": "AIzaSyB8LTpCq1N5PKUGZ1g6WC_yA_ZCR9C3UJk",
        "process.env.SOCRATA_API_KEY": "FrFcyaxEQhBU3ezjpysQbAWUZ",
      })
    );
    return config;
  },
  env: {
    GMAPS_API_KEY: process.env.GMAPS_API_KEY,
    SOCRATA_API_KEY: process.env.SOCRATA_API_KEY,
  },
};

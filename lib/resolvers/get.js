'use strict';

const lodash = require('lodash');

module.exports = {
  resolve: (value, config) => {
    return lodash.get(config, value);
  }
};

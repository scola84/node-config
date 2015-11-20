'use strict';

const fs = require('fs');

module.exports = {
  resolve: (value) => {
    return JSON.parse(fs.readFileSync(value));
  }
};

'use strict';

const fs = require('fs');

module.exports = {
  resolve: (value) => {
    return fs.readFileSync(value);
  }
};

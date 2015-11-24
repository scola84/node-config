'use strict';

const fs = require('fs');
const lodash = require('lodash');

class Configuration {
  constructor() {
    this.config = {};
  }

  load(file) {
    lodash.assign(this.config, JSON.parse(fs.readFileSync(file)));
    return this;
  }

  get(key) {
    return lodash.get(this.config, key);
  }
}

module.exports = Configuration;

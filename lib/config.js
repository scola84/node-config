'use strict';

const fs = require('fs');
const get = require('lodash.get');

class Configuration {
  constructor() {
    this.config = {};
  }

  loadObject(config) {
    this.config = config;
    return this;
  }

  load(file) {
    Object.assign(this.config, JSON.parse(fs.readFileSync(file)));
    return this;
  }

  get(key) {
    return get(this.config, key);
  }
}

module.exports = Configuration;

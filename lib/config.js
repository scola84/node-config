'use strict';

const fs = require('fs');
const http = require('http');
const get = require('lodash.get');

class Configuration {
  constructor() {
    this.config = {};
  }

  loadFile(file) {
    Object.assign(this.config, JSON.parse(fs.readFileSync(file)));
    return this;
  }

  loadObject(config) {
    Object.assign(this.config, config);
    return this;
  }

  loadUrl(url) {
    return new Promise((resolve, reject) => {
      http.get(url, (response) => {
        if (response.statusCode !== 200) {
          return reject(new Error(response.statusCode));
        }

        response.on('data', (data) => {
          Object.assign(this.config, JSON.parse(data));
          resolve();
        });
      });
    });
  }

  get(key) {
    return get(this.config, key);
  }
}

module.exports = Configuration;

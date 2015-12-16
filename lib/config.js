'use strict';

const fs = require('fs');
const http = require('http');
const lodashGet = require('lodash.get');
const lodashMerge = require('lodash.merge');

class Configuration {
  constructor() {
    this.values = {};
  }

  loadFile(file) {
    return new Promise((resolve) => {
      lodashMerge(
        this.values,
        JSON.parse(fs.readFileSync(file))
      );

      resolve();
    });
  }

  loadObject(values) {
    return new Promise((resolve) => {
      lodashMerge(this.values, values);
      resolve();
    });
  }

  loadUrl(url) {
    return new Promise((resolve, reject) => {
      http.get(url, (response) => {
        if (response.statusCode !== 200) {
          return reject({
            error: new Error(response.statusCode)
          });
        }

        response.on('data', (data) => {
          lodashMerge(this.values, JSON.parse(data));
          resolve();
        });
      });
    });
  }

  get(key) {
    return lodashGet(this.values, key);
  }
}

module.exports = Configuration;

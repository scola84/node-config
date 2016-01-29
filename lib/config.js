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
      fs.readFile(file, (error, data) => {
        if (error) {
          return reject({
            error
          });
        }

        lodashMerge(this.values, JSON.parse(data));
        resolve(this);
      });
    });
  }

  loadObject(values) {
    return new Promise((resolve) => {
      lodashMerge(this.values, values);
      resolve(this);
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
          resolve(this);
        });
      });
    });
  }

  get(key) {
    return lodashGet(this.values, key);
  }
}

module.exports = Configuration;

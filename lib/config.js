'use strict';

const fs = require('fs');
const lodash = require('lodash');
const resolvers = require('./resolvers');

class Configuration {
  constructor() {
    this.config = {};
  }

  load(file) {
    const imported = JSON.parse(fs.readFileSync(file));
    lodash.assign(this.config, this.resolve(imported, imported));
    
    return this;
  }

  resolve(part, full) {
    Object.keys(part).forEach((key) => {
      if (lodash.isString(part[key])) {
        if (part[key].slice(0, 8) === 'resolve-') {
          const [type, value] = part[key].split(':');
          part[key] = resolvers[type.slice(8)].resolve(value, full);
        }
      } else if (lodash.isObject(part[key])) {
        part[key] = this.resolve(part[key], full);
      }
    });

    return part;
  }

  get(key) {
    return lodash.get(this.config, key);
  }
}

module.exports = Configuration;

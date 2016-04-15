"use strict";

export default class CamelScoreModels {
  constructor(config) {
    this._config = config;
    this._reverseConfig = CamelScoreModels.reverseConfig(config);

    this.config = this._config;
    this.mode = 'serialize';
  }

  static reverseConfig(config) {
    let reverseConfig = {
      fields: {}
    };

    for (const field in config.fields) {
      if (config.fields.hasOwnProperty(field)) {
        const props = config.fields[field];
        reverseConfig.fields[props.to] = Object.assign(props, { to: field });
      }
    }

    return reverseConfig;
  }

  _perform(obj) {
    let copy;

    // Handle the 3 simple types, and null or undefined
    if (obj == null || typeof obj != "object") {
      return obj;
    }

    // Handle Date
    if (obj instanceof Date) {
      copy = new Date();
      copy.setTime(obj.getTime());
      return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
      copy = [];
      for (var i = 0, len = obj.length; i < len; i++) {
        copy[i] = this[this.mode](obj[i]);
      }
      return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
      copy = {};
      for (let key in obj) {
        if (!obj.hasOwnProperty(key)) continue;

        let field, newKey;

        if (this.config && this.config.fields && this.config.fields[key]) {
          field = this.config.fields[key];
        }

        if (field && field.to) {
          newKey = field.to;
        } else {
          newKey = key;
        }

        if (field && field.model && field.model instanceof CamelScoreModels) {
          copy[newKey] = field.model[this.mode](obj[key]);
        } else {
          copy[newKey] = this._perform(obj[key]);
        }
      }
      return copy;
    }
  }

  serialize(obj) {
    this.config = this._config;
    this.mode = 'serialize';

    return this._perform(obj);
  }

  unserialize(obj) {
    this.config = this._reverseConfig;
    this.mode = 'unserialize';

    return this._perform(obj);
  }
}

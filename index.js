"use strict";

import camelscore from 'camelscore';

export default class CamelScoreModels {
  constructor(config) {
    this.config = config;
    this.r_config = CamelScoreModels.reverseConfig(config);
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

  serialize(obj) {
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
        copy[i] = this.serialize(obj[i]);
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
        } else if (1) {
          newKey = camelscore.camelCase(key);
        } else {
          newKey = key;
        }

        if (field && field.model && field.model instanceof CamelScoreModels) {
          copy[newKey] = field.model.serialize(obj[key]);
        } else {
          copy[newKey] = this.serialize(obj[key]);
        }
      }
      return copy;
    }
  }

  unserialize(obj) {
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
        copy[i] = this.unserialize(obj[i]);
      }
      return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
      copy = {};
      for (let key in obj) {
        if (!obj.hasOwnProperty(key)) continue;

        let field, newKey;

        if (this.r_config && this.r_config.fields && this.r_config.fields[key]) {
          field = this.r_config.fields[key];
        }

        if (field && field.to) {
          newKey = field.to;
        } else if (1) {
          newKey = camelscore.underscore(key);
        } else {
          newKey = key;
        }

        if (field && field.model && field.model instanceof CamelScoreModels) {
          copy[newKey] = field.model.unserialize(obj[key]);
        } else {
          copy[newKey] = this.unserialize(obj[key]);
        }
      }
      return copy;
    }
  }
}

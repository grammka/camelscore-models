"use strict";

import camelscore from 'camelscore';

export default class CamelScoreModels {
  constructor(config) {
    const defaultOptions = {
      plugins: {
        camelScore: true
      }
    };

    this.config = config;
    this.r_config = CamelScoreModels.reverseConfig(config);
    this.options = { ...defaultOptions, ...(config.options || {}) };
  }

  static reverseConfig(config) {
    let reverseConfig = {
      fields: {}
    };

    for (const field in config.fields) {
      if (config.fields.hasOwnProperty(field)) {
        const props = config.fields[field];

        if (props.to) {
          reverseConfig.fields[props.to] = { ...props, to: field };
        } else {
          reverseConfig.fields[field] = props;
        }
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
        } else if (this.options.plugins.camelScore) {
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
        } else if (this.options.plugins.camelScore) {
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

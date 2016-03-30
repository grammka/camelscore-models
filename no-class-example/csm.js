"use strict";

exports = module.exports = function serialize(obj) {
  let config = this;
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
      copy[i] = serialize(obj[i]);
    }
    return copy;
  }

  // Handle Object
  if (obj instanceof Object) {
    copy = {};
    for (let key in obj) {
      if (!obj.hasOwnProperty(key)) continue;

      let field, newKey;

      if (config && config.fields && config.fields[key]) {
        field = config.fields[key];
      }

      if (field && field.to) {
        newKey = field.to;
      } else {
        newKey = key;
      }

      if (field && field.model) {
        copy[newKey] = new field.model(obj[key]);
      } else {
        copy[newKey] = serialize(obj[key]);
      }
    }
    return copy;
  }
};

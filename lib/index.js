"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _camelscore = require("camelscore");

var _camelscore2 = _interopRequireDefault(_camelscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CamelScoreModels = function () {
  function CamelScoreModels(config) {
    _classCallCheck(this, CamelScoreModels);

    var defaultOptions = {
      plugins: {
        camelScore: true
      }
    };

    this.config = config;
    this.r_config = CamelScoreModels.reverseConfig(config);
    this.options = _extends({}, defaultOptions, config.options || {});
  }

  _createClass(CamelScoreModels, [{
    key: "serialize",
    value: function serialize(obj) {
      var copy = void 0;

      // Handle the 3 simple types, and null or undefined
      if (obj == null || (typeof obj === "undefined" ? "undefined" : _typeof(obj)) != "object") {
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
        for (var key in obj) {
          if (!obj.hasOwnProperty(key)) continue;

          var field = void 0,
              newKey = void 0;

          if (this.config && this.config.fields && this.config.fields[key]) {
            field = this.config.fields[key];
          }

          if (field && field.to) {
            newKey = field.to;
          } else if (this.options.plugins.camelScore) {
            newKey = _camelscore2.default.camelCase(key);
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
  }, {
    key: "unserialize",
    value: function unserialize(obj) {
      var copy = void 0;

      // Handle the 3 simple types, and null or undefined
      if (obj == null || (typeof obj === "undefined" ? "undefined" : _typeof(obj)) != "object") {
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
        for (var key in obj) {
          if (!obj.hasOwnProperty(key)) continue;

          var field = void 0,
              newKey = void 0;

          if (this.r_config && this.r_config.fields && this.r_config.fields[key]) {
            field = this.r_config.fields[key];
          }

          if (field && field.to) {
            newKey = field.to;
          } else if (this.options.plugins.camelScore) {
            newKey = _camelscore2.default.underscore(key);
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
  }], [{
    key: "reverseConfig",
    value: function reverseConfig(config) {
      var reverseConfig = {
        fields: {}
      };

      for (var field in config.fields) {
        if (config.fields.hasOwnProperty(field)) {
          var props = config.fields[field];

          if (props.to) {
            reverseConfig.fields[props.to] = _extends({}, props, { to: field });
          } else {
            reverseConfig.fields[field] = props;
          }
        }
      }

      return reverseConfig;
    }
  }]);

  return CamelScoreModels;
}();

exports.default = CamelScoreModels;
/*!
 * FlyJson ES5 v1.9.1 [Browser]
 * https://github.com/aalfiann/fly-json-odm
 *
 * Copyright 2019 M ABD AZIZ ALFIAN
 * Released under the MIT license
 * https://github.com/aalfiann/fly-json-odm/blob/master/LICENSE
 */
"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }
function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }
function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }
function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _sortBy = Symbol('_sortBy');
var Helper = function () {
  function Helper() {
    _classCallCheck(this, Helper);
  }
  _createClass(Helper, [{
    key: "isString", value: function isString(value) {
      return typeof value === 'string' || _instanceof(value, String);
    }
  }, {
    key: "isInteger", value: function isInteger(value) {
      return Number.isInteger(value);
    }
  }, {
    key: "isBoolean", value: function isBoolean(value) {
      return typeof value === 'boolean' || _typeof(value) === 'object' && value !== null && typeof value.valueOf() === 'boolean';
    }
  }, {
    key: "isArray", value: function isArray(value) {
      return value && _typeof(value) === 'object' && value.constructor === Array;
    }
  }, {
    key: "isObject", value: function isObject(value) {
      return value && _typeof(value) === 'object' && value.constructor === Object;
    }
  }, {
    key: "isEmpty", value: function isEmpty(value) {
      return value === undefined || value === null || value === '';
    }
  }, {
    key: "isEmptyArray", value: function isEmptyArray(value) {
      return value === undefined || value === null || value.length == 0;
    }
  }, {
    key: "isEmptyObject", value: function isEmptyObject(value) {
      return value === undefined || value === null || Object.keys(value).length === 0 && value.constructor === Object;
    }
  }, {
    key: "foreach", value: function foreach(data, callback) {
      if (this.isObject(data)) {
        var keys = Object.keys(data);
        var values = Object.keys(data).map(function (e) {
          return data[e];
        });
        var i = 0,l = keys.length;
        for (i; i < l; i++) {
          callback(values[i], keys[i]);
        }
      } else {
        if (Array.isArray(data)) {
          var i = 0,l = data.length;
          for (i; i < l; i++) {
            callback(data[i], i);
          }
        } else {
          throw new Error('Failed to iteration. Data is not an array or object.');
        }
      }
    }
  }, {
    key: "blockingTest", value: function blockingTest() {
      var ms = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1000;
      var start = Date.now();
      var time = start + ms;
      while (Date.now() < time) {};
      return start;
    }
  }, {
    key: "safeStringify", value: function safeStringify(value, space) {
      var cache = [];
      var output = JSON.stringify(value, function (key, value) {
        if (key && key.length > 0 && (key.charAt(0) === "$" || key.charAt(0) === "_")) {
          return;
        }
        if (_typeof(value) === 'object' && value !== null) {
          if (cache.indexOf(value) !== -1) {
            return;
          }
          cache.push(value);
        }
        return value;
      }, space);
      cache = null;
      return output;
    }
  }, {
    key: "shallowClone", value: function shallowClone(array) {
      return _toConsumableArray(array);
    }
  }, {
    key: "deepClone", value: function deepClone(array) {
      var clone, i;
      if (_typeof(array) !== 'object' || !array) return array;
      if ('[object Array]' === Object.prototype.toString.apply(array)) {
        clone = [];
        var len = array.length;
        for (i = 0; i < len; i++) {
          clone[i] = this.deepClone(array[i]);
        }
        return clone;
      }
      clone = {};
      for (i in array) {
        if (array.hasOwnProperty(i)) clone[i] = this.deepClone(array[i]);
      }
      return clone;
    }
  }, {
    key: "jsonTransform", value: function jsonTransform(data, map) {
      var helper = new Helper();
      return {
        defaultOrNull: function defaultOrNull(key) {
          return key && map.defaults ? map.defaults[key] : null;
        },
        getValue: function getValue(obj, key, newKey) {
          if (typeof obj === 'undefined') {
            return;
          }
          if (key === undefined || key === null || key === '') {
            return obj;
          }
          var value = obj;
          var keys = null;
          keys = key.split('.');
          var i = 0;
          var l = keys.length;
          for (i; i < l; i++) {
            if (typeof value !== "undefined" && keys[i] in value) {
              value = value[keys[i]];
            } else {
              return this.defaultOrNull(newKey);
            }
          }
          return value;
        },
        setValue: function setValue(obj, key, newValue) {
          if (typeof obj === "undefined" || key == '' || key == undefined || key == null) {
            return;
          }
          var keys = key.split('.');
          var target = obj;
          var i = 0;
          var l = keys.length;
          for (i; i < l; i++) {
            if (i === keys.length - 1) {
              target[keys[i]] = newValue;
              return;
            }
            if (keys[i] in target) {
              target = target[keys[i]];
            } else {
              return;
            }
          }
        },
        getList: function getList() {
          return this.getValue(data, map.list);
        },
        make: function make(context) {
          var value = this.getValue(data, map.list);
          var normalized = [];
          if (!helper.isEmptyObject(value)) {
            var list = this.getList();
            normalized = map.item ? list.map(this.iterator.bind(this, map.item)) : list;
            normalized = this.operate.bind(this, normalized)(context);
            normalized = this.each(normalized, context);
            normalized = this.removeAll(normalized);
          }
          return normalized;
        },
        removeAll: function removeAll(data) {
          if (Array.isArray(map.remove)) {
            helper.foreach(data, this.remove);
          }
          return data;
        },
        remove: function remove(item) {
          var i = 0;
          var l = map.remove.length;
          for (i; i < l; i++) {
            delete item[map.remove[i]];
          }
          return item;
        },
        operate: function operate(data, context) {
          if (map.operate) {
            helper.foreach(map.operate, function (method) {
              data = data.map(function (item) {
                var fn;
                if ('string' === typeof method.run) {
                  fn = eval(method.run);
                } else {
                  fn = method.run;
                }
                this.setValue(item, method.on, fn(this.getValue(item, method.on), context));
                return item;
              }.bind(this));
            }.bind(this));
          }
          return data;
        },
        each: function each(data, context) {
          if (map.each) {
            data.forEach(function (value, index, collection) {
              return map.each(value, index, collection, context);
            });
          }
          return data;
        },
        iterator: function iterator(map, item) {
          var obj = {};
          if (typeof map === 'string') {
            return this.getValue(item, map);
          }
          helper.foreach(map, function (oldkey, newkey) {
            if (typeof oldkey === 'string' && oldkey.length > 0) {
              obj[newkey] = this.getValue(item, oldkey, newkey);
            } else if (Array.isArray(oldkey)) {
              var array = oldkey.map(function (item, map) {
                return this.iterator(map, item);
              }.bind(this, item));
              obj[newkey] = array;
            } else if (_typeof(oldkey) === 'object') {
              var bound = this.iterator.bind(this, oldkey, item);
              obj[newkey] = bound();
            } else {
              obj[newkey] = "";
            }
          }.bind(this));
          return obj;
        }
      };
    }
  }]);
  return Helper;
}();
var FlyJson = function (_Helper) {
  _inherits(FlyJson, _Helper);
  function FlyJson() {
    var _this;
    _classCallCheck(this, FlyJson);
    _this = _possibleConstructorReturn(this, _getPrototypeOf(FlyJson).call(this));
    _this.data1 = [];
    _this.data2 = [];
    _this.query = [];
    _this.result = [];
    return _this;
  }
  _createClass(FlyJson, [{
    key: _sortBy, value: function value(field, reverse, primer) {
      var key = primer ? function (x) {
        return primer(x[field]);
      } : function (x) {
        return x[field];
      };
      reverse = !reverse ? 1 : -1;
      return function (a, b) {
        return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
      };
    }
  }, {
    key: "setMode", value: function setMode(name) {
      this.mode = name.toString().toLowerCase();
      return this;
    }
  }, {
    key: "set", value: function set(data) {
      if (this.isArray(data)) {
        if (this.mode === 'shallow') {
          this.data1 = this.shallowClone(data);
        } else {
          this.data1 = this.deepClone(data);
        }
      } else {
        throw new Error('Set data must be an array contains object.');
      }
      return this;
    }
  }, {
    key: "insert", value: function insert(obj) {
      if (this.isObject(obj) && !this.isEmptyObject(obj)) {
        this.data1.push(obj);
      } else {
        throw new Error('New value must be an object and not empty');
      }
      return this;
    }
  }, {
    key: "insertMany", value: function insertMany(data) {
      if (this.isArray(data)) {
        var l = data.length;
        for (var i = 0; i < l; i++) {
          if (this.isObject(data[i]) && !this.isEmptyObject(data[i])) {
            this.data1.push(data[i]);
          } else {
            throw new Error('New value must be an object and not empty');
          }
        }
      } else {
        throw new Error('Data must be an array object');
      }
      return this;
    }
  }, {
    key: "update", value: function update(key, value, obj) {
      if (this.isEmpty(key) || this.isEmpty(value)) {
        throw new Error('Key and Value must be defined and value must be unique');
      }
      if (!this.isObject(obj) || this.isEmptyObject(obj)) {
        throw new Error('New value must be an object and not empty');
      }
      var l = this.data1.length;
      for (var i = 0; i < l; i++) {
        if (this.data1[i][key] === value) {
          this.data1.splice(i, 1);
          this.data1.push(Object.assign(_defineProperty({}, key, value), obj));
          break;
        }
      }
      return this;
    }
  }, {
    key: "updateMany", value: function updateMany(key, data) {
      if (this.isEmpty(key) || !this.isString(key)) {
        throw new Error('Key and Value must be defined and value must be unique');
      }
      if (this.isEmptyArray(data) || !this.isArray(data)) {
        throw new Error('Data to update must be an array object and not empty');
      }
      var l = this.data1.length;
      var len = data.length;
      var newdata = [];
      var result = undefined;
      for (var i = 0; i < l; i++) {
        result = false;
        for (var x = 0; x < len; x++) {
          if (this.data1[i][key] === data[x][key]) {
            result = true;
            newdata.push(data[x]);
          }
        }
        if (result === false) {
          newdata.push(this.data1[i]);
        }
      }
      this.data1 = newdata;
      return this;
    }
  }, {
    key: "modify", value: function modify(key, value, obj) {
      if (this.isEmpty(key) || this.isEmpty(value)) {
        throw new Error('Key and Value must be defined and value must be unique');
      }
      if (!this.isObject(obj) || this.isEmptyObject(obj)) {
        throw new Error('New value must be an object and not empty');
      }
      var l = this.data1.length;
      var data = undefined;
      for (var i = 0; i < l; i++) {
        if (this.data1[i][key] === value) {
          data = this.data1[i];
          this.data1.splice(i, 1);
          this.data1.push(Object.assign(_defineProperty({}, key, value), data, obj));
          break;
        }
      }
      return this;
    }
  }, {
    key: "modifyMany", value: function modifyMany(key, data) {
      if (this.isEmpty(key) || !this.isString(key)) {
        throw new Error('Key must be defined');
      }
      if (this.isEmptyArray(data) || !this.isArray(data)) {
        throw new Error('Data to modify must be an array object and not empty');
      }
      if (this.mode === "shallow") {
        throw new Error('Shallow mode is not allowed for modifyMany!');
      }
      var l = this.data1.length;
      var len = data.length;
      var newdata = [];
      var old, result = undefined;
      for (var i = 0; i < l; i++) {
        result = false;
        for (var x = 0; x < len; x++) {
          if (this.data1[i][key] === data[x][key]) {
            result = true;
            old = this.data1[i];
            newdata.push(Object.assign(old, data[x]));
          }
        }
        if (result === false) {
          newdata.push(this.data1[i]);
        }
      }
      this.data1 = newdata;
      return this;
    }
  }, {
    key: "delete", value: function _delete(key, value) {
      if (!this.isEmpty(key) && !this.isEmpty(value)) {
        var l = this.data1.length;
        for (var i = 0; i < l; i++) {
          if (this.data1[i][key] === value) {
            this.data1.splice(i, 1);
            break;
          }
        }
      } else {
        throw new Error('Key and Value must be defined also remember that Value must be unique.');
      }
      return this;
    }
  }, {
    key: "deleteMany", value: function deleteMany(key, data) {
      if (!this.isEmpty(key) && !this.isEmptyArray(data)) {
        var l = this.data1.length;
        var len = data.length;
        var newdata = [];
        var result = false;
        for (var i = 0; i < l; i++) {
          result = false;
          for (var x = 0; x < len; x++) {
            if (this.data1[i][key] === data[x]) {
              result = true;
            }
          }
          if (result === false) {
            newdata.push(this.data1[i]);
          }
        }
        this.data1 = newdata;
      } else {
        throw new Error('Key and Data array of key value must be defined.');
      }
      return this;
    }
  }, {
    key: "select", value: function select(key) {
      if (!this.isEmpty(key) && this.isArray(key) && !this.isEmptyArray(key)) {
        var newdata = [];
        var res = undefined;
        var l = this.data1.length;
        var dl = key.length;
        for (var i = 0; i < l; i++) {
          res = {};
          for (var x = 0; x < dl; x++) {
            if (this.data1[i][key[x]] != undefined) {
              res[key[x]] = this.data1[i][key[x]];
            }
          }
          newdata.push(res);
        }
        this.data1 = newdata;
      }
      return this;
    }
  }, {
    key: "where", value: function where() {
      if (!this.isEmpty(arguments.length <= 0 ? undefined : arguments[0]) && this.isString(arguments.length <= 0 ? undefined : arguments[0]) && (arguments.length <= 1 ? undefined : arguments[1]) != undefined) {
        var c = true;
        if (arguments.length > 2) {
          var mid = arguments.length <= 1 ? undefined : arguments[1];
          var a = arguments.length <= 0 ? undefined : arguments[0];
          var b = arguments.length <= 2 ? undefined : arguments[2];
          if (!this.isEmpty(arguments.length <= 3 ? undefined : arguments[3])) c = arguments.length <= 3 ? undefined : arguments[3];
        } else {
          var mid = '===';
          var a = arguments.length <= 0 ? undefined : arguments[0];
          var b = arguments.length <= 1 ? undefined : arguments[1];
          c = true;
        }
        mid = mid.toString().toLowerCase();
        var search = _defineProperty({}, a, b);
        var v, s = undefined;
        var self = this;
        var data = this.data1.filter(function (o) {
          return Object.keys(search).every(function (k) {
            v = o[k];
            s = search[k];
            if (c === false && mid !== 'regex') {
              if (!self.isObject(o[k])) {
                v = o[k].toString().toLowerCase();
              }
              s = search[k].toString().toLowerCase();
            }
            switch (mid) {
              case '=':
                return v == s;
              case '!==':
                return v !== s;
              case '==':
                return v == s;
              case '!=':
                return v != s;
              case '>':
                return v > s;
              case '>=':
                return v >= s;
              case '<':
                return v < s;
              case '<=':
                return v <= s;
              case 'in':
                if (self.isString(v)) {
                  return v.indexOf(s) !== -1;
                }
                var result = [];
                self.foreach(v, function (value) {
                  if (c) {
                    if (value === s) {
                      result.push(value);
                    }
                  } else {
                    if (self.isString(value)) {
                      value = value.toLowerCase();
                    }

                    if (value === s) {
                      result.push(value);
                    }
                  }
                });
                return result.length > 0;
              case 'not':
                return v !== s;
              case 'like':
                return v.indexOf(s) !== -1;
              case 'not like':
                return v.indexOf(s) === -1;
              case 'regex':
                return s.test(v);
              case 'function':
                return s(v);
              default:
                return v === s;
            }
          });
        });
        if (this.scope === 'query') {
          this.result = data;
        } else {
          this.data1 = data;
        }
      }
      return this;
    }
  }, {
    key: "begin", value: function begin() {
      this.scope = 'query';
      return this;
    }
  }, {
    key: "or", value: function or() {
      if (this.scope === 'query') {
        var l = this.result.length;
        for (var i = 0; i < l; i++) {
          this.query.push(this.result[i]);
        }
      }
      return this;
    }
  }, {
    key: "end", value: function end() {
      if (this.scope === 'query') {
        var l = this.result.length;
        for (var i = 0; i < l; i++) {
          this.query.push(this.result[i]);
        }
        this.data1 = this.query;
        this.query = [];
        this.result = [];
        this.scope = '';
      }
      return this;
    }
  }, {
    key: "clean", value: function clean() {
      this.data1 = [];
      this.data2 = [];
      this.query = [];
      this.result = [];
      this.metadata = {};
      this.scope = '';
      this.mode = '';
      this.name = '';
      return this;
    }
  }, {
    key: "join", value: function join(name, data) {
      if (!this.isEmpty(name) && this.isString(name)) {
        if (this.isArray(data)) {
          if (this.mode === 'shallow') {
            this.data2 = this.shallowClone(data);
          } else {
            this.data2 = this.deepClone(data);
          }
          this.name = name;
          this.scope = 'join';
        } else {
          throw new Error('Data must be an array object.');
        }
      } else {
        throw new Error('Name is required and it must be string.');
      }
      return this;
    }
  }, {
    key: "merge", value: function merge(a, b) {
      if (this.scope === 'join') {
        if (!this.isEmpty(a) && this.isString(a)) {
          if (!this.isEmpty(b) && this.isString(b)) {
            var indexB = this.data2.reduce(function (result, item) {
              result[item[b]] = item;
              return result;
            }, {});
            this.scope = '';
            this.data1 = this.data1.map(function (item) {
              return Object.assign(item, indexB[item[a]]);
            });
          } else {
            throw new Error('Unique indentifier key for table 2 is required.');
          }
        } else {
          throw new Error('Unique indentifier key for table 1 is required.');
        }
      } else {
        throw new Error('You should join first before doing merge.');
      }
      return this;
    }
  }, {
    key: "on", value: function on(a, b) {
      var self = this;
      if (self.scope === 'join') {
        if (!this.isEmpty(a) && this.isString(a)) {
          if (!this.isEmpty(b) && this.isString(b)) {
            var indexB = self.data2.reduce(function (result, item) {
              result[item[b]] = item;
              return result;
            }, {});
            var result = [];
            self.data1.map(function (value, index) {
              var newdata = {};
              var arr = Object.keys(self.data1[index]);
              var l = arr.length;
              for (var i = 0; i < l; i++) {
                if (arr[i] === a) {
                  if (self.name === arr[i]) {
                    newdata[arr[i]] = indexB[self.data1[index][arr[i]]];
                  } else {
                    newdata[self.name] = indexB[self.data1[index][arr[i]]];
                    newdata[arr[i]] = value[arr[i]];
                  }
                } else {
                  newdata[arr[i]] = value[arr[i]];
                }
              }
              result.push(newdata);
            });
            self.scope = '';
            self.data1 = result;
          } else {
            throw new Error('Unique indentifier key for table 2 is required.');
          }
        } else {
          throw new Error('Unique indentifier key for table 1 is required.');
        }
      } else {
        throw new Error('You should join first before doing join on.');
      }
      return this;
    }
  }, {
    key: "orderBy", value: function orderBy(name) {
      var desc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var primer = arguments.length > 2 ? arguments[2] : undefined;
      if (!this.isEmpty(name) && this.isString(name) && this.isBoolean(desc)) {
        this.data1.sort(this[_sortBy](name, desc, primer));
      }
      return this;
    }
  }, {
    key: "groupDetail", value: function groupDetail(name) {
      var groupName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      if (this.isEmpty(name) || !this.isString(name)) {
        throw new Error('name is required and must be string.');
      }
      if (!this.isString(groupName)) {
        throw new Error('group name must be string.');
      }
      var data = this.data1.reduce(function (objectsByKeyValue, obj) {
        var value = obj[name];
        objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
        return objectsByKeyValue;
      }, {});
      var group = [];
      if (groupName) {
        group.push(_defineProperty({}, groupName, data));
      } else {
        group.push(_defineProperty({}, name, data));
      }
      this.data1 = group;
      return this;
    }
  }, {
    key: "groupBy", value: function groupBy(name) {
      var sumField = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      if (this.isEmpty(name) || !this.isString(name)) {
        throw new Error('name is required and must be string.');
      }
      if (!this.isArray(sumField)) {
        throw new Error('field name for sum must be array.');
      }
      var l = sumField.length;
      var data = this.data1.reduce(function (res, obj) {
        obj.item_count = 1;
        if (!(obj[name] in res)) {
          res.__array.push(res[obj[name]] = obj);
        } else {
          for (var i = 0; i < l; i++) {
            res[obj[name]][sumField[i]] += obj[sumField[i]];
          }
          res[obj[name]]['item_count'] += 1;
        }
        for (var i = 0; i < l; i++) {
          res[obj[name]]['average_' + sumField[i]] = res[obj[name]][sumField[i]] / res[obj[name]]['item_count'];
        }
        return res;
      }, {
        __array: []
      });
      this.data1 = data.__array;
      return this;
    }
  }, {
    key: "skip", value: function skip(size) {
      if (!this.isEmpty(size) && this.isInteger(size)) {
        this.data1 = this.data1.slice(size);
      }
      return this;
    }
  }, {
    key: "take", value: function take(size) {
      if (!this.isEmpty(size)) {
        size = parseInt(size);
        if (this.isInteger(size)) {
          this.data1.length = size;
        }
      }
      return this;
    }
  }, {
    key: "paginate", value: function paginate(page, page_size) {
      if (!this.isEmpty(page) && !this.isEmpty(page_size)) {
        page = parseInt(page);
        page_size = parseInt(page_size);
        if (this.isInteger(page) && this.isInteger(page_size)) {
          var count = this.data1.length;
          --page;
          this.data1 = this.data1.slice(page * page_size, (page + 1) * page_size);
          this.metadata = {
            page: page + 1,
            page_size: page_size,
            total_page: Math.ceil(count / page_size),
            total_records: count
          };
        }
      }
      return this;
    }
  }, {
    key: "promisify", value: function promisify(fn) {
      var self = this;
      return new Promise(function (resolve, reject) {
        try {
          resolve(fn.call(self, self));
        } catch (err) {
          reject(err);
        }
      });
    }
  }, {
    key: "exec", value: function exec() {
      this.mode = '';
      return this.data1;
    }
  }]);
  return FlyJson;
}(Helper);
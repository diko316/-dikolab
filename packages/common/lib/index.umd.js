(function(root, factory) {
   if (typeof define === 'function' && define.amd)
      define([], factory);
   else if (typeof module === 'object' &&
            module.exports)
      module.exports = factory();
   else
      root.DikolabCommon = factory();
})(typeof self !== 'undefined' ?
   self : this, function() {
var __esbuild_iife_result = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // src/index.ts
  var index_exports = {};
  __export(index_exports, {
    ARRAY: () => ARRAY,
    BOOLEAN: () => BOOLEAN,
    BaseMiddleware: () => BaseMiddleware,
    DATE: () => DATE,
    FUNCTION: () => FUNCTION,
    METHOD: () => METHOD,
    NULL: () => NULL,
    NUMBER: () => NUMBER,
    OBJECT: () => OBJECT,
    REGEX: () => REGEX,
    Registry: () => Registry,
    STRING: () => STRING,
    UNDEFINED: () => UNDEFINED,
    array: () => isArray,
    assign: () => assign,
    bin2utf: () => bin2utf,
    browser: () => browser,
    camelize: () => camelize,
    clear: () => clear,
    clearAsync: () => clearAsync,
    clearRunner: () => clearRunner,
    clone: () => clone,
    compare: () => compare,
    contains: () => contains,
    createRegistry: () => createRegistry,
    date: () => isDate,
    decode64: () => decode64,
    differenceList: () => differenceList,
    each: () => each,
    encode64: () => encode64,
    fillin: () => fillin,
    instantiate: () => instantiate,
    intersectList: () => intersectList,
    isArray: () => isArray,
    isDate: () => isDate,
    isIterable: () => isIterable,
    isMethod: () => isMethod,
    isNativeObject: () => isNativeObject,
    isNumber: () => isNumber,
    isObject: () => isObject,
    isRegex: () => isRegex,
    isScalar: () => isScalar,
    isString: () => isString,
    isThenable: () => isThenable,
    iterable: () => isIterable,
    jsonClone: () => jsonClone,
    jsonCompare: () => jsonCompare,
    jsonEach: () => jsonEach,
    jsonExists: () => jsonExists,
    jsonFill: () => jsonFill,
    jsonFind: () => jsonFind,
    jsonParsePath: () => jsonParsePath,
    jsonSet: () => jsonSet,
    jsonUnset: () => jsonUnset,
    maxObjectIndex: () => maxObjectIndex,
    method: () => isMethod,
    middleware: () => middleware,
    nativeObject: () => isNativeObject,
    nodeVersions: () => nodeVersions,
    nodejs: () => nodejs,
    number: () => isNumber,
    object: () => isObject,
    regex: () => isRegex,
    register: () => register,
    rehash: () => rehash,
    run: () => run,
    scalar: () => isScalar,
    setAsync: () => setAsync,
    signature: () => signature,
    string: () => isString,
    thenable: () => isThenable,
    trim: () => trim,
    type: () => type,
    uncamelize: () => uncamelize,
    unionList: () => unionList,
    userAgent: () => userAgent,
    utf2bin: () => utf2bin
  });

  // src/type-checking/constants/signatures.constant.ts
  var OBJECT = "[object Object]";
  var ARRAY = "[object Array]";
  var NULL = "[object Null]";
  var UNDEFINED = "[object Undefined]";
  var NUMBER = "[object Number]";
  var STRING = "[object String]";
  var BOOLEAN = "[object Boolean]";
  var METHOD = "[object Function]";
  var FUNCTION = METHOD;
  var DATE = "[object Date]";
  var REGEX = "[object RegExp]";

  // src/type-checking/functions/is-object.function.ts
  var toString = Object.prototype.toString;
  function isObject(subject) {
    return toString.call(subject) === OBJECT;
  }

  // src/type-checking/functions/is-string.function.ts
  var toString2 = Object.prototype.toString;
  function isString(subject, allowEmpty = false) {
    return (typeof subject === "string" || toString2.call(subject) === STRING) && (allowEmpty || subject.length !== 0);
  }

  // src/type-checking/functions/is-number.function.ts
  function isNumber(subject) {
    return typeof subject === "number" && isFinite(subject);
  }

  // src/type-checking/functions/is-scalar.function.ts
  function isScalar(subject) {
    switch (typeof subject) {
      case "number":
        return isFinite(subject);
      case "boolean":
      case "string":
        return true;
    }
    return false;
  }

  // src/type-checking/functions/is-array.function.ts
  var toString3 = Object.prototype.toString;
  function isArray(subject, notEmpty = false) {
    return toString3.call(subject) === ARRAY && (!notEmpty || subject.length !== 0);
  }

  // src/type-checking/functions/is-method.function.ts
  var toString4 = Object.prototype.toString;
  function isMethod(subject) {
    return toString4.call(subject) === METHOD;
  }

  // src/type-checking/functions/is-date.function.ts
  var toString5 = Object.prototype.toString;
  function isDate(subject) {
    return toString5.call(subject) === DATE;
  }

  // src/type-checking/functions/is-regex.function.ts
  var toString6 = Object.prototype.toString;
  function isRegex(subject) {
    return toString6.call(subject) === REGEX;
  }

  // src/type-checking/functions/signature.function.ts
  var toString7 = Object.prototype.toString;
  function signature(subject) {
    if (subject === void 0) {
      return UNDEFINED;
    }
    if (subject === null || typeof subject === "number" && !isFinite(subject)) {
      return NULL;
    }
    return toString7.call(subject);
  }

  // src/type-checking/functions/is-thenable.function.ts
  function isThenable(subject) {
    switch (subject) {
      case void 0:
      case null:
      case true:
      case false:
        return false;
    }
    switch (signature(subject)) {
      case NUMBER:
      case STRING:
      case BOOLEAN:
      case NULL:
      case UNDEFINED:
        return false;
    }
    return "then" in subject && isMethod(subject.then);
  }

  // src/type-checking/functions/is-iterable.function.ts
  function isIterable(subject) {
    switch (subject) {
      case void 0:
      case null:
      case true:
      case false:
        return false;
    }
    if (typeof subject === "number" && !isFinite(subject)) {
      return false;
    }
    switch (signature(subject)) {
      case NUMBER:
      case BOOLEAN:
      case METHOD:
        return false;
      case STRING:
      case ARRAY:
        return true;
    }
    return "length" in subject && isNumber(subject.length) && subject.length > -1;
  }

  // src/type-checking/functions/is-native-object.function.ts
  var O = Object;
  var hasOwn = O.prototype.hasOwnProperty;
  function isNativeObject(subject) {
    if (signature(subject) !== OBJECT) {
      return false;
    }
    const constructor = subject.constructor;
    if (hasOwn.call(subject, "constructor")) {
      delete subject.constructor;
      const result = subject.constructor === O;
      subject.constructor = constructor;
      return result;
    }
    return constructor === O;
  }

  // src/type-checking/functions/type.function.ts
  function type(subject, isType) {
    switch (isType) {
      case "scalar":
        switch (signature(subject)) {
          case STRING:
          case NUMBER:
          case BOOLEAN:
            return true;
        }
        return false;
      case "regexp":
      case "regex":
        isType = "RegExp";
        break;
      case "method":
        isType = "Function";
        break;
      case "native":
      case "nativeObject":
        return isNativeObject(subject);
    }
    if (isString(isType)) {
      const len = isType.length;
      if (len) {
        return signature(subject) === "[object " + isType.charAt(0).toUpperCase() + isType.substring(1, len) + "]";
      }
    }
    return false;
  }

  // src/object/functions/each.function.ts
  var hasOwn2 = Object.prototype.hasOwnProperty;
  var getOwnPropertyNames = Object.getOwnPropertyNames;
  function isValidObject(target) {
    switch (signature(target)) {
      case REGEX:
      case DATE:
      case ARRAY:
      case OBJECT:
      case METHOD:
        return true;
    }
    return false;
  }
  function each(subject, handler, scope, hasown) {
    if (!isValidObject(subject)) {
      throw new Error("Invalid [subject] parameter.");
    }
    const noChecking = hasown === false;
    const resolvedScope = scope === void 0 ? null : scope;
    const names = getOwnPropertyNames(subject);
    for (let c = 0; c < names.length; c++) {
      const name = names[c];
      if ((noChecking || hasOwn2.call(subject, name)) && handler.call(resolvedScope, subject[name], name, subject) === false) {
        break;
      }
    }
    return subject;
  }

  // src/object/functions/assign.function.ts
  function apply(value, name) {
    this[name] = value;
  }
  function assignAll(target, source, defaults) {
    if (defaults) {
      each(defaults, apply, target, false);
    }
    each(source, apply, target);
    return target;
  }
  function assign(target, source, defaults, ownedOnly) {
    if (!isValidObject(target)) {
      throw new Error("Invalid [target] parameter.");
    }
    if (!isValidObject(source)) {
      throw new Error("Invalid [source] parameter.");
    }
    let resolvedOwned;
    if (typeof defaults === "boolean") {
      resolvedOwned = defaults;
      defaults = void 0;
    } else {
      resolvedOwned = ownedOnly !== false;
    }
    if (isValidObject(defaults)) {
      each(defaults, apply, target, resolvedOwned);
    } else if (defaults !== void 0) {
      throw new Error("Invalid [defaults] parameter.");
    }
    each(source, apply, target, resolvedOwned);
    return target;
  }

  // src/object/functions/rehash.function.ts
  function rehash(target, source, access) {
    if (!isValidObject(target)) {
      throw new Error("Invalid [target] parameter.");
    }
    if (!isValidObject(source)) {
      throw new Error("Invalid [source] parameter.");
    }
    if (!isObject(access)) {
      throw new Error("Invalid [access] parameter.");
    }
    const context = [target, source];
    each(
      access,
      function(value, name) {
        this[0][name] = this[1][value];
      },
      context
    );
    return target;
  }

  // src/object/functions/contains.function.ts
  var hasOwn3 = Object.prototype.hasOwnProperty;
  function contains(subject, property) {
    if (!isString(property) && !isNumber(property)) {
      throw new Error("Invalid [property] parameter.");
    }
    return hasOwn3.call(subject, property);
  }

  // src/object/functions/instantiate.function.ts
  function instantiate(Class, overrides) {
    const instance = Object.create(Class.prototype);
    if (isObject(overrides)) {
      return assign(instance, overrides);
    }
    return instance;
  }

  // src/object/functions/clone.function.ts
  function cloneObject(data, parents, cloned) {
    const depth = parents.length;
    const recreated = {};
    const context = [
      recreated,
      parents,
      cloned
    ];
    parents[depth] = data;
    cloned[depth] = recreated;
    each(data, onEachClonedProperty, context);
    parents.length = cloned.length = depth;
    return recreated;
  }
  function cloneArray(data, parents, cloned) {
    const depth = parents.length;
    const recreated = [];
    const context = [
      recreated,
      parents,
      cloned
    ];
    parents[depth] = data;
    cloned[depth] = recreated;
    for (let c = 0; c < data.length; c++) {
      onEachClonedProperty.call(context, data[c], c, data);
    }
    parents.length = cloned.length = depth;
    return recreated;
  }
  function onEachClonedProperty(value, name) {
    const native = isNativeObject(value);
    const parents = this[1];
    const clonedArr = this[2];
    if (native || isArray(value)) {
      const index = parents.lastIndexOf(value);
      value = index === -1 ? (native ? cloneObject : cloneArray)(
        value,
        parents,
        clonedArr
      ) : clonedArr[index];
    } else {
      value = clone(value, false);
    }
    this[0][name] = value;
  }
  function clone(data, deep = false) {
    const native = isNativeObject(data);
    if (native || isArray(data)) {
      if (deep) {
        return native ? cloneObject(data, [], []) : cloneArray(data, [], []);
      }
      return native ? assignAll({}, data) : data.slice(0);
    }
    if (isRegex(data)) {
      return new RegExp(data.source, data.flags);
    }
    if (isDate(data)) {
      return new Date(
        data.getFullYear(),
        data.getMonth(),
        data.getDate(),
        data.getHours(),
        data.getMinutes(),
        data.getSeconds(),
        data.getMilliseconds()
      );
    }
    return data;
  }

  // src/object/functions/compare.function.ts
  function compareLookback(object1, object2, references) {
    const depth = references.length;
    if (object1 === object2) {
      return true;
    }
    if (isObject(object1)) {
      if (!isObject(object2)) {
        return false;
      }
      if (references.lastIndexOf(object1) !== -1 && references.lastIndexOf(object2) !== -1) {
        return true;
      }
      references[depth] = object1;
      references[depth + 1] = object2;
      const context = [
        object2,
        references,
        true
      ];
      each(object1, onEachCompare, context);
      if (!context[2]) {
        return false;
      }
      context[0] = object1;
      each(object2, onEachCompare, context);
      if (!context[2]) {
        return false;
      }
      references.length = depth;
      return true;
    }
    if (isArray(object1)) {
      if (!isArray(object2)) {
        return false;
      }
      if (references.lastIndexOf(object1) !== -1 && references.lastIndexOf(object2) !== -1) {
        return true;
      }
      const len = object1.length;
      if (len !== object2.length) {
        return false;
      }
      references[depth] = object1;
      references[depth + 1] = object2;
      for (let i = len; i--; ) {
        if (!compareLookback(object1[i], object2[i], references)) {
          return false;
        }
      }
      references.length = depth;
      return true;
    }
    if (isRegex(object1)) {
      return isRegex(object2) && object1.source === object2.source;
    }
    if (isDate(object1)) {
      return isDate(object2) && object1.toString() === object2.toString();
    }
    return false;
  }
  function onEachCompare(value, name) {
    const target = this[0];
    const result = name in target ? compareLookback(value, target[name], this[1]) : false;
    this[2] = result;
    return result;
  }
  function compare(object1, object2) {
    return compareLookback(object1, object2, []);
  }

  // src/object/functions/fillin.function.ts
  function applyFillin(value, name) {
    if (!contains(this, name)) {
      this[name] = value;
    }
  }
  function fillin(target, source, hasown = true) {
    if (!isValidObject(target)) {
      throw new Error("Invalid [target] parameter");
    }
    each(source, applyFillin, target, hasown);
    return target;
  }

  // src/object/functions/clear.function.ts
  function applyClear(_value, name, subject) {
    delete subject[name];
  }
  function clear(subject) {
    each(subject, applyClear, null, true);
    return subject;
  }

  // src/object/functions/max-object-index.function.ts
  var ARRAY_INDEX_RE = /^[1-9][0-9]*|0$/;
  function onMaxNumericIndex(_value, name, _subject) {
    if (ARRAY_INDEX_RE.test(name)) {
      const context = this;
      context[0] = Math.max(Number(name), context[0]);
    }
  }
  function maxObjectIndex(subject) {
    if (isArray(subject)) {
      return subject.length - 1;
    }
    if (isValidObject(subject)) {
      const context = [-1];
      each(subject, onMaxNumericIndex, context);
      return context[0];
    }
    return false;
  }

  // src/array/functions/union-list.function.ts
  function unionList(array1, array2, clone2 = false) {
    if (!isArray(array1)) {
      throw new Error("Invalid [array1] parameter.");
    }
    if (!isArray(array2)) {
      throw new Error("Invalid [array2] parameter.");
    }
    array1 = clone2 ? array1.slice(0) : array1;
    array1.push(...array2);
    let total = array1.length;
    found: for (let l = total; l--; ) {
      const subject = array1[l];
      for (let len = total; len--; ) {
        if (l !== len && subject === array1[len]) {
          total--;
          array1.splice(l, 1);
          continue found;
        }
      }
    }
    return array1;
  }

  // src/array/functions/intersect-list.function.ts
  function intersectList(array1, array2, clone2 = false) {
    if (!isArray(array1)) {
      throw new Error("Invalid [array1] parameter.");
    }
    if (!isArray(array2)) {
      throw new Error("Invalid [array2] parameter.");
    }
    let total1 = array1.length;
    const total2 = array2.length;
    array1 = clone2 ? array1.slice(0) : array1;
    found: for (let l1 = total1; l1--; ) {
      const subject = array1[l1];
      foundSame: for (let l2 = total2; l2--; ) {
        if (subject === array2[l2]) {
          for (let l3 = total1; l3--; ) {
            if (l3 !== l1 && subject === array1[l3]) {
              break foundSame;
            }
          }
          continue found;
        }
      }
      array1.splice(l1, 1);
      total1--;
    }
    return array1;
  }

  // src/array/functions/difference-list.function.ts
  function differenceList(array1, array2, clone2 = false) {
    if (!isArray(array1)) {
      throw new Error("Invalid [array1] parameter.");
    }
    if (!isArray(array2)) {
      throw new Error("Invalid [array2] parameter.");
    }
    let total1 = array1.length;
    const total2 = array2.length;
    array1 = clone2 ? array1.slice(0) : array1;
    found: for (let l1 = total1; l1--; ) {
      const subject = array1[l1];
      for (let l2 = total2; l2--; ) {
        if (subject === array2[l2]) {
          array1.splice(l1, 1);
          total1--;
          continue found;
        }
      }
      for (let l2 = total1; l2--; ) {
        if (l2 !== l1 && subject === array1[l2]) {
          array1.splice(l1, 1);
          total1--;
          continue found;
        }
      }
    }
    return array1;
  }

  // src/string/functions/camelize.function.ts
  var CAMEL_RE = /[^a-z]+[a-z]/gi;
  function applyCamelize(all) {
    return all.charAt(all.length - 1).toUpperCase();
  }
  function camelize(subject) {
    return subject.replace(CAMEL_RE, applyCamelize);
  }

  // src/string/functions/uncamelize.function.ts
  var UNCAMEL_RE = /\-*[A-Z]/g;
  function applyUncamelize(all) {
    return "-" + all.charAt(all.length - 1).toLowerCase();
  }
  function uncamelize(subject) {
    return subject.replace(UNCAMEL_RE, applyUncamelize);
  }

  // src/string/functions/utf2bin.function.ts
  var HALF_BYTE = 128;
  var SIX_BITS = 63;
  var fromCharCode = String.fromCharCode;
  function utf2bin(subject) {
    if (!isString(subject, true)) {
      throw new Error("Invalid [subject] parameter.");
    }
    const utf8 = [];
    let ul = 0;
    for (let c = 0; c < subject.length; c++) {
      let code = subject.charCodeAt(c);
      if (code < HALF_BYTE) {
        utf8[ul++] = fromCharCode(code);
      } else if (code < 2048) {
        utf8[ul++] = fromCharCode(192 | code >> 6);
        utf8[ul++] = fromCharCode(HALF_BYTE | code & SIX_BITS);
      } else if (code < 55296 || code > 57343) {
        utf8[ul++] = fromCharCode(224 | code >> 12);
        utf8[ul++] = fromCharCode(
          HALF_BYTE | code >> 6 & SIX_BITS
        );
        utf8[ul++] = fromCharCode(HALF_BYTE | code & SIX_BITS);
      } else {
        c++;
        code = 65536 + ((code & 1023) << 10 | subject.charCodeAt(c) & 1023);
        utf8[ul++] = fromCharCode(240 | code >> 18);
        utf8[ul++] = fromCharCode(
          HALF_BYTE | code >> 12 & SIX_BITS
        );
        utf8[ul++] = fromCharCode(
          HALF_BYTE | code >> 6 & SIX_BITS
        );
        utf8[ul++] = fromCharCode(HALF_BYTE | code & SIX_BITS);
      }
    }
    return utf8.join("");
  }

  // src/string/functions/bin2utf.function.ts
  var fromCharCode2 = String.fromCharCode;
  function bin2utf(subject) {
    if (!isString(subject, true)) {
      throw new Error("Invalid [subject] parameter.");
    }
    const utf16 = [];
    let ul = 0;
    for (let c = 0; c < subject.length; c++) {
      const code = subject.charCodeAt(c);
      switch (code >> 4) {
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
          utf16[ul++] = subject.charAt(c);
          break;
        case 12:
        case 13:
          c++;
          utf16[ul++] = fromCharCode2(
            (code & 31) << 6 | subject.charCodeAt(c) & 63
          );
          break;
        case 14:
          utf16[ul++] = fromCharCode2(
            (code & 15) << 12 | (subject.charCodeAt(++c) & 63) << 6 | subject.charCodeAt(++c) & 63
          );
          break;
      }
    }
    return utf16.join("");
  }

  // src/string/functions/encode64.function.ts
  var BASE64_MAP = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  function encode64(subject) {
    if (!isString(subject, true)) {
      throw new Error("Invalid [subject] parameter.");
    }
    subject = utf2bin(subject);
    const buffer = [];
    let bl = 0;
    let excess = 0;
    for (let c = 0; c < subject.length; c++) {
      const code = subject.charCodeAt(c);
      const flag = c % 3;
      let chr = "";
      switch (flag) {
        case 0:
          chr = BASE64_MAP.charAt((code & 252) >> 2);
          excess = (code & 3) << 4;
          break;
        case 1:
          chr = BASE64_MAP.charAt(excess | (code & 240) >> 4);
          excess = (code & 15) << 2;
          break;
        case 2:
          chr = BASE64_MAP.charAt(excess | (code & 192) >> 6);
          excess = code & 63;
      }
      buffer[bl++] = chr;
      const end = c === subject.length - 1;
      if (end || flag === 2) {
        buffer[bl++] = BASE64_MAP.charAt(excess);
      }
      if (end) {
        let pad = bl % 4;
        for (pad = pad && 4 - pad; pad--; ) {
          buffer[bl++] = "=";
        }
        break;
      }
    }
    return buffer.join("");
  }

  // src/string/functions/decode64.function.ts
  var BASE64_MAP2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  var NOT_BASE64_RE = /[^a-zA-Z0-9+/=]/;
  var BASE64_EXCESS_REMOVE_RE = /[^a-zA-Z0-9+/]/;
  var ONE_BYTE = 255;
  var fromCharCode3 = String.fromCharCode;
  function decode64(subject) {
    if (!isString(subject, true) || NOT_BASE64_RE.test(subject)) {
      throw new Error("Invalid [subject] parameter.");
    }
    subject = subject.replace(BASE64_EXCESS_REMOVE_RE, "");
    const buffer = [];
    let bl = 0;
    let excess = 0;
    for (let c = 0; c < subject.length; c++) {
      const code = BASE64_MAP2.indexOf(subject.charAt(c));
      const flag = c % 4;
      let chr = 0;
      switch (flag) {
        case 0:
          chr = 0;
          break;
        case 1:
          chr = (excess << 2 | code >> 4) & ONE_BYTE;
          break;
        case 2:
          chr = (excess << 4 | code >> 2) & ONE_BYTE;
          break;
        case 3:
          chr = (excess << 6 | code) & ONE_BYTE;
      }
      excess = code;
      if (c === subject.length - 1 && flag < 3 && chr < 64) {
        break;
      }
      if (flag) {
        buffer[bl++] = fromCharCode3(chr);
      }
    }
    return bin2utf(buffer.join(""));
  }

  // src/string/functions/trim.function.ts
  var TRIM_RE = /^\s+|\s+$/g;
  function trim(subject) {
    if (!isString(subject, true)) {
      throw new Error("Invalid [subject] parameter.");
    }
    return subject ? subject.replace(TRIM_RE, "") : subject;
  }

  // src/json-path/constants/json-state-machine.constant.ts
  var START = "start";
  var START_ESCAPED = "start_escaped";
  var QUEUE = "queue";
  var END = "end";
  var END_EMPTY = "end_empty";
  var STATE = {
    start: {
      "[": "bracket_start",
      "'": "any_sq_start",
      '"': "any_dq_start",
      default: "any",
      "\\": "any_escape"
    },
    bracket_start: {
      "]": "property_end",
      "'": "sq_start",
      '"': "dq_start",
      default: "bracket_any"
    },
    any_sq_start: {
      "'": "property_end",
      "\\": "any_sq_escape",
      default: "any_sq"
    },
    any_sq: {
      "'": "property_end",
      "\\": "any_sq_escape",
      default: "any_sq"
    },
    any_sq_escape: {
      default: "any_sq"
    },
    any_dq_start: {
      '"': "property_end",
      "\\": "any_dq_escape",
      default: "any_dq"
    },
    any_dq: {
      '"': "property_end",
      "\\": "any_dq_escape",
      default: "any_dq"
    },
    any_dq_escape: {
      default: "any_dq"
    },
    sq_start: {
      "'": "bracket_end",
      "\\": "sq_escape",
      default: "sq"
    },
    sq: {
      "'": "bracket_end",
      "\\": "sq_escape",
      default: "sq"
    },
    sq_escape: {
      default: "sq"
    },
    dq_start: {
      '"': "bracket_end",
      "\\": "dq_escape",
      default: "dq"
    },
    dq: {
      '"': "bracket_end",
      "\\": "dq_escape",
      default: "dq"
    },
    dq_escape: {
      default: "dq"
    },
    bracket_any: {
      "]": "property_end",
      "\\": "bracket_any_escape",
      default: "bracket_any"
    },
    bracket_any_escape: {
      default: "bracket_any"
    },
    bracket_end: {
      "]": "property_end"
    },
    any: {
      ".": "start",
      "\\": "any_escape",
      "[": "bracket_start",
      default: "any"
    },
    any_escape: {
      default: "any"
    },
    property_end: {
      "[": "bracket_start",
      ".": "start"
    }
  };
  var STATE_ACTION = {
    start: {
      any: START,
      any_escape: START_ESCAPED
    },
    any_sq_start: {
      any_sq: START,
      property_end: END_EMPTY
    },
    any_sq: {
      any_sq: QUEUE,
      property_end: END
    },
    any_sq_escape: {
      any_sq: QUEUE
    },
    any_dq_start: {
      any_dq: START,
      property_end: END_EMPTY
    },
    any_dq: {
      any_dq: QUEUE,
      property_end: END
    },
    any_dq_escape: {
      any_dq: QUEUE
    },
    any: {
      any: QUEUE,
      start: END,
      bracket_start: END
    },
    any_escape: {
      any: QUEUE,
      bracket_start: END,
      start: START
    },
    bracket_start: {
      bracket_any: START,
      property_end: END_EMPTY
    },
    bracket_any: {
      bracket_any: QUEUE,
      property_end: END
    },
    bracket_any_escape: {
      bracket_any: QUEUE
    },
    sq_start: {
      sq: START,
      bracket_end: END_EMPTY
    },
    sq: {
      sq: QUEUE,
      bracket_end: END
    },
    sq_escape: {
      sq: QUEUE
    },
    dq_start: {
      dq: START,
      bracket_end: END_EMPTY
    },
    dq: {
      dq: QUEUE,
      bracket_end: END
    },
    dq_escape: {
      dq: QUEUE
    }
  };

  // src/json-path/functions/json-each.function.ts
  var ERROR_PATH_INVALID = "Invalid [path] parameter.";
  function jsonEach(path, callback, arg1, arg2, arg3, arg4, arg5) {
    if (!isString(path)) {
      throw new Error(ERROR_PATH_INVALID);
    }
    if (!isMethod(callback)) {
      throw new Error("Invalid [callback] parameter");
    }
    let buffer = false;
    let bl = 0;
    let state = "start";
    let stateObject = STATE.start;
    const items = [];
    let len = 0;
    let pending = 0;
    for (let c = 0; c < path.length; c++) {
      const chr = path.charAt(c);
      const last = c === path.length - 1;
      let next;
      if (chr in stateObject) {
        next = stateObject[chr];
      } else if ("default" in stateObject) {
        next = stateObject.default;
      } else {
        return null;
      }
      if (state in STATE_ACTION) {
        const actionObject = STATE_ACTION[state];
        if (next in actionObject) {
          let startQueue = false;
          switch (actionObject[next]) {
            case START:
              startQueue = true;
            // falls through
            case START_ESCAPED:
              if (buffer !== false) {
                return false;
              }
              if (startQueue && !last) {
                buffer = [chr];
                bl = 1;
              } else {
                buffer = [];
                bl = 0;
              }
              if (!last) {
                break;
              }
            // falls through
            case QUEUE:
              if (buffer === false) {
                return false;
              }
              buffer[bl++] = chr;
              if (!last) {
                break;
              }
            // falls through
            case END:
              if (buffer === false) {
                return false;
              }
              items[len++] = buffer.join("");
              buffer = false;
              bl = 0;
              break;
            case END_EMPTY:
              if (buffer !== false) {
                return false;
              }
              items[len++] = "";
              break;
          }
        }
      }
      state = next;
      stateObject = STATE[state];
      if (pending < len - 1) {
        if (callback(
          items[pending++],
          false,
          arg1,
          arg2,
          arg3,
          arg4,
          arg5
        ) === false) {
          return true;
        }
      }
      if (last) {
        let remaining = len - pending;
        for (; remaining--; ) {
          if (callback(
            items[pending++],
            !remaining,
            arg1,
            arg2,
            arg3,
            arg4,
            arg5
          ) === false) {
            return true;
          }
        }
        break;
      }
    }
    return true;
  }

  // src/json-path/functions/json-parse-path.function.ts
  function onParsePath(property, _last, context) {
    context[context.length] = property;
  }
  function jsonParsePath(path) {
    const items = [];
    return jsonEach(path, onParsePath, items) && items.length ? items : null;
  }

  // src/json-path/functions/json-find.function.ts
  function isAccessible(subject, item) {
    const sig = signature(subject);
    switch (sig) {
      case NUMBER:
        return isFinite(subject) && item in Number.prototype ? sig : false;
      case STRING:
        return item in String.prototype ? sig : false;
      case BOOLEAN:
        return item in Boolean.prototype ? sig : false;
      case REGEX:
      case DATE:
      case ARRAY:
      case OBJECT:
      case METHOD:
        if (item in subject) {
          return sig;
        }
    }
    return false;
  }
  function findCallback(item, last, operation) {
    const subject = operation[1];
    if (!isAccessible(subject, item)) {
      operation[0] = void 0;
      return false;
    }
    operation[last ? 0 : 1] = subject[item];
    return true;
  }
  function jsonFind(path, object) {
    const operation = [void 0, object];
    jsonEach(path, findCallback, operation);
    operation[1] = null;
    return operation[0];
  }

  // src/json-path/functions/json-compare.function.ts
  function jsonCompare(path, object1, object2) {
    return compare(jsonFind(path, object1), object2);
  }

  // src/json-path/functions/json-clone.function.ts
  function jsonClone(path, object, deep = false) {
    return clone(jsonFind(path, object), deep);
  }

  // src/json-path/functions/json-set.function.ts
  var NUMERIC_RE = /^([1-9][0-9]*|0)$/;
  function isWritable(subject) {
    const sig = signature(subject);
    switch (sig) {
      case REGEX:
      case DATE:
      case ARRAY:
      case OBJECT:
      case METHOD:
        return sig;
    }
    return false;
  }
  function onPopulatePath(item, last, context) {
    const subject = context[1];
    const writable = isWritable(subject);
    let success = false;
    if (!last) {
      if (writable) {
        if (!(item in subject)) {
          subject[item] = {};
          success = true;
        } else if (isWritable(subject[item])) {
          success = true;
        }
      }
      context[1] = success ? subject[item] : void 0;
    } else {
      success = !!writable;
      context[2] = success && item;
    }
    return success;
  }
  function jsonSet(path, subject, value, overwrite) {
    if (!isString(path)) {
      throw new Error("Invalid [path] parameter.");
    }
    const context = [void 0, subject, false];
    jsonEach(path, onPopulatePath, context);
    const name = context[2];
    if (name !== false) {
      subject = context[1];
      const valueSignature = isWritable(value);
      const arrayOperation = isArray(subject) && NUMERIC_RE.test(name);
      let current;
      let currentSignature;
      if (name in subject) {
        current = subject[name];
        currentSignature = isWritable(current);
      } else {
        current = void 0;
        currentSignature = null;
      }
      const canApply = valueSignature && !!currentSignature;
      const arrayPush = canApply && valueSignature === ARRAY && currentSignature === ARRAY;
      switch (overwrite) {
        case "insert":
          overwrite = !arrayOperation;
          if (arrayOperation) {
            subject.splice(Number(name), 0, value);
          }
          break;
        case "apply":
          overwrite = !canApply;
          if (canApply) {
            assign(current, value);
          }
          break;
        case "push":
          overwrite = !arrayPush;
          if (arrayPush) {
            current.push(...value);
          }
          break;
        case "unshift":
          overwrite = !arrayPush;
          if (arrayPush) {
            current.splice(0, 0, ...value);
          }
          break;
        case false:
        // falls through
        default:
          overwrite = !canApply;
          if (canApply) {
            if (arrayPush) {
              current.push(...value);
            } else {
              assign(current, value);
            }
          }
      }
      if (overwrite) {
        subject[name] = value;
      }
      return true;
    }
    return false;
  }

  // src/json-path/functions/json-unset.function.ts
  var NUMERIC_RE2 = /^([1-9][0-9]*|0)$/;
  function onRemovePath(item, last, context) {
    const subject = context[1];
    const writable = isWritable(subject);
    let success = false;
    if (!last) {
      if (writable && item in subject) {
        if (isWritable(subject[item])) {
          success = true;
        } else {
          context[3] = true;
        }
      }
      context[1] = success ? subject[item] : void 0;
    } else {
      success = !!writable;
      context[2] = success && item;
      context[3] = true;
    }
    return success;
  }
  function jsonUnset(path, subject) {
    if (!isString(path)) {
      throw new Error("Invalid [path] parameter.");
    }
    const context = [void 0, subject, false, false];
    jsonEach(path, onRemovePath, context);
    const name = context[2];
    let returnValue = context[3];
    if (returnValue && name !== false) {
      subject = context[1];
      if (!(name in subject)) {
        returnValue = false;
      } else {
        if (isArray(subject) && NUMERIC_RE2.test(name)) {
          subject.splice(Number(name), 1);
        } else {
          delete subject[name];
          returnValue = !(name in subject);
        }
      }
    }
    return returnValue;
  }

  // src/json-path/functions/json-fill.function.ts
  var ARRAY_INDEX_RE2 = /^([1-9][0-9]*|0|)$/;
  var ERROR_NATIVE_OBJECT = "Root [subject] requires native Object to accept non-numeric property name.";
  function isJSONWritable(subject) {
    const sig = signature(subject);
    switch (sig) {
      case ARRAY:
      case "[object Object]":
        return sig;
    }
    return false;
  }
  function jsonFill(path, subject, value) {
    if (!isString(path)) {
      throw new Error("Invalid [path] parameter.");
    }
    const isSubjectArray = isArray(subject);
    if (!isObject(subject) && !isSubjectArray) {
      return false;
    }
    const parsedPath = jsonParsePath(path);
    if (!parsedPath || !parsedPath.length) {
      return false;
    }
    let parent = subject;
    let parentIndex = parsedPath[0];
    if (!parentIndex) {
      parentIndex = maxObjectIndex(parent) + 1;
    }
    const last = parsedPath.length - 1;
    for (let c = 0; c < last; c++) {
      const item = parsedPath[c + 1];
      const arrayIndex = ARRAY_INDEX_RE2.test(item);
      if (contains(parent, parentIndex)) {
        let property = parent[parentIndex];
        const writable = isJSONWritable(property);
        if (writable === ARRAY && !arrayIndex) {
          property = assign({}, property);
          delete property.length;
        } else if (!writable) {
          property = arrayIndex ? [property] : { "": property };
        }
        parent[parentIndex] = property;
        parent = property;
      } else if (isSubjectArray && parent === subject && !arrayIndex) {
        throw new Error(ERROR_NATIVE_OBJECT);
      } else {
        const property = arrayIndex ? [] : {};
        parent[parentIndex] = property;
        parent = property;
      }
      parentIndex = item;
      if (!item) {
        parentIndex = maxObjectIndex(parent) + 1;
      }
    }
    parent[parentIndex] = value;
    return true;
  }

  // src/json-path/functions/json-exists.function.ts
  function existsCallback(item, last, context) {
    const subject = context[0];
    const exists = isAccessible(subject, item);
    if (exists) {
      context[0] = subject[item];
    }
    if (last) {
      context[1] = !!exists;
    }
    return !!exists;
  }
  function jsonExists(path, subject) {
    const operation = [subject, false];
    jsonEach(path, existsCallback, operation);
    operation[0] = null;
    return operation[1];
  }

  // src/registry/classes/registry.class.ts
  var ERROR_NAME = "Invalid [name] parameter.";
  var ERROR_PATH = "Invalid [path] parameter.";
  function isIndex(name) {
    switch (signature(name)) {
      case STRING:
      case NUMBER:
        return true;
    }
    return false;
  }
  var Registry = class {
    data = {};
    /**
     * Retrieves a value by key
     *
     * @param name - Property key
     * @returns Stored value, or undefined
     */
    get(name) {
      if (!isIndex(name)) {
        throw new Error(ERROR_NAME);
      }
      if (contains(this.data, name)) {
        return this.data[name];
      }
      return void 0;
    }
    /**
     * Sets a value by key or merges an object
     *
     * @param name - Property key or object
     * @param value - Value to store
     * @returns This registry instance
     */
    set(name, value) {
      switch (signature(name)) {
        case OBJECT:
        case ARRAY:
          assign(this.data, name, true);
          break;
        case STRING:
        case NUMBER:
          this.data[name] = value;
          break;
        default:
          throw new Error(ERROR_NAME);
      }
      return this;
    }
    /**
     * Removes a value by key
     *
     * @param name - Property key
     * @returns This registry instance
     */
    unset(name) {
      if (!isIndex(name)) {
        throw new Error(ERROR_NAME);
      }
      if (contains(this.data, name)) {
        delete this.data[name];
      }
      return this;
    }
    /**
     * Finds a value using a JSON path
     *
     * @param path - JSON path string
     * @returns Value at path, or undefined
     */
    find(path) {
      if (!isString(path)) {
        throw new Error(ERROR_PATH);
      }
      return jsonFind(path, this.data);
    }
    /**
     * Inserts a value at a JSON path
     *
     * @param path - JSON path string
     * @param value - Value to insert
     * @returns This registry instance
     */
    insert(path, value) {
      if (!isString(path)) {
        throw new Error(ERROR_PATH);
      }
      jsonFill(path, this.data, value);
      return this;
    }
    /**
     * Removes a value at a JSON path
     *
     * @param path - JSON path string
     * @returns This registry instance
     */
    remove(path) {
      if (!isString(path)) {
        throw new Error(ERROR_PATH);
      }
      jsonUnset(path, this.data);
      return this;
    }
    /**
     * Checks if a key exists in the store
     *
     * @param name - Property key
     * @returns True if key exists
     */
    exists(name) {
      if (!isIndex(name)) {
        throw new Error(ERROR_NAME);
      }
      return contains(this.data, name);
    }
    /**
     * Checks if a JSON path exists
     *
     * @param path - JSON path string
     * @returns True if path exists
     */
    pathExists(path) {
      if (!isString(path)) {
        throw new Error(ERROR_PATH);
      }
      return jsonExists(path, this.data);
    }
    /**
     * Merges an object into the store
     *
     * @param value - Object to merge
     * @returns This registry instance
     */
    assign(value) {
      switch (signature(value)) {
        case OBJECT:
        case ARRAY:
          assign(this.data, value, true);
          return this;
        default:
          throw new Error("Invalid [value] parameter");
      }
    }
    /**
     * Removes all entries from the store
     *
     * @returns This registry instance
     */
    clear() {
      clear(this.data);
      return this;
    }
    /**
     * Deep-clones all stored data
     *
     * @returns Cloned data object
     */
    clone() {
      return clone(this.data, true);
    }
  };
  function createRegistry() {
    return new Registry();
  }

  // src/processor/functions/set-async.function.ts
  var G = globalThis;
  var hasSetImmediate = typeof G.setImmediate === "function";
  function setAsync(handler) {
    if (!isMethod(handler)) {
      throw new Error("Invalid [handler] parameter.");
    }
    if (hasSetImmediate) {
      return G.setImmediate(handler);
    }
    return G.setTimeout(handler, 1);
  }
  function clearAsync(id) {
    try {
      if (hasSetImmediate) {
        G.clearImmediate(id);
      } else {
        G.clearTimeout(id);
      }
    } catch (_e) {
    }
  }

  // src/processor/classes/base-middleware.class.ts
  var BaseMiddleware = class {
    access;
    /**
     * Creates a new BaseMiddleware
     *
     * @param access - Namespace prefix
     */
    constructor(access) {
      this.access = access;
    }
    /**
     * Runs handlers for a namespaced runner
     *
     * @param name - Runner name
     * @param args - Arguments to pass
     * @param scope - Execution context
     * @returns Result from handler chain
     */
    run(name, args, scope) {
      return run(this.access + name, args, scope);
    }
    /**
     * Registers a handler in this namespace
     *
     * @param name - Runner name
     * @param handler - Callback to register
     * @returns This middleware instance
     */
    register(name, handler) {
      register(this.access + name, handler);
      return this;
    }
    /**
     * Clears handlers for a namespaced runner
     *
     * @param name - Runner name
     * @param after - If true, clear only
     *   after-handlers
     * @returns This middleware instance
     */
    clear(name, after) {
      if (!isString(name)) {
        throw new Error("Invalid [name] parameter.");
      }
      clearRunner(this.access + name, after);
      return this;
    }
  };

  // src/processor/functions/runner.function.ts
  var NAME_RE = /^(([^.]+\.)*)((before|after):)?([a-zA-Z0-9_\-.]+)$/;
  var POSITION_BEFORE = 1;
  var POSITION_AFTER = 2;
  var RUNNERS = {};
  var NAMESPACES = {};
  var INVALID_NAME = "Invalid [name] parameter.";
  var INVALID_HANDLER = "Invalid [handler] parameter.";
  function parseName(name) {
    const match = isString(name) && name.match(NAME_RE);
    if (match) {
      const namespace = match[1];
      const position = match[4] === "before" ? POSITION_BEFORE : POSITION_AFTER;
      return [position, (namespace || "") + match[5]];
    }
    return void 0;
  }
  function getPositionAccess(input) {
    return input === POSITION_BEFORE ? "before" : "after";
  }
  function getRunners(name) {
    const list = RUNNERS;
    const parsed = parseName(name);
    if (parsed) {
      const access = ":" + parsed[1];
      if (access in list) {
        const position = parsed[0];
        return [
          list[access],
          getPositionAccess(position),
          position
        ];
      }
    }
    return void 0;
  }
  function get(name) {
    const info = getRunners(name);
    if (info) {
      return info[0][info[1]];
    }
    return void 0;
  }
  function purgeRunners(name, after) {
    const info = getRunners(name);
    if (info) {
      let access;
      switch (after) {
        case true:
          access = "after";
          break;
        case false:
          access = "before";
          break;
        default:
          access = false;
      }
      if (!access || access === "before") {
        const runners = info[0].before;
        runners.splice(0, runners.length);
      }
      if (!access || access === "after") {
        const runners = info[0].after;
        runners.splice(0, runners.length);
      }
    }
  }
  function run(name, args, scope) {
    if (!isString(name)) {
      throw new Error(INVALID_NAME);
    }
    const runners = get(name);
    if (runners) {
      const resolvedScope = scope === void 0 ? null : scope;
      let resolvedArgs = isIterable(args) ? Array.prototype.slice.call(args, 0) : [];
      let result;
      for (let c = 0; c < runners.length; c++) {
        result = runners[c].apply(
          resolvedScope,
          resolvedArgs
        );
        if (result !== void 0) {
          resolvedArgs = [result];
        }
      }
      resolvedArgs.splice(0, resolvedArgs.length);
      return result;
    }
    return void 0;
  }
  function register(name, handler) {
    const list = RUNNERS;
    if (!isString(name)) {
      throw new Error(INVALID_NAME);
    }
    const parsed = parseName(name);
    if (!isMethod(handler)) {
      throw new Error(INVALID_HANDLER);
    }
    if (parsed) {
      const resolvedName = parsed[1];
      const access = ":" + resolvedName;
      if (!(access in list)) {
        list[access] = {
          name: resolvedName,
          before: [],
          after: []
        };
      }
      const items = list[access][getPositionAccess(parsed[0])];
      items[items.length] = handler;
    }
  }
  function clearRunner(name, after) {
    if (!isString(name)) {
      throw new Error(INVALID_NAME);
    }
    purgeRunners(name, after);
  }
  function middleware(name) {
    const list = NAMESPACES;
    if (!isString(name)) {
      throw new Error(INVALID_NAME);
    }
    const access = name + ".";
    if (!(access in list)) {
      list[access] = new BaseMiddleware(access);
    }
    return list[access];
  }

  // src/env/functions/detect-env.function.ts
  var G2 = globalThis;
  function isBrowser() {
    try {
      return "document" in G2 && "window" in G2 && G2.document.defaultView === G2.window;
    } catch {
      return false;
    }
  }
  function getNodeVersions() {
    try {
      if ("process" in G2 && G2.process && G2.process.versions) {
        return G2.process.versions;
      }
    } catch {
    }
    return false;
  }
  function getUserAgent(isBrowserEnv, versions) {
    if (isBrowserEnv) {
      try {
        return String(
          G2.navigator && G2.navigator.userAgent
        );
      } catch {
        return "Unknown";
      }
    }
    if (versions && "process" in G2) {
      const proc = G2.process;
      return "Node " + String(versions.node) + "(" + String(proc.platform) + "; V8 " + String(versions.v8 || "unknown") + "; arch " + String(proc.arch) + ")";
    }
    return "Unknown";
  }
  var browser = isBrowser();
  var nodeVersions = getNodeVersions();
  var nodejs = !!nodeVersions && !!nodeVersions.node;
  var userAgent = getUserAgent(browser, nodeVersions);
  return __toCommonJS(index_exports);
})();
return __esbuild_iife_result;});
//# sourceMappingURL=index.umd.js.map

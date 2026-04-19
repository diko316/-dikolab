// src/string/functions/uncamelize.function.ts
var UNCAMEL_RE = /\-*[A-Z]/g;
function applyUncamelize(all) {
  return "-" + all.charAt(all.length - 1).toLowerCase();
}
function uncamelize(subject) {
  return subject.replace(UNCAMEL_RE, applyUncamelize);
}

export {
  uncamelize
};
//# sourceMappingURL=chunk-4RISLWLR.mjs.map

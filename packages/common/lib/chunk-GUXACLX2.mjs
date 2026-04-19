// src/string/functions/camelize.function.ts
var CAMEL_RE = /[^a-z]+[a-z]/gi;
function applyCamelize(all) {
  return all.charAt(all.length - 1).toUpperCase();
}
function camelize(subject) {
  return subject.replace(CAMEL_RE, applyCamelize);
}

export {
  camelize
};
//# sourceMappingURL=chunk-GUXACLX2.mjs.map

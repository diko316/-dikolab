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

export {
  isScalar
};
//# sourceMappingURL=chunk-DX3E4UG2.mjs.map

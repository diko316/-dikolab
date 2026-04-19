import {
  isArray
} from "./chunk-6BGNHZOB.mjs";

// src/array/functions/union-list.function.ts
function unionList(array1, array2, clone = false) {
  if (!isArray(array1)) {
    throw new Error("Invalid [array1] parameter.");
  }
  if (!isArray(array2)) {
    throw new Error("Invalid [array2] parameter.");
  }
  array1 = clone ? array1.slice(0) : array1;
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

export {
  unionList
};
//# sourceMappingURL=chunk-UIR3ZT2N.mjs.map

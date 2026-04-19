import {
  isArray
} from "./chunk-6BGNHZOB.mjs";

// src/array/functions/intersect-list.function.ts
function intersectList(array1, array2, clone = false) {
  if (!isArray(array1)) {
    throw new Error("Invalid [array1] parameter.");
  }
  if (!isArray(array2)) {
    throw new Error("Invalid [array2] parameter.");
  }
  let total1 = array1.length;
  const total2 = array2.length;
  array1 = clone ? array1.slice(0) : array1;
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

export {
  intersectList
};
//# sourceMappingURL=chunk-AT6NY37R.mjs.map

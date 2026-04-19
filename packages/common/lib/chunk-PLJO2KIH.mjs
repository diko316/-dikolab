import {
  assignAll
} from "./chunk-7D27R3YN.mjs";
import {
  each
} from "./chunk-Z6T5S4RH.mjs";
import {
  isArray
} from "./chunk-6BGNHZOB.mjs";
import {
  isDate
} from "./chunk-UIPWX2F5.mjs";
import {
  isNativeObject
} from "./chunk-ZZUM7IAB.mjs";
import {
  isRegex
} from "./chunk-TVSXR7AM.mjs";

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

export {
  clone
};
//# sourceMappingURL=chunk-PLJO2KIH.mjs.map

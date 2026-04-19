import {
  protoClone
} from "./chunk-RWYLBUID.mjs";

// src/regex/classes/pointer.class.ts
import { assign } from "@dikolab/common";
var Pointer = class _Pointer {
  negative;
  repeated = false;
  chr;
  to = null;
  next = null;
  constructor(chr, negative) {
    this.chr = chr || "";
    this.negative = negative === true;
  }
  clone(overrides) {
    let pointer = this;
    let from = null;
    let last = null;
    const includeNext = overrides !== false;
    const resolvedOverrides = overrides || null;
    for (; pointer; pointer = pointer.next) {
      const created = protoClone(pointer);
      if (resolvedOverrides) {
        assign(
          created,
          resolvedOverrides
        );
      }
      if (from) {
        last.next = created;
      } else {
        from = created;
      }
      last = created;
      if (!includeNext) {
        break;
      }
    }
    last.next = null;
    return [from, last];
  }
  point(fragment) {
    let pointer = this;
    for (; pointer; pointer = pointer.next) {
      if (!pointer.to) {
        pointer.to = fragment;
      }
    }
    return this;
  }
  last() {
    let pointer = this;
    for (; pointer.next; pointer = pointer.next) {
    }
    return pointer;
  }
  range(to) {
    const chr = this.chr;
    const negative = this.negative;
    let from = chr.charCodeAt(0);
    const toCode = to.chr.charCodeAt(0);
    let len = Math.max(toCode - from - 1, 0);
    if (len) {
      let start = null;
      let end = null;
      for (; len--; ) {
        const created = new _Pointer(
          String.fromCharCode(++from),
          negative
        );
        if (start) {
          end.next = created;
        } else {
          start = created;
        }
        end = created;
      }
      return start ? [start, end] : null;
    }
    return null;
  }
};

export {
  Pointer
};
//# sourceMappingURL=chunk-YPRCETJA.mjs.map

// src/state/define/classes/define-list.class.ts
var DefineList = class {
  first = null;
  last = null;
  shift() {
    const item = this.first;
    if (item) {
      const first = item[0];
      this.first = first;
      if (!first) {
        this.last = first;
      }
      return item[1];
    }
    return null;
  }
  pop() {
    const item = this.last;
    if (item) {
      const last = item[0];
      this.last = last;
      if (!last) {
        this.first = last;
      }
      return item[1];
    }
    return null;
  }
  push(value) {
    const item = [null, value];
    if (this.last) {
      this.last[0] = item;
    } else {
      this.first = item;
    }
    this.last = item;
    return this;
  }
};

export {
  DefineList
};
//# sourceMappingURL=chunk-QY2TQZZS.mjs.map

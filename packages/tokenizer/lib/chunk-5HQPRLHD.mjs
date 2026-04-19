import {
  protoClone
} from "./chunk-RWYLBUID.mjs";

// src/regex/classes/fragment.class.ts
var Fragment = class {
  id;
  state;
  builder;
  base = null;
  splitted = null;
  repeated = null;
  pointer = null;
  lastPointer = null;
  outgoing = null;
  lastOutgoing = null;
  constructor(builder, pointer) {
    this.id = "f" + ++builder.fgen;
    this.state = { id: null };
    this.builder = builder;
    if (pointer) {
      this.pointer = pointer;
      let p = pointer;
      for (; p.next; p = p.next) {
      }
      this.lastPointer = p;
      this.outgoing = this.lastOutgoing = {
        fragment: this,
        next: null
      };
    }
  }
  /**
   * Links this fragment to operand2 by
   * connecting outgoing edges and propagating
   * splits/repeats through the NFA graph.
   */
  link(operand2) {
    const operand1 = this;
    let outgoing = operand1.outgoing;
    let split = operand1.splitted;
    let newSplit = operand2.splitted;
    const repeat = operand1.repeated;
    operand2.applyState();
    for (; outgoing; outgoing = outgoing.next) {
      outgoing.fragment.pointer.point(operand2);
    }
    if (repeat) {
      let last = operand2.lastPointer;
      let rep = repeat;
      for (; rep; rep = rep.next) {
        const clonedPtr = rep.pointer;
        if (!last) {
          operand2.pointer = clonedPtr;
        } else {
          last.next = clonedPtr;
        }
        last = clonedPtr;
      }
      operand2.lastPointer = last;
    }
    const pointer = operand2.pointer;
    if (split && pointer) {
      let startSplit = null;
      let endSplit = null;
      for (; split; split = split.next) {
        const fragment2 = split.fragment;
        const cloned = pointer.clone();
        const last = fragment2.lastPointer.last();
        last.next = cloned[0];
        fragment2.lastPointer = cloned[1];
        if (fragment2.pointer !== operand1.pointer) {
          const created = {
            fragment: fragment2,
            next: null
          };
          if (!startSplit) {
            startSplit = created;
          } else {
            endSplit.next = created;
          }
          endSplit = created;
        }
      }
      if (endSplit) {
        endSplit.next = newSplit;
        newSplit = startSplit;
      }
    }
    const fragment = operand1.clone();
    fragment.splitted = newSplit;
    fragment.repeated = operand2.repeated;
    fragment.outgoing = operand2.outgoing;
    fragment.lastOutgoing = operand2.lastOutgoing;
    return fragment;
  }
  /**
   * Clones this fragment via prototype chain
   * sharing — the clone shares structural
   * properties with the original but can be
   * independently mutated.
   */
  clone() {
    const base = this.base;
    const cloned = protoClone(this);
    if (!base) {
      cloned.base = this;
    }
    cloned.id = "f" + ++this.builder.fgen;
    return cloned;
  }
  split(repeat) {
    const current = this.splitted;
    const splitNode = {
      fragment: this,
      next: null
    };
    const fragment = this.clone();
    if (repeat) {
      fragment.repeat();
    }
    if (!current) {
      fragment.splitted = splitNode;
    }
    return fragment;
  }
  repeat() {
    const pointer = this.pointer;
    const current = this.repeated;
    if (!current && pointer) {
      const cloned = pointer.clone();
      this.repeated = {
        pointer: cloned[0],
        next: null
      };
    }
    return this;
  }
  fill(operand2) {
    const operand1 = this;
    const rangeResult = operand1.pointer.range(operand2.pointer);
    if (rangeResult) {
      operand2.state = operand1.state;
      rangeResult[1].next = operand2.pointer;
      operand1.lastPointer.next = rangeResult[0];
      const fragment = operand1.clone();
      fragment.lastPointer = operand2.lastPointer;
      fragment.outgoing.next = operand2.outgoing;
      fragment.lastOutgoing = operand2.lastOutgoing;
      return fragment;
    }
    return this.merge(operand2);
  }
  merge(operand2) {
    const operand1 = this;
    const fragment = operand1.clone();
    operand2.state = operand1.state;
    operand1.lastPointer.next = operand2.pointer;
    operand1.lastOutgoing.next = operand2.outgoing;
    fragment.lastPointer = operand2.lastPointer;
    fragment.lastOutgoing = operand2.lastOutgoing;
    let first = operand1.splitted;
    let last = operand2.splitted;
    fragment.splitted = first || last;
    if (first && last) {
      let item = first;
      for (; item.next; item = item.next) {
      }
      item.next = last;
    }
    first = null;
    last = null;
    const firstRepeat = operand1.repeated;
    const lastRepeat = operand2.repeated;
    fragment.repeated = firstRepeat || lastRepeat;
    if (firstRepeat && lastRepeat) {
      let item = firstRepeat;
      for (; item.next; item = item.next) {
      }
      item.next = lastRepeat;
    }
    return fragment;
  }
  applyState() {
    const state = this.state;
    if (!state.id) {
      state.id = "s" + ++this.builder.gen;
    }
    return state;
  }
};

export {
  Fragment
};
//# sourceMappingURL=chunk-5HQPRLHD.mjs.map

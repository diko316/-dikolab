import {
  Fragment
} from "./chunk-5HQPRLHD.mjs";
import {
  Pointer
} from "./chunk-YPRCETJA.mjs";
import {
  parse
} from "./chunk-K7P2GRSF.mjs";

// src/regex/functions/state-builder.function.ts
var PATTERN_ERROR = "Patterns resulting to empty token is not allowed. ";
function build(name, regex, stateObject) {
  const rpn = parse(regex);
  let c = -1;
  let l = rpn.length;
  let stack = null;
  let startState = null;
  let el = 0;
  const endStates = [];
  const errorName = name + " = /" + regex + "/";
  const builder = {
    gen: 0,
    fgen: 0
  };
  for (; l--; ) {
    const item = rpn[++c];
    const token = item[0];
    switch (token) {
      case ".":
        stack = [
          stack[0][0],
          stack[0][1].link(stack[1])
        ];
        break;
      case "?":
        stack = [stack[0], stack[1].split()];
        break;
      case "+":
        stack = [stack[0], stack[1].repeat()];
        break;
      case "*":
        stack = [stack[0], stack[1].split(true)];
        break;
      case "^,":
      case ",":
      case "|":
        stack = [
          stack[0][0],
          stack[0][1].merge(stack[1])
        ];
        break;
      case "^-":
      case "-":
        stack = [
          stack[0][0],
          stack[0][1].fill(stack[1])
        ];
        break;
      case "$$": {
        if (!stack || stack[0] !== null) {
          throw new Error(
            "Invalid end of expression. " + errorName
          );
        }
        const operand1 = stack[1];
        const operand2 = new Fragment(builder, null);
        operand1.link(operand2);
        const sid = startState.id;
        let id = operand2.state.id;
        if (id === sid) {
          throw new Error(PATTERN_ERROR + errorName);
        }
        endStates[el++] = id;
        let split = operand1.splitted;
        for (; split; split = split.next) {
          id = split.fragment.state.id;
          if (id === sid) {
            throw new Error(PATTERN_ERROR + errorName);
          }
          endStates[el++] = id;
        }
        break;
      }
      case "^":
      case "$":
      case "char":
      case "negative_char": {
        const operand1 = new Fragment(
          builder,
          new Pointer(item[1], token === "negative_char")
        );
        if (!startState) {
          startState = operand1.applyState();
        }
        stack = [stack, operand1];
        break;
      }
    }
  }
  if (el) {
    stateObject.finalizeFragments(name, stack[1], endStates);
  }
  return stateObject;
}

export {
  build
};
//# sourceMappingURL=chunk-65IUPJ6F.mjs.map

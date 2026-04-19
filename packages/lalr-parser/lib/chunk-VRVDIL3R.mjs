// src/state/builder/functions/rule.function.ts
import { isRegex, isString, isArray } from "@dikolab/common";
var NONTERMINAL_RE = /^([A-Z][a-zA-Z]+(\_?[a-zA-Z0-9])*\'?)$/;
function isTerminal(name) {
  return name === "$" || !NONTERMINAL_RE.test(name);
}
function defineTerminals(registry, name, definitions) {
  for (let c = -1, l = definitions.length; l--; ) {
    const terminal = definitions[++c];
    if (!isRegex(terminal)) {
      throw new Error("Invalid Terminal pattern: " + terminal);
    }
    if (!registry.registerTerminal(terminal, name)) {
      throw new Error("Invalid Terminal pattern: " + terminal);
    }
  }
}
function defineRules(registry, name, definitions) {
  for (let c = -1, l = definitions.length; l--; ) {
    let rule = definitions[++c];
    if (isString(rule) || isRegex(rule)) {
      rule = [rule];
    } else if (!isArray(rule)) {
      throw new Error(
        "Invalid Grammar rule declared in " + name
      );
    }
    const ruleArr = rule;
    let rl = ruleArr.length;
    const ruleMask = [];
    const terminals = {};
    for (; rl--; ) {
      let lexeme = ruleArr[rl];
      let isTerminalToken;
      if (isRegex(lexeme)) {
        if (!registry.terminalExist(lexeme)) {
          registry.registerTerminal(lexeme);
        }
        lexeme = "/" + lexeme.source + "/";
        isTerminalToken = true;
      } else if (!isString(lexeme)) {
        throw new Error(
          "Invalid Grammar rule declared in " + name
        );
      } else {
        isTerminalToken = isTerminal(lexeme);
      }
      ruleMask[rl] = registry.map.generateSymbol(lexeme);
      if (isTerminalToken) {
        terminals[rl] = true;
      }
    }
    registry.registerRule(name, ruleMask, terminals);
  }
}

export {
  isTerminal,
  defineTerminals,
  defineRules
};
//# sourceMappingURL=chunk-VRVDIL3R.mjs.map

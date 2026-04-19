// src/regex/functions/regex-tokenizer.function.ts
var HEX_RE = /^[a-fA-F0-9]{2}$/;
var UTF8_RE = /^[a-fA-F0-9]{4}$/;
var RANGE_RE = /^([0-9]+|[0-9]+,[0-9]*|[0-9]*,[0-9]+)$/;
var SPECIAL_CHAR = {
  b: "\b",
  f: "\f",
  n: "\n",
  r: "\r",
  t: "	",
  v: "\v",
  "\\": "\\",
  B: "\\"
};
function escape(index, regexString) {
  const c = index + 1;
  const len = c + 1;
  const chr = regexString.substring(c, len);
  switch (chr) {
    case "x": {
      const l = c + 2;
      const match = regexString.substring(c + 1, l + 1).match(HEX_RE);
      return match ? [String.fromCharCode(parseInt(match[0], 16)), l] : ["x", len];
    }
    case "u": {
      const l = c + 4;
      const match = regexString.substring(c + 1, l + 1).match(UTF8_RE);
      return match ? [String.fromCharCode(parseInt(match[0], 16)), l] : ["x", len];
    }
    default:
      return [chr in SPECIAL_CHAR ? SPECIAL_CHAR[chr] : chr, len];
  }
}
function range(index, regexString) {
  let c = index;
  let l = regexString.length;
  for (; l--; ) {
    const chr = regexString.charAt(++c);
    if (chr === "}") {
      const sub = regexString.substring(index + 1, c);
      if (RANGE_RE.test(sub)) {
        return [sub, c + 1];
      }
    }
  }
  return null;
}
function tokenize(index, regexString) {
  const len = regexString.length;
  index = Math.max(0, index);
  if (index > len) {
    return null;
  } else if (index === len) {
    return ["$$", null, len + 1];
  }
  let next = index + 1;
  let chr = regexString.charAt(index);
  let token = "char";
  switch (chr) {
    case "\\": {
      const escaped = escape(index, regexString);
      next = escaped[1];
      chr = escaped[0];
      token = "char";
      break;
    }
    case "{": {
      const rangeResult = range(index, regexString);
      if (rangeResult) {
        next = rangeResult[1];
        chr = rangeResult[0];
        token = "range";
      } else {
        throw new Error(
          "Invalid token near " + regexString.substring(
            index,
            Math.min(len, index + 10)
          )
        );
      }
      break;
    }
    case "[":
      if (next < len && regexString.charAt(next) === "^") {
        token = "[^";
        next++;
        break;
      }
    /* falls through */
    case "]":
    case "(":
    case ")":
    case "|":
    case "?":
    case "+":
    case "*":
    case "-":
    case "^":
    case "$":
      token = chr;
      break;
  }
  return token ? [token, chr, next] : null;
}

export {
  tokenize
};
//# sourceMappingURL=chunk-JHCE4ZR2.mjs.map

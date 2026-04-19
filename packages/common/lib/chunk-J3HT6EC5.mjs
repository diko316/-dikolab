import {
  bin2utf
} from "./chunk-RN256LLQ.mjs";
import {
  isString
} from "./chunk-IMQK2X3Q.mjs";

// src/string/functions/decode64.function.ts
var BASE64_MAP = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
var NOT_BASE64_RE = /[^a-zA-Z0-9+/=]/;
var BASE64_EXCESS_REMOVE_RE = /[^a-zA-Z0-9+/]/;
var ONE_BYTE = 255;
var fromCharCode = String.fromCharCode;
function decode64(subject) {
  if (!isString(subject, true) || NOT_BASE64_RE.test(subject)) {
    throw new Error("Invalid [subject] parameter.");
  }
  subject = subject.replace(BASE64_EXCESS_REMOVE_RE, "");
  const buffer = [];
  let bl = 0;
  let excess = 0;
  for (let c = 0; c < subject.length; c++) {
    const code = BASE64_MAP.indexOf(subject.charAt(c));
    const flag = c % 4;
    let chr = 0;
    switch (flag) {
      case 0:
        chr = 0;
        break;
      case 1:
        chr = (excess << 2 | code >> 4) & ONE_BYTE;
        break;
      case 2:
        chr = (excess << 4 | code >> 2) & ONE_BYTE;
        break;
      case 3:
        chr = (excess << 6 | code) & ONE_BYTE;
    }
    excess = code;
    if (c === subject.length - 1 && flag < 3 && chr < 64) {
      break;
    }
    if (flag) {
      buffer[bl++] = fromCharCode(chr);
    }
  }
  return bin2utf(buffer.join(""));
}

export {
  decode64
};
//# sourceMappingURL=chunk-J3HT6EC5.mjs.map

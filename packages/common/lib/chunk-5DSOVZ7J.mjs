import {
  isString
} from "./chunk-IMQK2X3Q.mjs";

// src/string/functions/utf2bin.function.ts
var HALF_BYTE = 128;
var SIX_BITS = 63;
var fromCharCode = String.fromCharCode;
function utf2bin(subject) {
  if (!isString(subject, true)) {
    throw new Error("Invalid [subject] parameter.");
  }
  const utf8 = [];
  let ul = 0;
  for (let c = 0; c < subject.length; c++) {
    let code = subject.charCodeAt(c);
    if (code < HALF_BYTE) {
      utf8[ul++] = fromCharCode(code);
    } else if (code < 2048) {
      utf8[ul++] = fromCharCode(192 | code >> 6);
      utf8[ul++] = fromCharCode(HALF_BYTE | code & SIX_BITS);
    } else if (code < 55296 || code > 57343) {
      utf8[ul++] = fromCharCode(224 | code >> 12);
      utf8[ul++] = fromCharCode(
        HALF_BYTE | code >> 6 & SIX_BITS
      );
      utf8[ul++] = fromCharCode(HALF_BYTE | code & SIX_BITS);
    } else {
      c++;
      code = 65536 + ((code & 1023) << 10 | subject.charCodeAt(c) & 1023);
      utf8[ul++] = fromCharCode(240 | code >> 18);
      utf8[ul++] = fromCharCode(
        HALF_BYTE | code >> 12 & SIX_BITS
      );
      utf8[ul++] = fromCharCode(
        HALF_BYTE | code >> 6 & SIX_BITS
      );
      utf8[ul++] = fromCharCode(HALF_BYTE | code & SIX_BITS);
    }
  }
  return utf8.join("");
}

export {
  utf2bin
};
//# sourceMappingURL=chunk-5DSOVZ7J.mjs.map

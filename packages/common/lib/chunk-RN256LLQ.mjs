import {
  isString
} from "./chunk-IMQK2X3Q.mjs";

// src/string/functions/bin2utf.function.ts
var fromCharCode = String.fromCharCode;
function bin2utf(subject) {
  if (!isString(subject, true)) {
    throw new Error("Invalid [subject] parameter.");
  }
  const utf16 = [];
  let ul = 0;
  for (let c = 0; c < subject.length; c++) {
    const code = subject.charCodeAt(c);
    switch (code >> 4) {
      case 0:
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
        utf16[ul++] = subject.charAt(c);
        break;
      case 12:
      case 13:
        c++;
        utf16[ul++] = fromCharCode(
          (code & 31) << 6 | subject.charCodeAt(c) & 63
        );
        break;
      case 14:
        utf16[ul++] = fromCharCode(
          (code & 15) << 12 | (subject.charCodeAt(++c) & 63) << 6 | subject.charCodeAt(++c) & 63
        );
        break;
    }
  }
  return utf16.join("");
}

export {
  bin2utf
};
//# sourceMappingURL=chunk-RN256LLQ.mjs.map

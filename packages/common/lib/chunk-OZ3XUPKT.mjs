import {
  utf2bin
} from "./chunk-5DSOVZ7J.mjs";
import {
  isString
} from "./chunk-IMQK2X3Q.mjs";

// src/string/functions/encode64.function.ts
var BASE64_MAP = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
function encode64(subject) {
  if (!isString(subject, true)) {
    throw new Error("Invalid [subject] parameter.");
  }
  subject = utf2bin(subject);
  const buffer = [];
  let bl = 0;
  let excess = 0;
  for (let c = 0; c < subject.length; c++) {
    const code = subject.charCodeAt(c);
    const flag = c % 3;
    let chr = "";
    switch (flag) {
      case 0:
        chr = BASE64_MAP.charAt((code & 252) >> 2);
        excess = (code & 3) << 4;
        break;
      case 1:
        chr = BASE64_MAP.charAt(excess | (code & 240) >> 4);
        excess = (code & 15) << 2;
        break;
      case 2:
        chr = BASE64_MAP.charAt(excess | (code & 192) >> 6);
        excess = code & 63;
    }
    buffer[bl++] = chr;
    const end = c === subject.length - 1;
    if (end || flag === 2) {
      buffer[bl++] = BASE64_MAP.charAt(excess);
    }
    if (end) {
      let pad = bl % 4;
      for (pad = pad && 4 - pad; pad--; ) {
        buffer[bl++] = "=";
      }
      break;
    }
  }
  return buffer.join("");
}

export {
  encode64
};
//# sourceMappingURL=chunk-OZ3XUPKT.mjs.map

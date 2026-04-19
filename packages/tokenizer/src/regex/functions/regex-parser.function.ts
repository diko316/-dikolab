import type { RpnItem } from '../types/regex-token.type';
import { tokenize } from './regex-tokenizer.function';
import {
   OPERATOR,
   ENCLOSED_REPLACE,
   ENCLOSED_START,
   ENCLOSED_END,
   BINARY,
   POSTFIX,
   FINAL,
} from '../constants/operators.constant';

export function parse(str: string): RpnItem[] {
   const operator = OPERATOR;
   let index = 0;
   let start = 0;
   let stack:
      | [unknown, [number, number] | [number, number, string], RpnItem]
      | null = null;
   const queue: RpnItem[] = [];
   let ql = 0;
   let lastToken: string | null = null;
   let enclosure: [unknown, string] | null = [null, '('];
   const buffer: RpnItem[] = [];
   let bl = 0;
   let bc = 0;

   for (
      let item = tokenize(index, str);
      item;
      item = tokenize(index, str)
   ) {
      index = item[2];
      let chr = item[1];
      let token = item[0];
      let fill = false;
      const currentEnclosure = enclosure && enclosure[1];

      if (currentEnclosure) {
         const replacements = ENCLOSED_REPLACE[currentEnclosure];
         if (replacements && token in replacements) {
            token = replacements[token];
         }
      }

      if (token in operator) {
         switch (token) {
            case '(':
            case '[':
            case '[^':
               fill = !!lastToken && lastToken !== '|';
         }
      } else {
         switch (lastToken) {
            case 'negative_char':
            case 'char':
            case ']':
            case ']^':
            case ')':
            case '+':
            case '?':
            case '*':
            case 'range':
               fill = true;
         }
      }

      if (fill) {
         buffer[bl++] = [
            currentEnclosure === '['
               ? ','
               : currentEnclosure === '[^'
                 ? '^,'
                 : '.',
            null,
            2,
            start,
            0,
         ];
      }

      if (currentEnclosure === '[^') {
         switch (token) {
            case '-':
               token = '^-';
               break;

            case ']':
               token = ']^';
               break;

            case 'char':
               token = 'negative_char';
         }
      }

      buffer[bl++] = [token, chr, 0, start, index - start];
      start = index;
      lastToken = token;

      let l = bl - bc;
      for (; l--; bc++) {
         const bufItem = buffer[bc];
         token = bufItem[0];
         chr = bufItem[1];

         if (token in operator) {
            const op = operator[token];
            const opName = op[0];
            const precedence = op[1];

            switch (opName) {
               case FINAL:
               case POSTFIX:
               case BINARY:
                  bufItem[2] = opName === BINARY ? 2 : 1;

                  binaryCompare: for (
                     ;
                     stack;
                     stack = stack![0] as typeof stack
                  ) {
                     const stackOp = stack[1];
                     switch (stackOp[0]) {
                        case POSTFIX:
                        case BINARY:
                           if (precedence <= stackOp[1]) {
                              queue[ql++] = stack[2];
                              continue binaryCompare;
                           }
                     }
                     break binaryCompare;
                  }

                  if (opName !== FINAL) {
                     stack = [stack, op, bufItem];
                  } else {
                     queue[ql++] = bufItem;
                  }
                  break;

               case ENCLOSED_START:
                  stack = [stack, op, bufItem];
                  enclosure = [enclosure, token];
                  break;

               case ENCLOSED_END:
                  for (; stack; stack = stack[0] as typeof stack) {
                     const stackOp = stack[1];

                     if (stackOp[0] === ENCLOSED_START) {
                        if (stackOp[2] !== token) {
                           throw new Error(
                              'Unmatched token found ' +
                                 (chr as string),
                           );
                        }
                        const from = stack[2][3];
                        queue[ql++] = [
                           (op as [number, number, string])[2],
                           null,
                           1,
                           from,
                           bufItem[3] - from + 1,
                        ];
                        if (enclosure) {
                           enclosure = enclosure[0] as typeof enclosure;
                        }
                        stack = stack[0] as typeof stack;
                        break;
                     }

                     queue[ql++] = stack[2];
                  }
            }
         } else {
            queue[ql++] = bufItem;
         }
      }
   }

   if (stack) {
      throw new Error('Invalid token found ' + (stack[2][1] as string));
   }

   return queue;
}

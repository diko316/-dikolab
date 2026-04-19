import { parse } from './regex-parser.function';
import type { StateMap } from '../classes/state-map.class';
import { Fragment } from '../classes/fragment.class';
import { Pointer } from '../classes/pointer.class';
import type {
   FragmentBuilder,
   FragmentState,
   SplitNode,
} from '../types/fragment.type';

const PATTERN_ERROR =
   'Patterns resulting to empty token' + ' is not allowed. ';

export function build(
   name: string,
   regex: string,
   stateObject: StateMap,
): StateMap {
   const rpn = parse(regex);
   let c = -1;
   let l = rpn.length;
   let stack: [unknown, Fragment] | null = null;
   let startState: FragmentState | null = null;
   let el = 0;
   const endStates: string[] = [];
   const errorName = name + ' = /' + regex + '/';
   const builder: FragmentBuilder = {
      gen: 0,
      fgen: 0,
   };

   for (; l--; ) {
      const item = rpn[++c];
      const token = item[0];

      switch (token) {
         case '.':
            stack = [
               (stack![0] as [unknown, Fragment])[0],
               (stack![0] as [unknown, Fragment])[1].link(stack![1]),
            ];
            break;

         case '?':
            stack = [stack![0], stack![1].split()];
            break;

         case '+':
            stack = [stack![0], stack![1].repeat()];
            break;

         case '*':
            stack = [stack![0], stack![1].split(true)];
            break;

         case '^,':
         case ',':
         case '|':
            stack = [
               (stack![0] as [unknown, Fragment])[0],
               (stack![0] as [unknown, Fragment])[1].merge(stack![1]),
            ];
            break;

         case '^-':
         case '-':
            stack = [
               (stack![0] as [unknown, Fragment])[0],
               (stack![0] as [unknown, Fragment])[1].fill(stack![1]),
            ];
            break;

         case '$$': {
            if (!stack || stack[0] !== null) {
               throw new Error(
                  'Invalid end of expression. ' + errorName,
               );
            }

            const operand1 = stack[1];
            const operand2 = new Fragment(builder, null);
            operand1.link(operand2);

            const sid = startState!.id;
            let id = operand2.state.id;

            if (id === sid) {
               throw new Error(PATTERN_ERROR + errorName);
            }

            endStates[el++] = id!;

            let split: SplitNode | null = operand1.splitted;

            for (; split; split = split.next) {
               id = split.fragment.state.id;
               if (id === sid) {
                  throw new Error(PATTERN_ERROR + errorName);
               }
               endStates[el++] = id!;
            }
            break;
         }

         case '^':
         case '$':
         case 'char':
         case 'negative_char': {
            const operand1 = new Fragment(
               builder,
               new Pointer(item[1]!, token === 'negative_char'),
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
      stateObject.finalizeFragments(name, stack![1], endStates);
   }

   return stateObject;
}

export const ENCLOSED_START = 2;
export const ENCLOSED_END = 3;
export const BINARY = 4;
export const POSTFIX = 5;
export const FINAL = 6;

export const OPERATOR: Record<
   string,
   [number, number] | [number, number, string]
> = {
   '[': [ENCLOSED_START, 15, ']'],
   '[^': [ENCLOSED_START, 15, ']^'],
   ']': [ENCLOSED_END, 1, '[]'],
   ']^': [ENCLOSED_END, 1, '[^]'],
   '(': [ENCLOSED_START, 15, ')'],
   ')': [ENCLOSED_END, 1, '()'],
   '?': [POSTFIX, 10],
   '+': [POSTFIX, 10],
   '*': [POSTFIX, 10],
   range: [POSTFIX, 10],
   '-': [BINARY, 7],
   '^-': [BINARY, 7],
   '^,': [BINARY, 5],
   ',': [BINARY, 5],
   '.': [BINARY, 5],
   '|': [BINARY, 3],
   $$: [FINAL, 1],
};

const ENCLOSED_CLASS_REPLACE: Record<string, string> = {
   '[': 'char',
   '[^': 'char',
   '?': 'char',
   '+': 'char',
   '*': 'char',
   ',': 'char',
   '|': 'char',
   '(': 'char',
   ')': 'char',
};

export const ENCLOSED_REPLACE: Record<
   string,
   Record<string, string>
> = {
   '[': ENCLOSED_CLASS_REPLACE,
   '[^': ENCLOSED_CLASS_REPLACE,
   '(': {
      '-': 'char',
   },
};

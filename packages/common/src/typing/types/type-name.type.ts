/** Human-readable type name from type() */
export type TypeName =
   | 'scalar'
   | 'regexp'
   | 'regex'
   | 'method'
   | 'native'
   | 'nativeObject'
   | (string & {});

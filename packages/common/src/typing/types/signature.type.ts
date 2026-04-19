/** String literal from Object.prototype.toString */
export type SignatureString =
   | '[object Object]'
   | '[object Array]'
   | '[object Null]'
   | '[object Undefined]'
   | '[object Number]'
   | '[object String]'
   | '[object Boolean]'
   | '[object Function]'
   | '[object Date]'
   | '[object RegExp]'
   | (string & {});

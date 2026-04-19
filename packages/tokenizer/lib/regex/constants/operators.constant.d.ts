export declare const ENCLOSED_START = 2;
export declare const ENCLOSED_END = 3;
export declare const BINARY = 4;
export declare const POSTFIX = 5;
export declare const FINAL = 6;
export declare const OPERATOR: Record<string, [
    number,
    number
] | [number, number, string]>;
export declare const ENCLOSED_REPLACE: Record<string, Record<string, string>>;

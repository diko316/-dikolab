import type { Fragment } from './fragment.class';
export declare class Pointer {
    negative: boolean;
    repeated: boolean;
    chr: string;
    to: Fragment | null;
    next: Pointer | null;
    constructor(chr: string, negative?: boolean);
    clone(overrides?: Record<string, unknown> | false): [Pointer, Pointer];
    point(fragment: Fragment): this;
    last(): Pointer;
    range(to: Pointer): [Pointer, Pointer] | null;
}

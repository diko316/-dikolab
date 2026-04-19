import type { Fragment } from '../classes/fragment.class';
import type { Pointer } from '../classes/pointer.class';
export interface FragmentState {
    id: string | null;
}
export interface OutgoingNode {
    fragment: Fragment;
    next: OutgoingNode | null;
}
export interface SplitNode {
    fragment: Fragment;
    next: SplitNode | null;
}
export interface RepeatNode {
    pointer: Pointer;
    next: RepeatNode | null;
}
export interface FragmentBuilder {
    gen: number;
    fgen: number;
}

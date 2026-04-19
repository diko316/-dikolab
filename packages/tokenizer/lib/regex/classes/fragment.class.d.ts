import type { Pointer } from './pointer.class';
import type { FragmentBuilder, FragmentState, OutgoingNode, RepeatNode, SplitNode } from '../types/fragment.type';
export declare class Fragment {
    id: string;
    state: FragmentState;
    builder: FragmentBuilder;
    base: Fragment | null;
    splitted: SplitNode | null;
    repeated: RepeatNode | null;
    pointer: Pointer | null;
    lastPointer: Pointer | null;
    outgoing: OutgoingNode | null;
    lastOutgoing: OutgoingNode | null;
    constructor(builder: FragmentBuilder, pointer: Pointer | null);
    /**
     * Links this fragment to operand2 by
     * connecting outgoing edges and propagating
     * splits/repeats through the NFA graph.
     */
    link(operand2: Fragment): Fragment;
    /**
     * Clones this fragment via prototype chain
     * sharing — the clone shares structural
     * properties with the original but can be
     * independently mutated.
     */
    clone(): this;
    split(repeat?: boolean): this;
    repeat(): this;
    fill(operand2: Fragment): Fragment;
    merge(operand2: Fragment): Fragment;
    applyState(): FragmentState;
}

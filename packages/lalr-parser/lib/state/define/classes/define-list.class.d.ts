type ListNode<T> = [ListNode<T> | null, T];
export declare class DefineList<T> {
    first: ListNode<T> | null;
    last: ListNode<T> | null;
    shift(): T | null;
    pop(): T | null;
    push(value: T): this;
}
export {};

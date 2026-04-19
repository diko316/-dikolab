/** LR item descriptor for closure computation */
export interface ClosureItem {
    id: string;
    production: string;
    index: number;
    before: string | null;
    after: string | null;
    terminal: boolean;
    token: string | null;
    params?: number;
}
/**
 * Closure output: items array and
 * token-grouped transitions
 */
export type ClosureResult = [string[], [string, string[]][]];

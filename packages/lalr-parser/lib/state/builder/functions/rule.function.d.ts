import type { Registry } from '../classes/registry.class';
export declare function isTerminal(name: string): boolean;
export declare function defineTerminals(registry: Registry, name: string, definitions: RegExp[]): void;
export declare function defineRules(registry: Registry, name: string, definitions: unknown[]): void;

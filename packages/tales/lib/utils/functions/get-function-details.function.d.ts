import { AnyFunction } from '../types/utility.type';
export declare function getFunctionDetails<Fn extends AnyFunction>(fn: Fn): [name: string, parameters: string];

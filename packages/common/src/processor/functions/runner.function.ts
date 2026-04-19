import type { Any } from '../../typing/types/any.type';
import type { AnyFunction } from '../../typing/types/any-function.type';
import type { AnyObject } from '../../typing/types/any-object.type';
import { isString } from '../../type-checking/functions/is-string.function';
import { isMethod } from '../../type-checking/functions/is-method.function';
import { isIterable } from '../../type-checking/functions/is-iterable.function';
import { BaseMiddleware } from '../classes/base-middleware.class';

const NAME_RE = /^(([^.]+\.)*)((before|after):)?([a-zA-Z0-9_\-.]+)$/;
const POSITION_BEFORE = 1;
const POSITION_AFTER = 2;
const RUNNERS: AnyObject = {};
const NAMESPACES: AnyObject = {};
const INVALID_NAME = 'Invalid [name] parameter.';
const INVALID_HANDLER = 'Invalid [handler] parameter.';

function parseName(name: string): [number, string] | undefined {
   const match = isString(name) && name.match(NAME_RE);

   if (match) {
      const namespace = match[1];
      const position =
         match[4] === 'before' ? POSITION_BEFORE : POSITION_AFTER;
      return [position, (namespace || '') + match[5]];
   }

   return undefined;
}

function getPositionAccess(input: number): string {
   return input === POSITION_BEFORE ? 'before' : 'after';
}

function getRunners(
   name: string,
): [AnyObject, string, number] | undefined {
   const list = RUNNERS;
   const parsed = parseName(name);

   if (parsed) {
      const access = ':' + parsed[1];

      if (access in list) {
         const position = parsed[0];
         return [
            list[access] as AnyObject,
            getPositionAccess(position),
            position,
         ];
      }
   }

   return undefined;
}

function get(name: string): Any[] | undefined {
   const info = getRunners(name);
   if (info) {
      return info[0][info[1]] as Any[];
   }
   return undefined;
}

function purgeRunners(name: string, after?: boolean | null): void {
   const info = getRunners(name);

   if (info) {
      let access: string | false;

      switch (after) {
         case true:
            access = 'after';
            break;
         case false:
            access = 'before';
            break;
         default:
            access = false;
      }

      if (!access || access === 'before') {
         const runners = info[0].before as Any[];
         runners.splice(0, runners.length);
      }

      if (!access || access === 'after') {
         const runners = info[0].after as Any[];
         runners.splice(0, runners.length);
      }
   }
}

/**
 * Executes registered handlers for a named
 * runner
 *
 * @param name - Runner name
 * @param args - Arguments to pass
 * @param scope - Execution context
 * @returns Result from handler chain
 */
export function run(name: string, args?: Any, scope?: Any): Any {
   if (!isString(name)) {
      throw new Error(INVALID_NAME);
   }

   const runners = get(name);

   if (runners) {
      const resolvedScope = scope === undefined ? null : scope;

      let resolvedArgs: Any[] = isIterable(args)
         ? Array.prototype.slice.call(args, 0)
         : [];

      let result: Any;

      for (let c = 0; c < runners.length; c++) {
         result = (runners[c] as AnyFunction).apply(
            resolvedScope,
            resolvedArgs,
         );
         if (result !== undefined) {
            resolvedArgs = [result];
         }
      }

      resolvedArgs.splice(0, resolvedArgs.length);

      return result;
   }

   return undefined;
}

/**
 * Registers a handler for a named runner
 *
 * @param name - Runner name with optional
 *   "before:" or "after:" prefix
 * @param handler - Callback to register
 */
export function register(name: string, handler: AnyFunction): void {
   const list = RUNNERS;

   if (!isString(name)) {
      throw new Error(INVALID_NAME);
   }

   const parsed = parseName(name);

   if (!isMethod(handler)) {
      throw new Error(INVALID_HANDLER);
   }

   if (parsed) {
      const resolvedName = parsed[1];
      const access = ':' + resolvedName;

      if (!(access in list)) {
         list[access] = {
            name: resolvedName,
            before: [],
            after: [],
         };
      }

      const items = (list[access] as AnyObject)[
         getPositionAccess(parsed[0])
      ] as Any[];

      items[items.length] = handler;
   }
}

/**
 * Clears all handlers for a named runner
 *
 * @param name - Runner name
 * @param after - If true, clear only
 *   after-handlers
 */
export function clearRunner(name: string, after?: boolean): void {
   if (!isString(name)) {
      throw new Error(INVALID_NAME);
   }

   purgeRunners(name, after);
}

/**
 * Returns a BaseMiddleware for a namespace
 *
 * @param name - Namespace identifier
 * @returns Cached middleware instance
 */
export function middleware(name: string): BaseMiddleware {
   const list = NAMESPACES;

   if (!isString(name)) {
      throw new Error(INVALID_NAME);
   }

   const access = name + '.';

   if (!(access in list)) {
      list[access] = new BaseMiddleware(access);
   }

   return list[access] as BaseMiddleware;
}

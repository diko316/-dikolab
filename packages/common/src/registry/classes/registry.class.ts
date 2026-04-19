import type { Any } from '../../typing/types/any.type';
import type { AnyObject } from '../../typing/types/any-object.type';
import {
   ARRAY,
   NUMBER,
   OBJECT,
   STRING,
} from '../../type-checking/constants/signatures.constant';
import { signature } from '../../type-checking/functions/signature.function';
import { assign } from '../../object/functions/assign.function';
import { contains } from '../../object/functions/contains.function';
import { clear as clearObject } from '../../object/functions/clear.function';
import { clone } from '../../object/functions/clone.function';
import { jsonFind } from '../../json-path/functions/json-find.function';
import { jsonFill } from '../../json-path/functions/json-fill.function';
import { jsonUnset } from '../../json-path/functions/json-unset.function';
import { jsonExists } from '../../json-path/functions/json-exists.function';
import { isString } from '../../type-checking/functions/is-string.function';

const ERROR_NAME = 'Invalid [name] parameter.';
const ERROR_PATH = 'Invalid [path] parameter.';

function isIndex(name: Any): boolean {
   switch (signature(name)) {
      case STRING:
      case NUMBER:
         return true;
   }
   return false;
}

/** Hierarchical key-value store with JSON path support */
export class Registry {
   data: AnyObject = {};

   /**
    * Retrieves a value by key
    *
    * @param name - Property key
    * @returns Stored value, or undefined
    */
   get(name: string | number): Any {
      if (!isIndex(name)) {
         throw new Error(ERROR_NAME);
      }

      if (contains(this.data, name)) {
         return this.data[name];
      }

      return undefined;
   }

   /**
    * Sets a value by key or merges an object
    *
    * @param name - Property key or object
    * @param value - Value to store
    * @returns This registry instance
    */
   set(name: string | number | AnyObject, value?: Any): this {
      switch (signature(name)) {
         case OBJECT:
         case ARRAY:
            assign(this.data, name as AnyObject, true);
            break;
         case STRING:
         case NUMBER:
            this.data[name as string | number] = value;
            break;
         default:
            throw new Error(ERROR_NAME);
      }

      return this;
   }

   /**
    * Removes a value by key
    *
    * @param name - Property key
    * @returns This registry instance
    */
   unset(name: string | number): this {
      if (!isIndex(name)) {
         throw new Error(ERROR_NAME);
      }

      if (contains(this.data, name)) {
         delete this.data[name];
      }

      return this;
   }

   /**
    * Finds a value using a JSON path
    *
    * @param path - JSON path string
    * @returns Value at path, or undefined
    */
   find(path: string): Any {
      if (!isString(path)) {
         throw new Error(ERROR_PATH);
      }

      return jsonFind(path, this.data);
   }

   /**
    * Inserts a value at a JSON path
    *
    * @param path - JSON path string
    * @param value - Value to insert
    * @returns This registry instance
    */
   insert(path: string, value: Any): this {
      if (!isString(path)) {
         throw new Error(ERROR_PATH);
      }

      jsonFill(path, this.data, value);
      return this;
   }

   /**
    * Removes a value at a JSON path
    *
    * @param path - JSON path string
    * @returns This registry instance
    */
   remove(path: string): this {
      if (!isString(path)) {
         throw new Error(ERROR_PATH);
      }

      jsonUnset(path, this.data);
      return this;
   }

   /**
    * Checks if a key exists in the store
    *
    * @param name - Property key
    * @returns True if key exists
    */
   exists(name: string | number): boolean {
      if (!isIndex(name)) {
         throw new Error(ERROR_NAME);
      }

      return contains(this.data, name);
   }

   /**
    * Checks if a JSON path exists
    *
    * @param path - JSON path string
    * @returns True if path exists
    */
   pathExists(path: string): boolean {
      if (!isString(path)) {
         throw new Error(ERROR_PATH);
      }

      return jsonExists(path, this.data);
   }

   /**
    * Merges an object into the store
    *
    * @param value - Object to merge
    * @returns This registry instance
    */
   assign(value: AnyObject): this {
      switch (signature(value)) {
         case OBJECT:
         case ARRAY:
            assign(this.data, value, true);
            return this;
         default:
            throw new Error('Invalid [value] parameter');
      }
   }

   /**
    * Removes all entries from the store
    *
    * @returns This registry instance
    */
   clear(): this {
      clearObject(this.data);
      return this;
   }

   /**
    * Deep-clones all stored data
    *
    * @returns Cloned data object
    */
   clone(): AnyObject {
      return clone(this.data, true) as AnyObject;
   }
}

/**
 * Creates a new Registry instance
 *
 * @returns New Registry instance
 */
export function createRegistry(): Registry {
   return new Registry();
}

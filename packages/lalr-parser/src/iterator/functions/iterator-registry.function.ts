import { isString, isMethod } from '@dikolab/common';

import { BaseIterator } from '../classes/base-iterator.class';
import type { IteratorConstructor } from '../types/iterator.type';

const defaultIteratorName = 'base';
const ITERATORS: Record<string, IteratorConstructor> = {};

/**
 * Registers an iterator class by name
 *
 * @param name - Iterator identifier
 * @param Class - Iterator class extending
 *   BaseIterator
 * @returns true on success
 */
export function registerIterator(
   name: string,
   Class: IteratorConstructor,
): boolean {
   const Base = BaseIterator;

   if (!isString(name)) {
      throw new Error('Invalid iterator name parameter.');
   }

   if (
      !isMethod(Class) ||
      (Class !== (Base as unknown) &&
         !(Class.prototype instanceof Base))
   ) {
      throw new Error('Invalid iterator Class parameter.');
   }

   ITERATORS[':' + name] = Class;

   return true;
}

export function getIterator(name: string): IteratorConstructor | null {
   const list = ITERATORS;

   if (isString(name)) {
      const key = ':' + name;
      if (key in list) {
         return list[key];
      }
   }

   return null;
}

export const defaultIterator = defaultIteratorName;

registerIterator(
   defaultIteratorName,
   BaseIterator as unknown as IteratorConstructor,
);

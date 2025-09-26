import { describe, expect, it } from 'vitest';
import { RouteMatcher } from './route-matcher.class';

describe('RouteMatcher', () => {
   it('should be able to add routes', () => {
      const matcher = new RouteMatcher();

      matcher.add('/product/list');
      matcher.add('/product/:id');
      matcher.add('PATCH /product/:id');

      matcher.add('/product/:id/price');
      matcher.add('POST /product/:id/price');
   });

   it('should be able to match routes', () => {
      const matcher = new RouteMatcher();

      matcher.add('/product/list');
      matcher.add('/product/:id');
      matcher.add('PATCH /product/:id');

      matcher.add('/product/:id/price');
      matcher.add('POST /product/:id/price');

      const input = 'PATCH /product/:id';
      const output = {
         method: 'patch',
         path: '/product/:id',
         items: [
            {
               type: 0,
               raw: 'product',
               name: 'product',
            },
            {
               type: 1,
               raw: ':id',
               name: 'id',
            },
         ],
      };
      const actualOutput = matcher.match(input);

      expect(actualOutput?.method).toBe(output.method);
      expect(actualOutput?.path).toBe(output.path);
      expect(actualOutput?.items).toEqual(output.items);
   });
});

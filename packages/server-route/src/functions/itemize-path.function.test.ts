import { describe, expect, it } from 'vitest';
import { itemizePath } from './itemize-path.function';

describe('itemizePath() function', () => {
   it('should break url path into resource names', () => {
      const input = '/path/ni/:id';
      const output = {
         method: 'get',
         items: ['path', 'ni', ':id'],
      };

      const actualOutput = itemizePath(input);

      expect(actualOutput).toEqual(output);
   });

   it('should break url into method and path into resource names', () => {
      const input = 'POST /path/ni/:id';
      const output = {
         method: 'post',
         items: ['path', 'ni', ':id'],
      };

      const actualOutput = itemizePath(input);

      expect(actualOutput).toEqual(output);
   });
});

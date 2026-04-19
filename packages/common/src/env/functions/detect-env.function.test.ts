import { describe, it, expect } from 'vitest';
import {
   browser,
   nodejs,
   nodeVersions,
   userAgent,
} from './detect-env.function';

describe('detect-env', () => {
   describe('browser', () => {
      it('should be a boolean', () => {
         expect(typeof browser).toBe('boolean');
      });

      it('should be false in Node.js ' + 'test environment', () => {
         expect(browser).toBe(false);
      });
   });

   describe('nodejs', () => {
      it('should be a boolean', () => {
         expect(typeof nodejs).toBe('boolean');
      });

      it('should be true in Node.js ' + 'test environment', () => {
         expect(nodejs).toBe(true);
      });
   });

   describe('nodeVersions', () => {
      it('should be an object in Node.js ' + 'environment', () => {
         expect(nodeVersions).toBeTruthy();
         expect(typeof nodeVersions).toBe('object');
      });

      it('should contain a node version string', () => {
         expect(nodeVersions).toBeTruthy();
         if (nodeVersions) {
            expect(typeof nodeVersions.node).toBe('string');
         }
      });
   });

   describe('userAgent', () => {
      it('should be a string', () => {
         expect(typeof userAgent).toBe('string');
      });

      it('should contain "Node" in Node.js ' + 'environment', () => {
         expect(userAgent).toContain('Node');
      });

      it('should contain V8 info', () => {
         expect(userAgent).toContain('V8');
      });

      it('should contain arch info', () => {
         expect(userAgent).toContain('arch');
      });
   });
});

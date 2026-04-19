import { describe, expect, it } from 'vitest';
import { StateMap } from './state-map.class';

describe('StateMap', () => {
   it('should create with default start state', () => {
      const map = new StateMap();
      expect(map.start).toBe('start');
      expect(map.states['start']).toBeDefined();
   });

   it('should create with custom start state', () => {
      const map = new StateMap('init');
      expect(map.start).toBe('init');
      expect(map.states['init']).toBeDefined();
   });

   it('should generate unique state IDs', () => {
      const map = new StateMap();
      const s1 = map.generateState();
      const s2 = map.generateState();
      expect(s1).not.toBe(s2);
   });

   it('should pass through string IDs', () => {
      const map = new StateMap();
      expect(map.generateState('myState')).toBe('myState');
   });

   it('should export and import definitions', () => {
      const map = new StateMap();
      map.priority = ['token1'];
      map.stateGenId = 5;

      const exported = map.exportDefinition();
      const map2 = new StateMap();
      map2.importDefinition(exported);

      expect(map2.stateGenId).toBe(5);
      expect(map2.priority).toEqual(['token1']);
      expect(map2.start).toBe('start');
   });

   it('should import from JSON string', () => {
      const map = new StateMap();
      const exported = map.exportDefinition();
      const json = JSON.stringify(exported);

      const map2 = new StateMap();
      map2.importDefinition(json);

      expect(map2.start).toBe('start');
   });

   it('should throw on invalid import data', () => {
      const map = new StateMap();

      expect(() => map.importDefinition(null as never)).toThrow();
      expect(() => map.importDefinition(123 as never)).toThrow();
      expect(() => map.importDefinition('invalid json{')).toThrow();
   });
});

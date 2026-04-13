import { platformAgnosticLib } from './platform-agnostic-lib';

describe('platformAgnosticLib', () => {
   it('should work', () => {
      expect(platformAgnosticLib()).toEqual('platform-agnostic-lib');
   });
});

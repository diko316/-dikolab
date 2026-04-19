import type { AnyObject } from '../../typing/types/any-object.type';

const G = globalThis as AnyObject;

function isBrowser(): boolean {
   try {
      return (
         'document' in G &&
         'window' in G &&
         (G.document as AnyObject).defaultView === G.window
      );
   } catch {
      return false;
   }
}

function getNodeVersions(): AnyObject | false {
   try {
      if ('process' in G && G.process && G.process.versions) {
         return G.process.versions as AnyObject;
      }
   } catch {
      // ignore
   }
   return false;
}

function getUserAgent(
   isBrowserEnv: boolean,
   versions: AnyObject | false,
): string {
   if (isBrowserEnv) {
      try {
         return String(
            G.navigator && (G.navigator as AnyObject).userAgent,
         );
      } catch {
         return 'Unknown';
      }
   }

   if (versions && 'process' in G) {
      const proc = G.process as AnyObject;
      return (
         'Node ' +
         String(versions.node) +
         '(' +
         String(proc.platform) +
         '; V8 ' +
         String(versions.v8 || 'unknown') +
         '; arch ' +
         String(proc.arch) +
         ')'
      );
   }

   return 'Unknown';
}

/** Detects if running in a browser environment */
export const browser: boolean = isBrowser();
/** Detects Node.js version information */
export const nodeVersions: AnyObject | false = getNodeVersions();
/** Detects if running in a Node.js environment */
export const nodejs: boolean = !!nodeVersions && !!nodeVersions.node;
/** Detects the current runtime user agent string */
export const userAgent: string = getUserAgent(browser, nodeVersions);

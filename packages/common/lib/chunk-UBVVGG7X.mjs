// src/env/functions/detect-env.function.ts
var G = globalThis;
function isBrowser() {
  try {
    return "document" in G && "window" in G && G.document.defaultView === G.window;
  } catch {
    return false;
  }
}
function getNodeVersions() {
  try {
    if ("process" in G && G.process && G.process.versions) {
      return G.process.versions;
    }
  } catch {
  }
  return false;
}
function getUserAgent(isBrowserEnv, versions) {
  if (isBrowserEnv) {
    try {
      return String(
        G.navigator && G.navigator.userAgent
      );
    } catch {
      return "Unknown";
    }
  }
  if (versions && "process" in G) {
    const proc = G.process;
    return "Node " + String(versions.node) + "(" + String(proc.platform) + "; V8 " + String(versions.v8 || "unknown") + "; arch " + String(proc.arch) + ")";
  }
  return "Unknown";
}
var browser = isBrowser();
var nodeVersions = getNodeVersions();
var nodejs = !!nodeVersions && !!nodeVersions.node;
var userAgent = getUserAgent(browser, nodeVersions);

export {
  browser,
  nodeVersions,
  nodejs,
  userAgent
};
//# sourceMappingURL=chunk-UBVVGG7X.mjs.map

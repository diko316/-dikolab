// src/actor/functions/intersect-roles.function.ts
function intersectRoles(pool, target) {
  const set = new WeakSet(pool);
  return target.filter((role) => set.has(role));
}

export {
  intersectRoles
};
//# sourceMappingURL=chunk-M4EKON62.mjs.map

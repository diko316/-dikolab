function intersectRoles(pool, target) {
    const set = new WeakSet(pool);
    return target.filter((role) => set.has(role));
}

export { intersectRoles };
//# sourceMappingURL=intersect-roles.function.mjs.map

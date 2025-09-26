const BOUNDARY_NAME_PATTERN = /^([^:]+):(.+)$/;
function createBoundaryNameDetails(name) {
    if (!BOUNDARY_NAME_PATTERN.test(name)) {
        throw new SyntaxError(`${name} Boundary Name is malformed.`);
    }
    const [rawType, rawTitle] = name
        .match(BOUNDARY_NAME_PATTERN)
        ?.slice(1) || ['', ''];
    const type = rawType.trim();
    const title = rawTitle.trim();
    const id = `${type}:${title}`;
    return [type, title, id];
}

export { createBoundaryNameDetails };
//# sourceMappingURL=create-boundary-name-details.function.mjs.map

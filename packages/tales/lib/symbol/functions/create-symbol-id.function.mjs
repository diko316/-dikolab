function createSymbolId(typeOrId, name) {
    if (typeof name === 'string') {
        return `${typeOrId}<${name}>`;
    }
    return typeOrId;
}

export { createSymbolId };
//# sourceMappingURL=create-symbol-id.function.mjs.map

import { getInstanceValueMap } from './get-instance-value-map.function.mjs';

function get(instance, propertyName) {
    const repo = getInstanceValueMap(propertyName);
    if (!repo) {
        return undefined;
    }
    return repo.get(instance);
}

export { get };
//# sourceMappingURL=get.function.mjs.map

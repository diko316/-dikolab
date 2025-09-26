import { set, get } from '@dikolab/private-parts';

function createSessionData(data) {
    return Object.keys(data).reduce((newData, key) => {
        set(newData, key, data[key]);
        Object.defineProperty(newData, key, {
            enumerable: true,
            configurable: false,
            get() {
                return get(newData, key);
            },
        });
        return newData;
    }, {});
}

export { createSessionData };
//# sourceMappingURL=create-session-data.function.mjs.map

// src/usecase/functions/create-session-data.function.ts
import { get, set } from "@dikolab/private-parts";
function createSessionData(data) {
  return Object.keys(data).reduce(
    (newData, key) => {
      set(newData, key, data[key]);
      Object.defineProperty(newData, key, {
        enumerable: true,
        configurable: false,
        get() {
          return get(newData, key);
        }
      });
      return newData;
    },
    {}
  );
}

export {
  createSessionData
};
//# sourceMappingURL=chunk-WJ7ZSJ3X.mjs.map

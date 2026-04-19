import { get, set } from '@dikolab/private-parts';

export function createSessionData<Data extends object>(
   data: Data,
): Readonly<Data> {
   return (Object.keys(data) as (keyof Data)[]).reduce(
      (newData, key) => {
         set(newData, key, data[key]);
         Object.defineProperty(newData, key, {
            enumerable: true,
            configurable: false,
            get() {
               // eslint-disable-next-line @typescript-eslint/no-unsafe-return
               return get(newData, key);
            },
         });

         return newData;
      },
      {} as Readonly<Data>,
   );
}

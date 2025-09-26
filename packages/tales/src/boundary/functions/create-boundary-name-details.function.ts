const BOUNDARY_NAME_PATTERN = /^([^:]+):(.+)$/;

export function createBoundaryNameDetails<
   Type extends string,
   Title extends string,
>(name: `${Type}:${Title}`) {
   if (!BOUNDARY_NAME_PATTERN.test(name)) {
      throw new SyntaxError(`${name} Boundary Name is malformed.`);
   }

   const [rawType, rawTitle] = name
      .match(BOUNDARY_NAME_PATTERN)
      ?.slice(1) || ['', ''];

   const type = rawType.trim() as Type;
   const title = rawTitle.trim() as Title;
   const id = `${type}:${title}` as `${Type}:${Title}`;

   return [type, title, id] as const;
}

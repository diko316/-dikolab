export interface UsecaseSymbolJSONObject<Type, Name> {
   type: Type;
   name: Name;
}

export interface UsecaseSymbolJSON<Type, Name> {
   toJSON(): UsecaseSymbolJSONObject<Type, Name>;
}

import type { Lexeme } from '../../lexeme/classes/lexeme.class';

/** Element in a grammar rule production */
export type GrammarRuleItem = string | RegExp | (string | RegExp)[];

/**
 * Element in the alternating
 * name/rule definitions array
 */
export type GrammarDefinitionItem = string | GrammarRuleItem[];

/**
 * Callback map for parse() reducers
 * keyed by grammar rule name
 */
export type ReducerMap = Record<
   string,
   (name: string, value: unknown, lexeme: Lexeme) => unknown
>;

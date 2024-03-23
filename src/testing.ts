/* eslint-disable @typescript-eslint/naming-convention */
import type {
	Union,
	List,
	String,
	Number,
} from 'ts-toolbelt';

import type {
	Extends,
	Try,
	Keys,
} from 'ts-toolbelt/out/Any/_api';

import type {
	If,
} from 'ts-toolbelt/out/Any/If';
import type {
	And,
	Not,
	Or,
	Xor,
} from 'ts-toolbelt/out/Boolean/_api';

import type {
	Split,
	Join,
} from 'ts-toolbelt/out/String/_api';



/**
 * === _**@blake.regalia/meta**_ ===
 * 
 * Unique symbol used to create opaque types for meta debugging. {@link Debug}.
 */
declare const debug_hint: unique symbol;


/**
 * === _**@blake.regalia/meta**_ ===
 * 
 * ```ts
 * type Debug<
 * 	thing: any,
 * 	hint: any,
 * > ==> thing
 * ```
 * 
 * Creates an opaque type atop `thing` with the given `hint` associated with the {@link debug_hint} key.
 */
export type Debug<
	w_type extends any,
	w_hint extends any,
> = {
	[debug_hint]: w_hint;
} & w_type;


/**
 * Labeled Boolean meta-type for False values
 */
export type False = 0;


/**
 * Labeled Boolean meta-type for True values
 */
export type True = 1;


/**
 * Labeled Boolean meta-type for True or False values
 */
export type Bool = True | False;


/**
 * Casts a meta-value to the Boolean meta-type
 */
export type AsBool<w_input> = Try<w_input, Bool, Bool>;


/**
 * Converts a Boolean meta-value to a boolean type
 */
export type ToPrimitiveBoolean<
	Input extends Bool,
> = [Input] extends [True]
	? true
	: ([Input] extends [False]
		? false
		: (Input extends boolean
			? Input
			: boolean
		)
	);


/**
 * === _**@blake.regalia/meta**_ ===
 * 
 * ```ts
 * type ASSERT_TRUE<
 * 	test: Bool | boolean
 * > ==> True | False
 * ```
 * Returns {@link True} if `test` is exactly `True` or `true`; otherwise returns {@link False}
 */
export type ASSERT_TRUE<
	Test extends True | False | true | false,
> = [Test] extends [True]
	? True
	: ([Test] extends [true]
		? True
		: False
	);


/**
 * === _**@blake.regalia/meta**_ ===
 * 
 * ```ts
 * type ASSERT_FALSE<
 * 	test: Bool | boolean
 * > ==> True | False
 * ```
 * Returns {@link True} if `test` is exactly `False` or `false`; otherwise returns {@link False}
 */
export type ASSERT_FALSE<
	Test extends True | False | true | false,
> = [Test] extends [False]
	? True
	: ([Test] extends [false]
		? True
		: False
	);


/**
 * === _**@blake.regalia/meta**_ ===
 * 
 * ```ts
 * type ASSERT_BOOLEAN<
 * 	test: Bool | boolean
 * > ==> True | False
 * ```
 * Returns {@link True} if `test` is exactly the union type {@link Bool} or `boolean`; otherwise returns {@link False}
 */
export type ASSERT_BOOLEAN<
	Test extends True | False | true | false,
> = [Test] extends [False]
	? False
	: ([Test] extends [True]
		? False
		: ([Test] extends [false]
			? False
			: ([Test] extends [true]
				? False
				: True
			)
		)
	);



export type AsString<Any> = [Any] extends [string]
	? Any
	: string;

export type ASSERT_NEVER<Test> = [Test] extends [never]? 1: 0;

export type ASSERT_STRING<s_thing extends string> = [Not<IsOnlyLiteralStrings<s_thing>>] extends [True]? 1: 0;

export type ASSERT_MATCH<s_a extends string, s_b extends string> = [StringsMatch<s_a, s_b>] extends [True]? 1: 0;

export type ASSERT_SAME<w_a, w_b> = [And<Extends<w_a, w_b>, Extends<w_b, w_a>>] extends [True]? 1: 0;

export type ASSERT_VOID<w_thing> = ASSERT_SAME<w_thing, void>;

export type ASSERT_EXTENDS<w_a, w_b> = Extends<w_a, w_b>;

{
	/* eslint-disable @typescript-eslint/no-unused-vars */
	const At_t: ASSERT_TRUE<true> = 1;
	const At_f: ASSERT_TRUE<false> = 0;
	const At_b: ASSERT_TRUE<boolean> = 0;

	const Af_t: ASSERT_FALSE<true> = 0;
	const Af_f: ASSERT_FALSE<false> = 1;
	const Af_b: ASSERT_FALSE<boolean> = 0;

	const Ab_t: ASSERT_BOOLEAN<true> = 0;
	const Ab_f: ASSERT_BOOLEAN<false> = 0;
	const Ab_b: ASSERT_BOOLEAN<boolean> = 1;

	const Af_Bf: ASSERT_FALSE<And<False, False>> = 1;
	const Af_Bt: ASSERT_FALSE<And<False, True>> = 1;
	const At_Bf: ASSERT_FALSE<And<True, False>> = 1;
	const At_Bt: ASSERT_TRUE<And<True, True>> = 1;

	const Ab_Bb: ASSERT_BOOLEAN<And<Bool, Bool>> = 1;
	const Ab_Bf: ASSERT_FALSE<And<Bool, False>> = 1;
	const Ab_Bt: ASSERT_BOOLEAN<And<Bool, True>> = 1;
	const Af_Bb: ASSERT_FALSE<And<False, Bool>> = 1;
	const At_Bb: ASSERT_BOOLEAN<And<True, Bool>> = 1;

	const AfIBf: ASSERT_FALSE<Or<False, False>> = 1;
	const AfIBt: ASSERT_TRUE<Or<False, True>> = 1;
	const AtIBf: ASSERT_TRUE<Or<True, False>> = 1;
	const AtIBt: ASSERT_TRUE<Or<True, True>> = 1;

	const AbIBb: ASSERT_BOOLEAN<Or<Bool, Bool>> = 1;
	const AbIBf: ASSERT_BOOLEAN<Or<Bool, False>> = 1;
	const AbIBt: ASSERT_TRUE<Or<Bool, True>> = 1;
	const AfIBb: ASSERT_BOOLEAN<Or<False, Bool>> = 1;
	const AtIBb: ASSERT_TRUE<Or<True, Bool>> = 1;
	/* eslint-enable @typescript-eslint/no-unused-vars */
}


/**
 * `<Test extends string|void> => true | false`
 * 
 * Deduces whether the given type `Test` contains only literal strings:
 * 
 *     IsOnlyLiteralStrings<'A'>  // true
 *     IsOnlyLiteralStrings<'A' | 'B'>  // true
 *     IsOnlyLiteralStrings<string>  // false
 *     IsOnlyLiteralStrings<string | 'A'>  // false
 *     IsOnlyLiteralStrings<string | 'A' | 'B'>  // false
 *     IsOnlyLiteralStrings<void>  // false
 */
export type IsOnlyLiteralStrings<Test extends string | void> =
	[Test] extends [string]
		? ([Test] extends [`${infer ActualTest}`]
			? True
			: False
		): False;

{
	/* eslint-disable @typescript-eslint/no-unused-vars */
	const A: ASSERT_TRUE<IsOnlyLiteralStrings<'A'>> = 1;
	const AB: ASSERT_TRUE<IsOnlyLiteralStrings<'A' | 'B'>> = 1;
	const S: ASSERT_FALSE<IsOnlyLiteralStrings<string>> = 1;
	// const SA: ASSERT_FALSE<IsOnlyLiteralStrings<string | 'A'>> = 1;
	// const SAB: ASSERT_FALSE<IsOnlyLiteralStrings<string | 'A' | 'B'>> = 1;
	const O: ASSERT_FALSE<IsOnlyLiteralStrings<void>> = 1;
	/* eslint-enable @typescript-eslint/no-unused-vars */
}


/**
 * === _**@blake.regalia/meta**_ ===
 * 
 * ```ts
 * type AutoString<
 * 	value: any,
 * 	fallback: string=string
 * > ==> string
 * ```
 * 
 * Returns the given `value` if it is a `string`, otherwise returns `fallback`
 * 
 * --- Examples: ---
 * ```ts
 *     AutoString<'A'>  // 'A'
 *     AutoString<void>  // string
 *     AutoString<'A', 'Z'>  // 'A'
 *     AutoString<void, 'Z'>  // 'Z'
 *     AutoString<12, 'Z'>  // 'Z'
 *     AutoString<'A' | 'B'>  // 'A' | 'B'
 *     AutoString<void, 'Y' | 'Z'>  // 'Y' | 'Z'
 * ```
 */
export type AutoString<
	z_value,
	w_fallback extends string=string,
> = z_value extends string
	? (z_value extends undefined
		? w_fallback
		: z_value
	)
	: w_fallback;

{
	/* eslint-disable @typescript-eslint/no-unused-vars */
	const _: ASSERT_MATCH<AutoString<''>, ''> = 1;
	const A: ASSERT_MATCH<AutoString<'A'>, 'A'> = 1;
	const O: ASSERT_STRING<AutoString<void>> = 1;
	const NZ: ASSERT_MATCH<AutoString<12, 'Z'>, 'Z'> = 1;
	const _Z: ASSERT_MATCH<AutoString<'', 'Z'>, ''> = 1;
	const AZ: ASSERT_MATCH<AutoString<'A', 'Z'>, 'A'> = 1;
	const OZ: ASSERT_MATCH<AutoString<void, 'Z'>, 'Z'> = 1;
	const OYZ: ASSERT_SAME<AutoString<void, 'Y' | 'Z'>, 'Y' | 'Z'> = 1;
	const AB: ASSERT_SAME<AutoString<'A' | 'B'>, 'A' | 'B'> = 1;
	const ABZ: ASSERT_SAME<AutoString<'A' | 'B', 'Z'>, 'A' | 'B'> = 1;

	const U: ASSERT_SAME<AutoString<undefined>, string> = 1;
	const UZ: ASSERT_MATCH<AutoString<undefined, 'Z'>, 'Z'> = 1;
	const UA: ASSERT_SAME<AutoString<undefined | 'A', 'Z'>, 'A' | 'Z'> = 1;
	/* eslint-enable @typescript-eslint/no-unused-vars */
}


export type ActualStringsMatch<
	StringA extends `${string}`,
	StringB extends `${string}`,
> = And<
		Extends<StringA, StringB>,
		Extends<StringB, StringA>
	> extends False
	? False
	: If<
			And<
				Extends<[StringA], [StringB]>,
				Extends<[StringB], [StringA]>
			>,
			If<
				Or<
					IsUnion<StringA>,
					IsUnion<StringB>
				>,
				Bool,
				True
			>,
			Bool
		>;


/**
 * `<StringA extends string|void, StringB extends string|void> => true | false | boolean`
 * 
 * Describes the possible outcomes of matching `StringA` with `StringB`.
 * 
 * If both arguments are not unions, then the parametric type returns:
 *   - `true` if the two arguments are the same string
 *   - `true` if the two arguments are both `void`
 *   - `false` otherwise
 * 
 * If at least one of the arguments a union, then both arguments are treated as sets and the parametric type returns:
 *   - `boolean` if the two sets are equals or overlap
 *   - `false` if the sets are disjoint 
 * 
 * 
 *     StringsMatch<'A', 'A'>  // true
 *     StringsMatch<'A', 'B'>  // false
 *     StringsMatch<'A', void>  // false
 *     StringsMatch<void, void>  // true
 *     StringsMatch<'A', 'A'|'B'>  // boolean
 *     StringsMatch<'A', string>  // boolean
 *     StringsMatch<'A'|'B', 'A'>  // boolean
 *     StringsMatch<'A'|'B', 'A'|'B'>  // boolean
 *     StringsMatch<'A'|'B', 'B'|'C'>  // boolean
 *     StringsMatch<'A'|'B', 'C'>  // false
 *     StringsMatch<'A'|'B', 'C' | 'D'>  // false
 *     StringsMatch<'A'|'B', string>  // false
 */
export type StringsMatch<
	StringA extends string|void,
	StringB extends string|void,
> = [StringA, StringB] extends [`${infer ActualStringA}`, `${infer ActualStringB}`]
	? ActualStringsMatch<ActualStringA, ActualStringB>
	: ([
		Extends<[StringA], [void]>,
		Extends<[StringB], [void]>,
	] extends [
		infer StringAVoid,
		infer StringBVoid,
	]
		? (Xor<AsBool<StringAVoid>, AsBool<StringBVoid>> extends True
			? False
			: If<
					And<AsBool<StringAVoid>, AsBool<StringBVoid>>,
					True,
					Bool
				>
		)
		: Bool
	);

{
	/* eslint-disable @typescript-eslint/no-unused-vars */
	const AmU: ASSERT_BOOLEAN<StringsMatch<'A', 'A' | 'B'>> = 1;
	const CmU: ASSERT_FALSE<StringsMatch<'C', 'A' | 'B'>> = 1;
	const SmU: ASSERT_BOOLEAN<StringsMatch<string, 'A' | 'B'>> = 1;
	const OmU: ASSERT_FALSE<StringsMatch<void, 'A' | 'B'>> = 1;
	const UmA: ASSERT_BOOLEAN<StringsMatch<'A' | 'B', 'A'>> = 1;
	const ABmBC: ASSERT_BOOLEAN<StringsMatch<'A' | 'B', 'B' | 'C'>> = 1;
	const ABmC: ASSERT_FALSE<StringsMatch<'A' | 'B', 'C'>> = 1;
	const UmC: ASSERT_FALSE<StringsMatch<'A' | 'B', 'C'>> = 1;
	const UmS: ASSERT_BOOLEAN<StringsMatch<'A' | 'B', string>> = 1;
	const UmO: ASSERT_FALSE<StringsMatch<'A' | 'B', void>> = 1;
	const UmU: ASSERT_BOOLEAN<StringsMatch<'A' | 'B', 'A' | 'B'>> = 1;

	const AOmA: ASSERT_BOOLEAN<StringsMatch<'A' | void, 'A'>> = 1;
	const AOmO: ASSERT_BOOLEAN<StringsMatch<'A' | void, 'A'>> = 1;
	const AOmAO: ASSERT_BOOLEAN<StringsMatch<'A' | void, 'A' | void>> = 1;

	const AmA: ASSERT_TRUE<StringsMatch<'A', 'A'>> = 1;
	const AmB: ASSERT_FALSE<StringsMatch<'A', 'B'>> = 1;
	const AmS: ASSERT_BOOLEAN<StringsMatch<'A', string>> = 1;
	const SmA: ASSERT_BOOLEAN<StringsMatch<string, 'A'>> = 1;
	const SmS: ASSERT_BOOLEAN<StringsMatch<string, string>> = 1;

	const OmO: ASSERT_TRUE<StringsMatch<void, void>> = 1;
	const OmA: ASSERT_FALSE<StringsMatch<void, 'A'>> = 1;
	const OmS: ASSERT_FALSE<StringsMatch<void, string>> = 1;
	const AmO: ASSERT_FALSE<StringsMatch<'A', void>> = 1;
	const SmO: ASSERT_FALSE<StringsMatch<string, void>> = 1;
	/* eslint-enable @typescript-eslint/no-unused-vars */
}


/**
 * `<Test> => true | false`
 * 
 * Deduce whether the given type `Test` is an explicit union of types
 * 
 *     IsUnion<'A'>  // false
 *     IsUnion<string>  // false
 *     IsUnion<void>  // false
 *     IsUnion<'A' | 'B'>  // true
 *     IsUnion<'A' | string>  // true
 *     IsUnion<'A' | void>  // true
 *     IsUnion<string | void>  // true
 */
export type IsUnion<Test> = Union.ListOf<Test>['length'] extends 1? False: True;

{
	/* eslint-disable @typescript-eslint/no-unused-vars */
	const A: ASSERT_FALSE<IsUnion<'A'>> = 1;
	const S: ASSERT_FALSE<IsUnion<string>> = 1;
	const O: ASSERT_FALSE<IsUnion<void>> = 1;
	const AB: ASSERT_TRUE<IsUnion<'A' | 'B'>> = 1;
	// const AS: ASSERT_FALSE<IsUnion<'A' | string>> = 1;
	const AO: ASSERT_TRUE<IsUnion<'A' | void>> = 1;
	const OA: ASSERT_TRUE<IsUnion<void | 'A'>> = 1;
	const SO: ASSERT_TRUE<IsUnion<string | void>> = 1;
	const OS: ASSERT_TRUE<IsUnion<void | string>> = 1;
	/* eslint-enable @typescript-eslint/no-unused-vars */
}

export type DirectlyIncludes<UnionType, Item> = If<
	IsUnion<Item>,
	Extends<[Item], [UnionType]>,
	UnionType extends infer Find
		? (Find extends Item
			? (Item extends UnionType? True: False)
			: False
		)
		: never
>;


 /**
  * `<Union, Item> => true | false`
  * 
  * Deduces whether the given `Union` explicitly includes the specified `Item`
  * 
  *     Includes<'A', 'A'>  // true
  *     Includes<'A'|'B', 'A'>  // true
  *     Includes<'A', 'A'|'B'>  // false
  *     Includes<'A'|'B', 'A'|'B'>  // true
  *     Includes<'A'|'B'|'C', 'A'|'B'>  // true
  *     Includes<'A'|string, 'A'>  // false: `'A'|string` merges into just `string`
  *     Includes<'A'|void, 'A'>  // true
  *     Includes<'A'|void, void>  // true
  *     Includes<void, void>  // true
  *     Includes<string|void, void>  // true
  *     Includes<string|void, string>  // true
  */
export type Includes<UnionType, Item> = DirectlyIncludes<UnionType, Item> extends infer Directly
	? Or<
		AsBool<Directly>,
		IsUnion<Directly>
	>
	: never;

{
	/* eslint-disable @typescript-eslint/no-unused-vars */
	const A_A: ASSERT_TRUE<Includes<'A', 'A'>> = 1;
	const A_B: ASSERT_FALSE<Includes<'A', 'B'>> = 1;
	const A_S: ASSERT_FALSE<Includes<'A', string>> = 1;
	const S_A: ASSERT_FALSE<Includes<string, 'A'>> = 1;
	const AB_A: ASSERT_TRUE<Includes<'A' | 'B', 'A'>> = 1;
	const A_AB: ASSERT_FALSE<Includes<'A', 'A' | 'B'>> = 1;
	const AB_AB: ASSERT_TRUE<Includes<'A' | 'B', 'A' | 'B'>> = 1;
	const ABC_AB: ASSERT_TRUE<Includes<'A' | 'B' | 'C', 'A' | 'B'>> = 1;
	// const AS_A: ASSERT_FALSE<Includes<'A' | string, 'A'>> = 1;  // `'A'|string` merges into `string`
	const O_O: ASSERT_TRUE<Includes<void, void>> = 1;
	const AO_A: ASSERT_TRUE<Includes<'A' | void, 'A'>> = 1;
	const AO_O: ASSERT_TRUE<Includes<'A' | void, void>> = 1;
	const O_S: ASSERT_FALSE<Includes<void, string>> = 1;
	const OS_S: ASSERT_TRUE<Includes<void | string, string>> = 1;
	const S_O: ASSERT_FALSE<Includes<string, void>> = 1;
	const SO_O: ASSERT_TRUE<Includes<string | void, void>> = 1;
	/* eslint-enable @typescript-eslint/no-unused-vars */
}


/**
 * `<Subject, From, Into> => Subject | Into`
 * 
 * If the type `From` extends `Subject`, then return `Into`; otherwise return `Subject`
 */
export type Coerce<
	Subject extends any,
	From extends any,
	Into extends any,
> = From extends Subject
	? Into
	: Subject;


export type Auto<
	Thing extends any,
	Test extends any,
	Else extends any=Test,
> = Thing extends void
	? Else
	: Thing extends Test
		? Thing
		: Else;


// export type Auto<
// 	Thing extends any,
// 	Default extends any,
// > = Thing extends void
// 	? Default
// 	: Thing extends Default
// 		? Thing
// 		: Default;

{
	/* eslint-disable @typescript-eslint/no-unused-vars */
	const AS: ASSERT_MATCH<Coerce<'A', string, 'Z'>, 'A'> = 1;
	const ABS: ASSERT_SAME<Coerce<'A' | 'B', string, 'Z'>, 'A' | 'B'> = 1;
	const SS: ASSERT_MATCH<Coerce<string, string, 'Z'>, 'Z'> = 1;
	/* eslint-enable @typescript-eslint/no-unused-vars */
}


/**
 * === _**@blake.regalia/meta**_ ===
 * 
 * ```ts
 * type Entries<
 * 	map: {},
 * > ==> UnionOf<[key: string, value: unknown][]>
 * ```
 * 
 * Converts const object type `map` to a union of its entries
 * 
 * --- Examples: ---
 * ```ts
 * 	Entries<{
 * 		a: 'apple';
 * 		b: 'banana';
 * 	}>  // ['a', 'apple'] | ['b', 'banana']
 * ```
 */
export type Entries<h_map extends {}> = {
	[K in keyof h_map]: [K, h_map[K]];
}[keyof h_map];

{
	/* eslint-disable @typescript-eslint/no-unused-vars */
	const AS: ASSERT_SAME<['a', 'A'] | ['b', 'B'], Entries<{
		a: 'A';
		b: 'B';
	}>> = 1;
	/* eslint-enable @typescript-eslint/no-unused-vars */
}


/**
 * === _**@blake.regalia/meta**_ ===
 * 
 * ```ts
 * type FindKeysForValuesMatching<
 * 	find: any,
 * 	map: {},
 * > ==> UnionOf<[key: unknown, value: unknown][]>
 * ```
 * 
 * Searches thru values in the given `map` matching `find` and returns a union of the corresponding keys
 * 
 * --- Examples: ---
 * ```ts
 * 	FindKeysForValuesMatching<'needle', {
 * 		red: 'needle';
 * 		green: 'foo';
 * 		blue: 'bar';
 * 		purple: 'needle';
 * 	}>  // 'red' | 'purple'
 * ```
 */
export type FindKeysForValuesMatching<
	s_find extends string,
	h_map extends {},
> = Union.ListOf<Entries<h_map>> extends infer a_entries
	? (Exclude<Keys<a_entries>, number> extends infer si_index
		? (si_index extends keyof a_entries
			? (a_entries[si_index] extends [infer si_key, s_find]
				? si_key
				: never
			)
			: never
		)
		: never
	)
	: never;

{
	/* eslint-disable @typescript-eslint/no-unused-vars */
	const AS: ASSERT_SAME<'red' | 'purple', FindKeysForValuesMatching<'needle', {
		red: 'needle';
		green: 'foo';
		blue: 'bar';
		purple: 'needle';
	}>> = 1;
	/* eslint-enable @typescript-eslint/no-unused-vars */
}


/**
 * === _**@blake.regalia/meta**_ ===
 * 
 * ```ts
 * type FindKeysForValuesPrefixing<
 * 	text: string,
 * 	map: Record<any, string>,
 * > ==> UnionOf<key: unknown>
 * ```
 * 
 * Searches thru values in the given `map` that prefix `text` and returns a union of the corresponding keys.
 * 
 * Useful for finding prefixes in a map that can be used to compact a given IRI.
 * 
 * --- Examples: ---
 * ```ts
 * 	FindKeysForValuesPrefixing<'food', {
 * 		red: '';
 * 		green: 'foo';
 * 		blue: 'bar';
 * 		purple: 'food';
 * 		black: 'bar food';
 * 	}>  // 'red' | 'green' | 'purple'
 * ```
 */
export type FindKeysForValuesPrefixing<
	s_find extends string,
	h_map extends Record<string, string>,
> = Union.ListOf<Entries<h_map>> extends infer a_entries
	? (Exclude<Keys<a_entries>, number> extends infer si_index
		? (si_index extends keyof a_entries
			? (a_entries[si_index] extends [infer si_key, infer s_value]
				? (s_value extends string
					? (s_find extends `${s_value}${string}`
						? si_key
						: never
					)
					: never
				)
				: never
			)
			: never
		)
		: never
	)
	: never;

{
	/* eslint-disable @typescript-eslint/no-unused-vars */
	const AS: ASSERT_SAME<'red' | 'green' | 'purple', FindKeysForValuesPrefixing<'food', {
		red: '';
		green: 'foo';
		blue: 'bar';
		purple: 'food';
		black: 'bar food';
	}>> = 1;
	/* eslint-enable @typescript-eslint/no-unused-vars */
}



export type StrIncludes<
	s_src extends string,
	s_search extends string,
> = Extends<s_src, `${string}${s_search}${string}`>;


/**
 * === _**@blake.regalia/meta**_ ===
 * 
 * ```ts
 * type Substr<
 * 	input: string,
 * 	indexStart: number,
 * 	indexEnd: number=LengthOf<input>,
 * > ==> string
 * ```
 * 
 * Returns a substring of `input` beginning at `indexStart` and ending before `indexEnd` (i.e., exclusively)
 * 
 * --- Examples: ---
 * ```ts
 * 	Substr<'hello foo world', 6, 9>  // 'foo'
 * ```
 */
export type Substr<
	s_src extends string,
	i_from extends number,
	i_to extends number=String.Length<s_src>,
> = Split<s_src> extends infer a_chars_src
	? (a_chars_src extends string[]
		? Join<List.Extract<a_chars_src, i_from, Number.Sub<i_to, 1>>>
		: never
	)
	: never;
{
	/* eslint-disable @typescript-eslint/no-unused-vars */
	const AE: ASSERT_MATCH<'foo', Substr<'hello foo world', 6, 9>> = 1;
	/* eslint-enable @typescript-eslint/no-unused-vars */
}

/**
 * === _**@blake.regalia/meta**_ ===
 * 
 * ```ts
 * type Replace<input: string, find: string, replace: string> ==> string
 * ```
 * 
 * Replaces all occurences of `find` with `replace` within `input`.
 * 
 * --- Examples: ---
 * ```ts
 * 	Replace<'cat mat flat', 'at', 'op'>  // 'cop mop flop'
 * ```
 */
export type Replace<
	s_src extends string,
	s_find extends string,
	s_replace extends string,
> = s_src extends `${infer s_pre}${s_find}${infer s_post}`
	? `${s_pre}${s_replace}${Replace<s_post, s_find, s_replace>}`
	: s_src;

{
	/* eslint-disable @typescript-eslint/no-unused-vars */
	const AE: ASSERT_MATCH<'cop mop flop', Replace<'cat mat flat', 'at', 'op'>> = 1;
	/* eslint-enable @typescript-eslint/no-unused-vars */
}


/**
 * === _**@blake.regalia/meta**_ ===
 * 
 * ```ts
 * type Escape<input: string, find: string, escapeChar: `${string}`='\\'> ==> string
 * ```
 * 
 * Escapes all occurences of `find` with `escapeChar` within `input`.
 * 
 * --- Examples: ---
 * ```ts
 * 	Replace<'please "help" me', '"'>  // 'please \\"help\\" me'
 * ```
 */
export type Escape<
	s_src extends string,
	s_find extends string,
	s_escape extends string='\\',
> = s_src extends `${infer s_pre}${s_find}${infer s_post}`
	? (String.Length<s_pre> extends infer nl_pre
		? (nl_pre extends number
			? `${s_pre}${s_escape}${s_find}${Substr<s_src, nl_pre, nl_pre>}${Escape<s_post, s_find, s_escape>}`
			: never
		)
		: never
	)
	: s_src;

{
	/* eslint-disable @typescript-eslint/no-unused-vars */
	const AE: ASSERT_MATCH<'please \\"help\\" me', Escape<'please "help" me', '"'>> = 1;
	/* eslint-enable @typescript-eslint/no-unused-vars */
}

// Compatibility shim: make `LanguageModel` compatible with `LanguageModelV2`
// This avoids changing runtime code (e.g., supportAgent.ts) while addressing
// TypeScript mismatches between @convex-dev/agent and @ai-sdk/provider types.
declare module "@ai-sdk/provider" {
  // If LanguageModel already exists, this augments/aliases it to the V2 type.
  // Using a type alias to the existing LanguageModelV2 keeps typings accurate
  // where supported; if LanguageModelV2 isn't present for some reason, fall
  // back to `any` to avoid blocking compilation.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  type _MaybeLMV2 = import("@ai-sdk/provider").LanguageModelV2 | any;
  export type LanguageModel = _MaybeLMV2;
}

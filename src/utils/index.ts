import type { Rule, RuleSet } from "../types";

export function isRule(node: RuleSet | Rule): node is Rule {
  return (node as Rule).field !== undefined;
}

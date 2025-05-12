import type { Rule, RuleSet } from "../types";

function isRule(node: RuleSet | Rule): node is Rule {
  return (node as Rule).field !== undefined;
}

function escapeLuceneValue(value: string): string {
  // Escape special Lucene characters: + - && || ! ( ) { } [ ] ^ " ~ * ? : \
  return value.replace(/([+\-!(){}[\]^"~*?:\\]|&&|\|\|)/g, "\\$1");
}

function formatFieldCondition(condition: Rule): string {
  const { field, operator, value } = condition;

  if (value === null || value === undefined || value === "") {
    return ""; // Skip empty values
  }

  const fieldName = field.name;
  const operatorValue = operator.value;
  const escapedValue = escapeLuceneValue(String(value));

  // Handle different operator types
  switch (operator.name.toLowerCase()) {
    case "contains":
      return `${fieldName}:*${escapedValue}*`;
    case "equals":
      return `${fieldName}:${escapedValue}`;
    case "not equals":
      return `NOT ${fieldName}:${escapedValue}`;
    case "greater than":
      return `${fieldName}:>${escapedValue}`;
    case "less than":
      return `${fieldName}:<${escapedValue}`;
    case "before":
      return `${fieldName}:[* TO ${escapedValue}]`;
    case "after":
      return `${fieldName}:[${escapedValue} TO *]`;
    case "between":
      if (Array.isArray(value) && value.length === 2) {
        return `${fieldName}:[${escapeLuceneValue(
          String(value[0])
        )} TO ${escapeLuceneValue(String(value[1]))}]`;
      }
      return "";
    default:
      return `${fieldName}:${operatorValue}${escapedValue}`;
  }
}

export function convertToLuceneQuery(query: RuleSet): string {
  if (!query.operatorIdentifier && !isRule(query)) {
    throw new Error("Invalid query object structure");
  }

  if (isRule(query)) {
    return formatFieldCondition(query);
  }

  // Process children recursively
  const childrenQueries = query.children
    .map((child) => convertToLuceneQuery(child as RuleSet))
    .filter((q) => q !== ""); // Filter out empty conditions

  if (childrenQueries.length === 0) {
    return "";
  }

  if (childrenQueries.length === 1) {
    return childrenQueries[0];
  }

  // Join with the appropriate operator
  const operator = query.operatorIdentifier.toUpperCase();
  return `(${childrenQueries.join(` ${operator} `)})`;
}

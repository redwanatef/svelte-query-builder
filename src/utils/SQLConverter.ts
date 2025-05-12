import { isRule } from ".";
import type { Rule, RuleSet } from "../types";

export function convertToSQL(
  queryObj: RuleSet | Rule,
  parentOperator?: string
): string {
  if (isRule(queryObj)) {
    return formatSQLCondition(queryObj);
  }

  // Process children recursively
  const childrenQueries = queryObj.children
    .map((child) => convertToSQL(child, queryObj.operatorIdentifier))
    .filter((q) => q !== ""); // Filter out empty conditions

  if (childrenQueries.length === 0) {
    return "";
  }

  if (childrenQueries.length === 1) {
    return childrenQueries[0];
  }

  // Join with the appropriate operator
  const operator = queryObj.operatorIdentifier.toUpperCase();
  const sql = childrenQueries.join(` ${operator} `);

  // Add parentheses only if needed (not the root level OR)
  return parentOperator ? `(${sql})` : sql;
}

function formatSQLCondition(condition: Rule): string {
  const { field, operator, value } = condition;

  if (value === null || value === undefined || value === "") {
    return "";
  }

  const fieldName = escapeSQLIdentifier(field.name);
  const escapedValue = escapeSQLValue(value, field.inputType);

  switch (operator.name.toLowerCase()) {
    case "contains":
      return `${fieldName} LIKE '%${escapedValue}%'`;
    case "equals":
      return `${fieldName} = ${escapedValue}`;
    case "not equals":
      return `${fieldName} <> ${escapedValue}`;
    case "greater than":
      return `${fieldName} > ${escapedValue}`;
    case "less than":
      return `${fieldName} < ${escapedValue}`;
    case "before":
      return `${fieldName} < ${escapedValue.split(" ")[0]}`;
    case "after":
      return `${fieldName} > ${escapedValue.split(" ")[0]}`;
    case "between":
      if (Array.isArray(value) && value.length === 2) {
        const val1 = escapeSQLValue(value[0], field.inputType);
        const val2 = escapeSQLValue(value[1], field.inputType);
        return `${fieldName} BETWEEN ${val1} AND ${val2}`;
      }
      return "";
    case "in":
      if (Array.isArray(value)) {
        const values = value
          .map((v) => escapeSQLValue(v, field.inputType))
          .join(", ");
        return `${fieldName} IN (${values})`;
      }
      return "";
    case "is null":
      return `${fieldName} IS NULL`;
    case "is not null":
      return `${fieldName} IS NOT NULL`;
    default:
      return `${fieldName} ${operator.value} ${escapedValue}`;
  }
}

function escapeSQLValue(value: any, fieldType?: string): string {
  if (value === null || value === undefined) {
    return "NULL";
  }

  // Handle date formatting
  if (fieldType === "date" || fieldType === "datetime") {
    if (value instanceof Date) {
      return `'${value.toISOString().slice(0, 19).replace("T", " ")}'`;
    }
    if (typeof value === "string" && Date.parse(value)) {
      return `'${new Date(value)
        .toISOString()
        .slice(0, 19)
        .replace("T", " ")}'`;
    }
  }

  // Handle number values
  if (fieldType === "number" && !isNaN(Number(value))) {
    return String(Number(value));
  }

  // Handle boolean values
  if (fieldType === "boolean") {
    return value ? "TRUE" : "FALSE";
  }

  // Default string escaping
  if (typeof value === "string") {
    return `'${value.replace(/'/g, "''")}'`;
  }

  // Handle arrays
  if (Array.isArray(value)) {
    return `'${JSON.stringify(value).replace(/'/g, "''")}'`;
  }

  return `'${String(value).replace(/'/g, "''")}'`;
}

function escapeSQLIdentifier(identifier: string): string {
  // Simple escaping - for production use, you might need database-specific escaping
  return `"${identifier.replace(/"/g, '""')}"`;
}

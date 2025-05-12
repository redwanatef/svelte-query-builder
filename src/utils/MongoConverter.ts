import { isRule } from ".";
import type { Rule, RuleSet } from "../types";

export function convertToMongoDB(queryObj: RuleSet | Rule): any {
  if (isRule(queryObj)) {
    return formatMongoDBCondition(queryObj);
  }

  const childrenQueries = queryObj.children
    .map((child) => convertToMongoDB(child))
    .filter((q) => q !== undefined && q !== null); // Filter out empty conditions

  if (childrenQueries.length === 0) {
    return {};
  }

  if (childrenQueries.length === 1) {
    return childrenQueries[0];
  }

  const operator = `$${queryObj.operatorIdentifier.toLowerCase()}`;
  return { [operator]: childrenQueries };
}

function formatMongoDBCondition(condition: Rule): any {
  const { field, operator, value } = condition;

  if (value === null || value === undefined || value === "") {
    return null;
  }

  const fieldName = field.name;

  switch (operator.name.toLowerCase()) {
    case "contains":
      return { [fieldName]: { $regex: value, $options: "i" } };
    case "equals":
      return { [fieldName]: value };
    case "not equals":
      return { [fieldName]: { $ne: value } };
    case "greater than":
      return { [fieldName]: { $gt: value } };
    case "less than":
      return { [fieldName]: { $lt: value } };
    case "before":
      return { [fieldName]: { $lt: formatDateValue(value) } };
    case "after":
      return { [fieldName]: { $gt: formatDateValue(value) } };
    case "between":
      if (Array.isArray(value) && value.length === 2) {
        return {
          [fieldName]: {
            $gte: formatDateValue(value[0]),
            $lte: formatDateValue(value[1]),
          },
        };
      }
      return null;
    case "in":
      if (Array.isArray(value)) {
        return { [fieldName]: { $in: value } };
      }
      return null;
    case "is null":
      return { [fieldName]: null };
    case "is not null":
      return { [fieldName]: { $ne: null } };
    default:
      return { [fieldName]: { [`$${operator.value}`]: value } };
  }
}

function formatDateValue(value: any): Date | any {
  if (value instanceof Date) {
    return value;
  }
  if (typeof value === "string" && Date.parse(value)) {
    return new Date(value);
  }
  return value;
}

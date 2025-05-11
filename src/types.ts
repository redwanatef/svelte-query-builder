import type { SortableOptions } from "sortablejs";

export interface Rule {
  field: FieldDefinition;
  operator: Operator;
  value: any;
}

export interface RuleSet {
  operatorIdentifier: string;
  children: Array<RuleSet | Rule>;
}

export interface CombinatorDefinition {
  identifier: string;
  name: string;
}

export interface Operator {
  name: string;
  value: string;
  type: string[];
}

export interface FieldDefinition {
  name: string;
  label: string;
  operators?: Operator;
  inputType?: string;
  placeholder?: string;
  // options?: string[];
  defaultValue?: any;
}

export interface QueryBuilderConfig {
  combinators: CombinatorDefinition[];
  fields: FieldDefinition[];
  operators: Operator[];
  maxDepth?: number;
  colors?: string[];
  dragging?: SortableOptions;
}

export type QueryBuilderChildProps = {
  value?: any;
  parent: boolean;
  handleNode: (action: actionType, newnode?: Rule | RuleSet) => void;
};

export type QueryBuilderGroupProps = {
  parentNode?: RuleSet;
  currentNode: RuleSet | Rule;
  child: boolean;
  currentIndex?: number;
  level?: number;
};

export type actionType = "add" | "delete";

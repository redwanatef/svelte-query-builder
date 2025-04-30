import type { SortableOptions } from "sortablejs";
import type { Component } from "svelte";

export interface Rule {
  identifier: string;
  value?: any;
}

export interface RuleSet {
  operatorIdentifier: string;
  children: Array<RuleSet | Rule>;
}

export interface OperatorDefinition {
  identifier: string;
  name: string;
}

export interface RuleDefinition {
  identifier: string;
  name: string;
  component:
    | Component<{ value: string }>
    | Component<{ value: number }>
    | string;
  initialValue?: any;
}

export interface QueryBuilderConfig {
  operators: OperatorDefinition[];
  rules: RuleDefinition[];
  //   maxDepth?: number;
  //   colors?: string[];
  dragging?: SortableOptions;
}

export type QueryBuilderChildProps = {
  type: "text" | "number" | "select";
  value?: any;
  title: string;
  options?: OperatorDefinition[];
  parent: boolean;
  handleNode: (
    action: actionType,
    newnode?: Rule | RuleSet | OperatorDefinition
  ) => void;
};

export type QueryBuilderGroupProps = {
  qb: QueryBuilderConfig;
  parentNode?: RuleSet;
  currentNode: RuleSet | Rule;
  child: boolean;
  currentIndex?: number;
  level?: number;
};

export type actionType = "add" | "delete" | "update";

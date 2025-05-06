import Input from "./components/Input.svelte";
import NumberSelection from "./components/NumberSelection.svelte";
import type { QueryBuilderConfig, RuleSet } from "./types.ts";

export const defaultConfig: QueryBuilderConfig = {
  operators: [
    {
      name: "AND",
      identifier: "AND",
    },
    {
      name: "OR",
      identifier: "OR",
    },
  ],
  rules: [
    {
      identifier: "txt",
      name: "Text",
      component: Input,
      initialValue: "",
    },
    {
      identifier: "num eq",
      name: "is Equal to",
      component: NumberSelection,
      initialValue: 10,
    },
    {
      identifier: "num gt",
      name: "greater than",
      component: NumberSelection,
      initialValue: 10,
    },
    {
      identifier: "num lt",
      name: "Less than",
      component: NumberSelection,
      initialValue: 10,
    },
  ],
  colors: ["hsl(88, 50%, 55%)", "hsl(187, 100%, 45%)", "hsl(15, 100%, 55%)"],
};

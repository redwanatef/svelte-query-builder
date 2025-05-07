import DateInput from "./components/DateInput.svelte";
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
      name: "Contains the text",
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
    {
      identifier: "date before",
      name: "Before the date",
      component: DateInput,
      // initialValue: new Date().toISOString().split("T")[0],
    },
    {
      identifier: "date after",
      name: "After the date",
      component: DateInput,
      // initialValue: new Date().toISOString().split("T")[0],
    },
  ],
  colors: ["hsl(88, 50%, 55%)", "hsl(187, 100%, 45%)", "hsl(15, 100%, 55%)"],
};

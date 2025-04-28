import Input from "./components/Input.svelte";
import NumberSelection from "./components/NumberSelection.svelte";
import type { QueryBuilderConfig } from "./types";

export const qb: QueryBuilderConfig = {
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
      name: "Text Selection",
      component: Input,
      initialValue: "",
    },
    {
      identifier: "num",
      name: "Number Selection",
      component: NumberSelection,
      initialValue: 10,
    },
  ],
  // colors: ["hsl(88, 50%, 55%)", "hsl(187, 100%, 45%)", "hsl(15, 100%, 55%)"],
};

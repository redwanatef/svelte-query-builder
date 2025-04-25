<script lang="ts">
  import type { QueryBuilderConfig, RuleSet } from "../types";
  import Input from "./Input.svelte";
  import NumberSelection from "./NumberSelection.svelte";
  import QueryBuilderChild from "./QueryBuilderChild.svelte";
  import QueryBuilderGroup from "./QueryBuilderGroup.svelte";

  const qb: QueryBuilderConfig = $state({
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
  });

  const query: RuleSet = $state({
    operatorIdentifier: "OR",
    children: [
      {
        identifier: "txt",
        value: "A",
      },
      {
        operatorIdentifier: "AND",
        children: [
          {
            identifier: "txt",
            value: "A",
          },
          {
            identifier: "txt",
            value: "B",
          },
          {
            identifier: "txt",
            value: "C",
          },
          {
            operatorIdentifier: "AND",
            children: [
              {
                identifier: "txt",
                value: "c",
              },
              {
                identifier: "txt",
                value: "d",
              },
              {
                operatorIdentifier: "AND",
                children: [
                  {
                    identifier: "num",
                    value: 1,
                  },
                  {
                    identifier: "num",
                    value: 2,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        operatorIdentifier: "AND",
        children: [
          {
            identifier: "txt",
            value: "X",
          },
          {
            identifier: "txt",
            value: "Y",
          },
          {
            identifier: "txt",
            value: "Z",
          },
        ],
      },
    ],
  });
</script>

<QueryBuilderGroup {qb} {query} child={false} />

<style>
</style>

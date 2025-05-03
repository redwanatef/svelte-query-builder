<script lang="ts">
  import { qb } from "../config";
  import type { RuleSet } from "../types";
  import QueryBuilderGroup from "./QueryBuilderGroup.svelte";

  let query: RuleSet = $state({
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

<div class="pb-4 w-[50%] mx-auto">
  <QueryBuilderGroup {qb} currentNode={query} child={false} />
</div>

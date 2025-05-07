<script lang="ts">
  import type { RuleSet } from "../types";
  import QueryBuilderGroup from "./QueryBuilderGroup.svelte";

  let defaultQuery: RuleSet = $state({
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
            identifier: "date before",
            value: new Date(),
          },
          {
            identifier: "txt",
            value: "B",
          },
          {
            identifier: "date after",
            value: new Date(),
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
                    identifier: "num gt",
                    value: 1,
                  },
                  {
                    identifier: "num eq",
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
  <QueryBuilderGroup child={false} currentNode={defaultQuery} />
</div>

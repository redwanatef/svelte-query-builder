<script lang="ts">
  import { setContext } from "svelte";
  import { defaultConfig, defaultQuery } from "../config";
  import type { QueryBuilderConfig, RuleSet } from "../types";
  import QueryBuilderGroup from "./QueryBuilderGroup.svelte";

  let {
    config = defaultConfig,
    query = defaultQuery,
  }: {
    config?: QueryBuilderConfig;
    query?: RuleSet;
  } = $props();

  let queryState = $state(query);

  setContext("config", config);
</script>

<div class="pb-4 min-w-[90%] lg:min-w-[60%] max-w-fit mx-auto">
  <QueryBuilderGroup child={false} currentNode={queryState} />
</div>

<script lang="ts">
  import { setContext } from "svelte";
  import { defaultConfig, defaultQuery } from "../config";
  import type { QueryBuilderConfig, RuleSet } from "../types";
  import QueryBuilderGroup from "./QueryBuilderGroup.svelte";
  import { convertToLuceneQuery } from "../utils/LuceneConverter";
  import { convertToSQL } from "../utils/SQLConverter";
  import { convertToMongoDB } from "../utils/MongoConverter";

  let {
    config = defaultConfig,
    query = defaultQuery,
  }: {
    config?: QueryBuilderConfig;
    query?: RuleSet;
  } = $props();

  let queryState = $state(query);

  setContext("config", config);

  let selectedQuery = $state("lucene");

  let exportedQuery = $state();
  $effect(() => {
    if (selectedQuery === "lucene") {
      exportedQuery = convertToLuceneQuery(queryState);
    } else if (selectedQuery === "sql") {
      exportedQuery = convertToSQL(queryState);
    } else if (selectedQuery === "mongo") {
      exportedQuery = JSON.stringify(convertToMongoDB(queryState), null, 2);
    }
  });
</script>

<div class="min-w-[90%] lg:min-w-[60%] max-w-fit mx-auto">
  <QueryBuilderGroup child={false} currentNode={queryState} />

  <div>
    Convert to:
    <select bind:value={selectedQuery} class="border ml-4 p-1">
      <option value="lucene">Lucene</option>
      <option value="sql">SQL</option>
      <option value="mongo">Mongo</option>
    </select>

    <div class="mt-3 bg-gray-300 p-4">
      <div class="w-[90%]">
        <pre class="whitespace-pre-wrap wrap-break-word">{exportedQuery}</pre>
      </div>
    </div>
  </div>
</div>

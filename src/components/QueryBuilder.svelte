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

  let showNotification = $state(false);
  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(exportedQuery as string)
      .then(() => {
        showNotification = true;

        // Hide notification after 2 seconds
        setTimeout(() => {
          showNotification = false;
        }, 2000);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };
</script>

<div class="w-[90%] lg:w-[60%] mx-auto">
  <QueryBuilderGroup child={false} currentNode={queryState} />

  <div>
    Convert to:
    <select bind:value={selectedQuery} class="border ml-4 p-1">
      <option value="lucene">Lucene</option>
      <option value="sql">SQL</option>
      <option value="mongo">Mongo</option>
    </select>

    <div class="mt-3 bg-gray-300 p-2 grid grid-cols-[90%_10%]">
      <div class="w-[90%]">
        <pre class="whitespace-pre-wrap wrap-break-word">{exportedQuery}</pre>
      </div>
      <button aria-label="copy" onclick={copyToClipboard}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6 cursor-pointer"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"
          />
        </svg>
      </button>
      {#if showNotification}
        <div
          class="fixed top-4 right-[50%] bg-green-500 text-white px-4 py-2 rounded shadow-md transition-opacity duration-300"
        >
          Copied to clipboard!
        </div>
      {/if}
    </div>
  </div>
</div>

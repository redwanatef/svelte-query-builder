<script lang="ts">
  import type { QueryBuilderConfig, RuleSet } from "../types";
  import QueryBuilderChild from "./QueryBuilderChild.svelte";

  let {
    qb,
    query,
    child = false,
  }: { qb: QueryBuilderConfig; query: RuleSet; child: boolean } = $props();
</script>

<main
  class={`w-lg mx-auto mt-8 rounded-2xl p-7 shadow-lg border border-gray-200 flex flex-col gap-4 ${child ? "border-l-green-400 border-l-2" : ""}`}
>
  <QueryBuilderChild
    title="Operator"
    type="select"
    options={qb.operators}
    value={query.operatorIdentifier}
  />

  <div class="flex gap-6 items-center">
    <select class="border p-1 cursor-pointer">
      <option disabled selected value="">select a rule</option>
      <option value="text">text selection</option>
      <option value="numbers">number selection</option>
    </select>

    <button> Add Rule </button>
    <button> Add Group </button>
  </div>
</main>

<style scoped>
  button {
    /* @apply p-2 bg-green-400 text-white cursor-pointer rounded font-bold hover:opacity-85; */
    padding: 0.5rem;
    background-color: #05df72;
    color: white;
    cursor: pointer;
    border-radius: 0.25rem;
    font-weight: bold;
  }

  button:hover {
    opacity: 85%;
  }
</style>

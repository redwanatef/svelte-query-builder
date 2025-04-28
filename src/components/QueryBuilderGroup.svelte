<script lang="ts">
  import type { QueryBuilderConfig, Rule, RuleSet } from "../types";
  import QueryBuilderChild from "./QueryBuilderChild.svelte";
  import QueryBuilderGroup from "./QueryBuilderGroup.svelte";

  let {
    qb,
    query,
    child = false,
    level = 0,
  }: {
    qb: QueryBuilderConfig;
    query: RuleSet | Rule;
    child: boolean;
    level?: number;
  } = $props();

  const isRuleSet = (child: RuleSet | Rule): child is RuleSet => {
    return (child as RuleSet).operatorIdentifier !== undefined;
  };

  const onDelete = (index?: number) => {};
</script>

<main style={level! !== 0 ? `padding-left: ${level}rem;` : ""}>
  <div
    class={`w-full mt-8 rounded border shadow-lg flex flex-col gap-4 ${child ? "border-l-green-400 border-l-4" : ""}`}
  >
    {#if isRuleSet(query)}
      <QueryBuilderChild
        title="Operator"
        type="select"
        options={qb.operators}
        value={query.operatorIdentifier}
      />

      <div class="flex items-center gap-6 pl-6">
        <select class="p-1 border cursor-pointer">
          <option disabled selected value="">select a rule</option>
          <option value="text">text selection</option>
          <option value="numbers">number selection</option>
        </select>

        <button> Add Rule </button>
        <button> Add Group </button>
      </div>
      {#each query.children as child, index}
        <QueryBuilderGroup {qb} level={level + 1} query={child} child={true} />
      {/each}
    {:else if query.identifier === "txt"}
      <QueryBuilderChild
        title="Text Selection"
        type="text"
        value={query.value}
      />
    {:else if query.identifier === "num"}
      <QueryBuilderChild
        title="Number Selection"
        type="number"
        value={query.value}
      />
    {/if}
  </div>
</main>

<style>
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

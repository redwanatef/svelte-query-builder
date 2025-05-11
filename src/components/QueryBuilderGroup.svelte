<script lang="ts">
  import type {
    actionType,
    QueryBuilderConfig,
    QueryBuilderGroupProps,
    Rule,
    RuleSet,
  } from "../types";

  import QueryBuilderChild from "./CombinatorItem.svelte";
  import QueryBuilderGroup from "./QueryBuilderGroup.svelte";
  import RuleItem from "./RuleItem.svelte";
  import { getContext } from "svelte";

  let {
    currentNode,
    parentNode,
    child = false,
    level = 0,
    currentIndex = -1,
  }: QueryBuilderGroupProps = $props();

  const qb: QueryBuilderConfig = getContext("config");

  let editCurrent: Rule = $state(currentNode as Rule);

  const isRuleSet = (child: RuleSet | Rule): child is RuleSet => {
    return (child as RuleSet).operatorIdentifier !== undefined;
  };

  const handleNode = (action: actionType, newnode?: Rule | RuleSet) => {
    if (action === "delete" && parentNode && isRuleSet(parentNode)) {
      parentNode.children.splice(currentIndex, 1);
    }

    if (action === "add" && newnode && isRuleSet(currentNode)) {
      currentNode.children.push(newnode);
    }
  };

  const handleAddNode = (type: "rule" | "group") => {
    let newNode;

    if (type === "rule") {
      newNode = {
        field: {
          name: "firstName",
          label: "First Name",
          placeholder: "Enter first name",
          inputType: "text",
        },
        operator: {
          name: "contains",
          value: "contains",
          type: ["text"],
        },
        value: "",
      };
    } else if (type === "group") {
      newNode = {
        operatorIdentifier: "AND",
        children: [],
      };
    }
    handleNode("add", newNode);
  };
</script>

<main style={level! !== 0 ? `padding-left: ${level}rem;` : ""}>
  <div
    class={`w-full mt-8 rounded border shadow-lg flex flex-col gap-4 `}
    style={`border-left: ${child && qb.colors ? "3px solid " + qb.colors[level % qb.colors?.length] : ""};`}
  >
    {#if isRuleSet(currentNode)}
      <QueryBuilderChild
        bind:value={currentNode.operatorIdentifier}
        {handleNode}
        parent={currentIndex >= 0}
      />

      <div class="flex items-center gap-6 pl-6">
        <button onclick={() => handleAddNode("rule")}> Add Rule </button>
        {#if !qb.maxDepth || (qb.maxDepth && qb.maxDepth > level)}
          <button onclick={() => handleAddNode("group")}> Add Group </button>
        {/if}
      </div>
      {#each currentNode.children as child, index}
        <QueryBuilderGroup
          level={level + 1}
          parentNode={currentNode}
          currentNode={child}
          child={true}
          currentIndex={index}
        />
      {/each}
    {:else}
      <RuleItem
        bind:field={editCurrent.field}
        bind:operator={editCurrent.operator}
        bind:value={editCurrent.value}
        {handleNode}
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
    background-color: #1af889;
  }

  button:disabled {
    cursor: default;
    background-color: gainsboro;
  }
</style>

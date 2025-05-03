<script lang="ts">
  import type {
    actionType,
    OperatorDefinition,
    QueryBuilderGroupProps,
    Rule,
    RuleSet,
  } from "../types";
  import QueryBuilderChild from "./QueryBuilderChild.svelte";
  import QueryBuilderGroup from "./QueryBuilderGroup.svelte";

  let {
    qb,
    currentNode,
    parentNode,
    child = false,
    level = 0,
    currentIndex = -1,
  }: QueryBuilderGroupProps = $props();

  let selectedRule = $state("");

  const isRuleSet = (child: RuleSet | Rule): child is RuleSet => {
    return (child as RuleSet).operatorIdentifier !== undefined;
  };

  const handleNode = (
    action: actionType,
    newnode?: Rule | RuleSet | OperatorDefinition
  ) => {
    if (action === "delete" && parentNode && isRuleSet(parentNode)) {
      parentNode.children.splice(currentIndex, 1);
    }

    if (action === "add" && newnode && isRuleSet(currentNode)) {
      currentNode.children.push(newnode);
    }

    if (action === "update" && isRuleSet(currentNode) && newnode) {
      currentNode.children[currentIndex] = newnode;
    }
  };

  const handleAddNode = (type: "rule" | "group") => {
    let newNode;

    if (type === "rule") {
      if (selectedRule === "number") {
        newNode = {
          identifier: "num",
          value: 0,
        };
      } else if (selectedRule === "text") {
        newNode = {
          identifier: "txt",
          value: "",
        };
      }
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
        title="Operator"
        type="select"
        options={qb.operators}
        value={currentNode.operatorIdentifier}
        {handleNode}
        parent={currentIndex >= 0}
      />

      <div class="flex items-center gap-6 pl-6">
        <select class="p-1 border cursor-pointer" bind:value={selectedRule}>
          <option disabled selected value="">select a rule</option>
          <option value="text">text selection</option>
          <option value="number">number selection</option>
        </select>

        <button
          disabled={selectedRule === ""}
          onclick={() => handleAddNode("rule")}
        >
          Add Rule
        </button>
        {#if !qb.maxDepth || (qb.maxDepth && qb.maxDepth > level)}
          <button onclick={() => handleAddNode("group")}> Add Group </button>
        {/if}
      </div>
      {#each currentNode.children as child, index}
        <QueryBuilderGroup
          {qb}
          level={level + 1}
          parentNode={currentNode}
          currentNode={child}
          child={true}
          currentIndex={index}
        />
      {/each}
    {:else if currentNode.identifier === "txt"}
      <QueryBuilderChild
        title="Text Selection"
        type="text"
        value={currentNode.value}
        {handleNode}
        parent={currentIndex >= 0}
      />
    {:else if currentNode.identifier === "num"}
      <QueryBuilderChild
        title="Number Selection"
        type="number"
        value={currentNode.value}
        {handleNode}
        parent={currentIndex >= 0}
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

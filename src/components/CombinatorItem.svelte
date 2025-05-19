<script lang="ts">
  import { getContext } from "svelte";
  import type { QueryBuilderChildProps, QueryBuilderConfig } from "../types";

  let {
    value = $bindable(),
    handleNode,
    parent,
  }: QueryBuilderChildProps = $props();

  const config: QueryBuilderConfig = getContext("config");
</script>

<div class="bg-gray-200 p-5 rounded flex justify-between w-full">
  <div class="flex gap-1.5 md:gap-4 items-center">
    <h4 class="font-bold text-xl">Combinator</h4>
    <select class="bg-white" bind:value>
      <option disabled value="">Select an operator</option>
      {#each config.combinators as combinator}
        <option
          value={combinator.identifier}
          selected={value === combinator.identifier}>{combinator.name}</option
        >
      {/each}
    </select>
  </div>
  {#if parent}
    <button
      aria-label="delete-node"
      class="cursor-pointer"
      onclick={() => handleNode("delete")}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        ><path
          fill="currentColor"
          d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z"
        /></svg
      ></button
    >
  {/if}
</div>

<style>
</style>

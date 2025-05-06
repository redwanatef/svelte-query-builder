<script lang="ts">
  import type { QueryBuilderChildProps } from "../types";
  import Input from "./Input.svelte";
  import NumberSelection from "./NumberSelection.svelte";

  let {
    value = $bindable(),
    title,
    type,
    options,
    handleNode,
    parent,
  }: QueryBuilderChildProps = $props();
</script>

<div class="bg-gray-200 p-5 rounded flex justify-between w-full">
  <div class="flex gap-4 items-center">
    <h4 class="font-bold text-xl">{title}</h4>
    {#if type === "text"}
      <Input bind:value />
    {:else if type === "number"}
      <NumberSelection bind:value />
    {:else if type === "select" && options}
      <select class="bg-white" bind:value>
        <option disabled value="">Select an operator</option>
        {#each options as option}
          <option
            value={option.identifier}
            selected={value === option.identifier}>{option.name}</option
          >
        {/each}
      </select>
    {/if}
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

<script lang="ts">
  import type { QueryBuilderChildProps } from "../types";
  import Input from "./Input.svelte";
  import NumberSelection from "./NumberSelection.svelte";

  let { value, title, type, options }: QueryBuilderChildProps = $props();
</script>

<div class="bg-gray-200 p-7">
  <div class="flex gap-4 items-center">
    <h4 class="font-bold text-xl">{title}</h4>
    {#if type === "text"}
      <Input {value} />
    {:else if type === "number"}
      <NumberSelection {value} />
    {:else if type === "select" && options}
      <select class="bg-white">
        <option disabled value="">Select an operator</option>
        {#each options as option}
          <option value={option.identifier}>{option.name}</option>
        {/each}
      </select>
    {/if}
  </div>
</div>

<style>
  /* your styles go here */
</style>

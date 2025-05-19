<script lang="ts">
  import { getContext } from "svelte";
  import type {
    actionType,
    FieldDefinition,
    Operator,
    QueryBuilderConfig,
    Rule,
    RuleSet,
  } from "../types";

  let {
    field = $bindable(),
    operator = $bindable(),
    value = $bindable(),
    handleNode,
  }: {
    field: FieldDefinition;
    operator: Operator;
    value: any;
    handleNode: (action: actionType, newnode?: Rule | RuleSet) => void;
  } = $props();

  const config: QueryBuilderConfig = getContext("config");

  const onChangeField = (fieldName: string) => {
    field = config.fields.find((f) => f.name === fieldName) || field;
  };

  const onChangeOperator = (operatorValue: string) => {
    operator =
      config.operators.find((o) => o.name === operatorValue) || operator;
  };
</script>

<main class="flex items-center justify-between bg-gray-200 px-5">
  <div class="flex flex-col md:flex-row gap-3 md:gap-8 items-center p-5">
    <select bind:value={() => field.name, onChangeField}>
      {#each config.fields as field}
        <option value={field.name}>{field.label}</option>
      {/each}
    </select>

    {#if field.inputType === "checkbox"}
      <input
        type="checkbox"
        placeholder={field.placeholder}
        bind:checked={value}
        class="scale-150"
      />
    {:else}
      <select bind:value={() => operator.name, onChangeOperator}>
        {#each config.operators as operator}
          <option value={operator.name}>{operator.value}</option>
        {/each}
      </select>
      <input
        type={field.inputType}
        placeholder={field.placeholder}
        bind:value
      />
    {/if}
  </div>

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
</main>

<style>
  select,
  input {
    background-color: white;
    padding: 0.5rem;
    @media screen and (max-width: 768px) {
      width: 100%;
    }
  }
</style>

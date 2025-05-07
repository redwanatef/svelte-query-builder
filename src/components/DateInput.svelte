<script lang="ts">
  let { value = $bindable() }: { value: string } = $props();
</script>

<input
  class="bg-white p-1"
  bind:value
  type="date"
  max={new Date().toISOString().split("T")[0]}
/>
